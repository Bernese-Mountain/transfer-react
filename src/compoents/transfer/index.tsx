import { useState, useEffect } from 'react';
import './style.css';
const Search = () => {
    // 初始模拟数据功能区
    const newMockData: { key: string; value: string; move: boolean; }[] = [];
    for (let i = 0; i < 20; i++) {
        const data = {
            key: i.toString(),
            value: i.toString(),
            move: false
        };
        newMockData.push(data);
    }

    // 搜索功能区域
    const [inputValue, setInputValue] = useState('');
    const keyWord = inputValue;
    const filters = (data:any, keyword:any) => {
        const key = keyword;
        const retArray: Array<any> = [];
        data.forEach((items: any) => {
            if(items.value.search(key) !== -1){
                retArray.push(items);
            }
        })
        return retArray;
    }
    const filterData = filters(newMockData,keyWord);


    // 全选和取消全选功能区
    const [allChecked,setAllChecked] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const checkAll = function(){
        allChecked? setAllChecked(false):setAllChecked(true);
    }
    const checked = function(e:any){
        if(moveData.length===0){
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    // 初始页面渲染及页面大小更改区
    const [pageSize, setPageSize] = useState(1);
    const pageNums = (pageSize: number) => {
        return (Math.ceil(20/pageSize))
    }
    const pageNumSubtract = function(){
        let nums = pageSize;
        nums--;
        // setPageSize(nums);
    }
    const pageNumbers = pageNums(pageSize);
   
    // 页数更改功能区
    const [inputNums, setInputNums] = useState(1);




    // 左右穿梭框穿梭功能区
    let moveData: any[] = [];
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
    const checkAndTransfer = function(event:any,item:any){
        if (event.target.checked){
            moveData.push(item);
            item.move = true;
        } else {
            moveData.splice(item.key,1)
            item.move = false;
        }
        checked(event);
        console.log(filterData);
    }

    return (
        <div className='transfer'>
            {/* 总穿梭框组件 */}

            <div className='transferBox'>
                {/* 包括搜索和全选功能在内的list组件 */}

                <input
                    type="text"
                    value={inputValue}
                    onChange={e => {
                        setInputValue(e.target.value);
                    }}
                />

                <div className='checkAllBox'>
                    <input type="checkbox" onChange={checkAll} />
                </div>

                <ul>
                    {filterData ? (
                        filterData.map(item => 
                            <li  key={item.key} >
                                <input 
                                    type="checkbox" 
                                    value={item.value} 
                                    checked={allChecked}
                                    onChange={e => {
                                        checkAndTransfer(e,item)
                                    }}
                                />
                                {item.value}
                            </li>)
                    ):""}
                </ul>
            </div>

            {/* 左右穿梭按钮 */}
            <div className='moveButton'>
                <button onClick={moveToSecond} disabled={disabled}>右移</button>
                <button onClick={moveback} disabled={disabled}>左移</button>
            </div>
          
            {/* 分页功能区 */}
            <div className='pagination'>
                <div className='pageLeft' onClick={pageNumSubtract}>
              &lt;
                </div>
                <input
                    type="text"
                    value={inputNums}
                    onChange={e => {
                        setInputNums(Number(e.target.value));
                    }}
                />
            </div>
        </div>
    );
};

export default Search;