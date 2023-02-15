import { useState, useEffect } from 'react';
import './style.css';
const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [filterData, setFilterData] = useState<{key:any; value: any;move:boolean;}[]>([])
    // const [filterData, setFilterData] = useState([]);
    let keyWord = inputValue;
    const newMockData: { key: string; value: string; move: boolean; }[] = [];
    let moveData: any[] = [];
    useEffect(() => {
      setFilterData(filters(newMockData,keyWord));
    }, []);
   
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        value: i.toString(),
        move: false
      };
      newMockData.push(data);
    }

    const filters = (data:any, keyword:any) => {
      const key = keyword;
      let retArray: Array<any> = [];
      data.forEach((items: any) => {
          if(items.value.search(key) !== -1){
              retArray.push(items);
          }
      })
      return retArray;
    }
   
    const checked = function(e:any){
        if(moveData.length===0){
          setDisabled(true);
        } else {
          setDisabled(false);
        }
    }

  const moveToSecond = function(){
   // eslint-disable-next-line array-callback-return
   moveData.map(moveItem => {
    // eslint-disable-next-line array-callback-return
    filterData.map(filterItem => {
      if(moveItem === filterItem){
        filterData.splice(Number(moveItem.key),1)
      }
    })
   })
   moveData = [];
  }
  const moveback = function(){
    //
  }

  return (
      <div className='transfer'>
            <div className='transferBox'>
            <input
                type="text"
                value={inputValue}
                onChange={e => {
                    setInputValue(e.target.value);
                }}
            />
            <ul>
              {filterData ? (
                  filterData.map(item => 
                            <li  key={item.key} ><input 
                                   
                                    type="checkbox" 
                                    value={item.value} 
                                    onChange={e => {
                                      if (e.target.checked){
                                        moveData.push(item);
                                        item.move = true;
                                      } else {
                                        moveData.splice(item.key,1)
                                        item.move = false;
                                      }
                                      checked(e);
                                      console.log(filterData);
                                    }}
                                  />
                                    {item.value}
                            </li>)
              ):""}
            </ul>
        </div>

        <div className='moveButton'>
            <button onClick={moveToSecond} disabled={disabled}>右移</button>
            <button onClick={moveback} disabled={disabled}>左移</button>
        </div>

        <div className='transferBox'>
            <input
                type="text"
                value={inputValue}
                onChange={e => {
                    setInputValue(e.target.value);
                }}
            />
            <ul>
              {filterData ? (
                  filterData.map(item => 
                            <li  key={item.key} ><input 
                                   
                                    type="checkbox" 
                                    value={item.value} 
                                    onChange={e => {
                                      if (e.target.checked){
                                        moveData.push(item);
                                        item.move = true;
                                      } else {
                                        moveData.splice(item.key,1)
                                        item.move = false;
                                      }
                                      checked(e);
                                      console.log(filterData);
                                    }}
                                  />
                                    {item.value}
                            </li>)
              ):""}
            </ul>
        </div>
      </div>
        
    );
};

export default Search;