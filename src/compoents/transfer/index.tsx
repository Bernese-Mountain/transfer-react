/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useEffect } from 'react';
import './style.css';
const Search = () => {
    // 初始模拟数据功能区
    const newMockData: { key: string; value: string; move: boolean; }[] = [];
    for (let i = 0; i < 200; i++) {
        const data = {
            key: i.toString(),
            value: i.toString(),
            move: false,
            checked: false
        };
        newMockData.push(data);
    }

    // 搜索功能区域
    const pageSize = 10;
    const [inputValue, setInputValue] = useState('');
    const [pageNums, setPageNums] = useState(1);
    // const keyWord = inputValue;
    const filters = (data:any, inputValue:any,pageNums: number) => {
        const key = inputValue;
        const retArray: Array<any> = [];
        data.forEach((items: any) => {
            if(items.value.search(key) !== -1){
                retArray.push(items);
            }
        })
        const ret =[];
        for(let i = 0;i <data.length ;i++){
            ((i >= (pageNums-1)*pageSize)&&(i < pageNums*pageSize))? ret.push(data[i]):false;
        }
        return ret;

    }
    let filterData = filters(newMockData,inputValue,pageNums);


    // 全选和取消全选功能区
    const [disabled, setDisabled] = useState(true);
    const checkAll = function(){
        filterData.map(item => {
            item.checked = item.check? false:true;
        })
    }
    
    // 初始页面渲染及页面大小更改区
    const totalPageNums = (pageSize: number) => {
        return (Math.ceil(newMockData.length/pageSize))
    }
    // const changPageSize
    const pageNumbers = totalPageNums(pageSize);
   
    // 页数更改功能区
    const pageNumsFliter = (pageNums: number,data: any[]) =>{
        const retArr: any[] = [];
        for(let i = 0;i <data.length ;i++){
            ((i >= (pageNums-1)*pageSize)&&(i < pageNums*pageSize))? retArr.push(data[i]):false;
        }
        return retArr;
    }
    const [pageNumsFilterData,setPageNumsFilterData] = useState(pageNumsFliter(pageNums,filterData));
    // let pageNumsFilterData = pageNumsFliter(pageNums,filterData);

    const pageNumSubtract = function(){
        const pageNumsS = pageNums-1;
        (pageNums>1)? setPageNums(pageNumsS): false;
    }
    const pageNumPlus = function(){
        const pageNumsP = pageNums+1;
        (pageNums<pageNumbers)? setPageNums(pageNumsP): false;
    }


    // 左右穿梭框穿梭功能区
    const moveData: any[] = [];
    const checked = function(e:any){
        if(moveData.length===0){
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const checkAndTransfer = function(event:any,item:any){
        // console.log(event.target.checked);
        if (event.target.checked){
            moveData.push(item);
            item.move = true;
        } else {
            moveData.splice(item.key,1)
            item.move = false;
        }
        // console.log("moveData", moveData)
        checked(event);
    }

    const moveToSecond = function(){
        let arr = pageNumsFilterData;
        arr = arr.filter(item => {
            return item.move!==true;
        })
        setPageNumsFilterData(arr);
        // pageNumsFilterData = arr;
    }
    const moveback = function(){
        //
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
                        filterData = filters(newMockData,inputValue,pageNums);
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
                                    // checked={item.checked}
                                    onChange={e => {
                                        // item.check = item.check? false: true;
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
                <div className='pageSubtract' onClick={pageNumSubtract}>
                    &lt;
                </div>
                <input
                    type="number"
                    className='paginationInput'
                    value={pageNums}
                    onChange={e => {
                        setPageNums(Number(e.target.value));
                    }}
                />
                /{pageNumbers}页
                <div className='pagePlus' onClick={pageNumPlus}>
                    &gt;
                </div>
            </div>
        </div>
    );
};

export default Search;