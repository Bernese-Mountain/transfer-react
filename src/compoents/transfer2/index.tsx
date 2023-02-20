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

    const newMockData2: { key: string; value: string; move: boolean; }[] = [];
    for (let i = 200; i < 400; i++) {
        const data = {
            key: i.toString(),
            value: i.toString(),
            move: false,
            checked: false
        };
        newMockData2.push(data);
    }

    // 搜索及页面大小页数区
    const pageSize = 10;
    const [inputValue, setInputValue] = useState('');
    const [pageNums, setPageNums] = useState(1);
    const [inputValue2, setInputValue2] = useState('');
    const [pageNums2, setPageNums2] = useState(1);
    
    const filters = (data:any, input:any,pageNums: number) => {
        const key = input;
        const retArray: Array<any> = [];
        data.forEach((items: any) => {
            if(items.value.search(key) !== -1){
                retArray.push(items);
            }
        })
        const ret =[];
        for(let i = 0;i <retArray.length ;i++){
            ((i >= (pageNums-1)*pageSize)&&(i < pageNums*pageSize))? ret.push(retArray[i]):false;
        }
        return ret;
    }
    const [filterData, setFilterData] = useState(filters(newMockData,inputValue,pageNums));
    const [filterData2, setFilterData2] = useState(filters(newMockData2,inputValue2,pageNums2));

    // 初始页面渲染及页面大小更改区
    const totalPageNums = (pageSize: number) => {
        return (Math.ceil(newMockData.length/pageSize))
    }
    const pageNumbers = totalPageNums(pageSize);

    // 页数更改功能区
    const pageNumSubtract = function(){
        const pageNumsS = pageNums-1;
        if(pageNums>1){
            setPageNums(pageNumsS);
            setFilterData(filters(newMockData,inputValue,pageNumsS));
        } 
    }
    const pageNumPlus = function(){
        const pageNumsP = pageNums+1;
        if(pageNums<pageNumbers){
            setPageNums(pageNumsP);
            setFilterData(filters(newMockData,inputValue,pageNumsP));
        } 
    }


    const pageNumSubtract2 = function(){
        const pageNumsS = pageNums2-1;
        if(pageNums2>1){
            setPageNums2(pageNumsS);
            setFilterData2(filters(newMockData2,inputValue2,pageNumsS));
        } 
    }
    const pageNumPlus2 = function(){
        const pageNumsP = pageNums2+1;
        if(pageNums2<pageNumbers){
            setPageNums2(pageNumsP);
            setFilterData2(filters(newMockData2,inputValue2,pageNumsP));
        } 
    }

    // 左右穿梭框穿梭功能区
    // interface moveData {
    //     key: string,
    //     value: string,
    //     move: boolean,
    //     checked: boolean
    // }
    const [moveData,setMoveData] = useState<any>([]);
    // 按键在选中元素前的禁用
    const [disabled, setDisabled] = useState(true);
    const checkAll = function(){
        filterData.map(item => {
            item.checked = item.check? false:true;
        })
    }
    const checked = function(e:any){
        if(moveData.length===0){
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const checkAndTransfer = function(event:any,item:any){
        if (event.target.checked){
            moveData.push(item);
            newMockData.filter(Item => {
                (Item.key === item.key)? Item.move = true:false;
            })
            console.log("new",newMockData);
        } else {
            // moveData.splice(item.key,1)
            // newMockData.filter(Item => {
            //     (Item.key === item.key)? Item.move = false:false;
            // })
        }
        console.log("newMockData", newMockData);
        checked(event);
    }

    const moveToSecond = function(){
        let arr = newMockData;
        console.log(arr)
        arr = arr.filter(item => {
            return item.move!==true;
        })
        console.log("arr", arr);
        setFilterData(filters(arr,inputValue,pageNums));
        const arr2 = moveData.concat(newMockData2);
        setFilterData2(filters(arr2,inputValue2,pageNums2));
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
                        setFilterData(filters(newMockData,e.target.value,pageNums));
                        console.log(e.target.value);
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
                                    onChange={e => {
                                        checkAndTransfer(e,item)
                                    }}
                                />
                                {item.value}
                            </li>)
                    ):""}
                </ul>
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
            

            {/* 左右穿梭按钮 */}
            <div className='moveButton'>
                <button onClick={moveback} disabled={disabled}>&lt;</button>
                <button onClick={moveToSecond} disabled={disabled}>&gt;</button>
            </div>
          
            

            <div className='transferBox'>
                {/* 包括搜索和全选功能在内的list组件 */}

                <input
                    type="text"
                    value={inputValue2}
                    onChange={e => {
                        setInputValue2(e.target.value);
                        setFilterData2(filters(newMockData2,e.target.value,pageNums2));
                    }}
                />

                <div className='checkAllBox'>
                    <input type="checkbox" onChange={checkAll} />
                </div>

                <ul>
                    {filterData2 ? (
                        filterData2.map(item => 
                            <li  key={item.key} >
                                <input 
                                    type="checkbox" 
                                    value={item.value} 
                                    onChange={e => {
                                        checkAndTransfer(e,item)
                                    }}
                                />
                                {item.value}
                            </li>)
                    ):""}
                </ul>
                {/* 分页功能区 */}
                <div className='pagination'>
                    <div className='pageSubtract' onClick={pageNumSubtract2}>
                    &lt;
                    </div>
                    <input
                        type="number"
                        className='paginationInput'
                        value={pageNums2}
                        onChange={e => {
                            setPageNums2(Number(e.target.value));
                        }}
                    />
                /{pageNumbers}页
                    <div className='pagePlus' onClick={pageNumPlus2}>
                    &gt;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;