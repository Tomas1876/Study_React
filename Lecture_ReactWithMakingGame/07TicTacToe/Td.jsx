import React,{useCallback, useEffect, useRef, memo } from 'react';
import {CLICK_CELL} from "./TicTacToe";

const Td= memo(({rowData, rowIndex, cellIndex, cellData, dispatch})=>{

    const ref = useRef([]);
useEffect(()=>{
    ref.current = [rowData,cellIndex,dispatch,cellData];
    console.log(cellData)
    console.log(rowData===ref.current[0],cellIndex===ref.current[1],dispatch===ref.current[2],cellData===ref.current[3])
    //찍어봤을 때 값이 false면 바뀐 것

},[rowIndex,cellIndex,dispatch,cellData]);
    console.log("td render")
    const onClickTd = useCallback(() =>{
        console.log(rowIndex, cellIndex)
        if(cellData){ //한 번 클릭하면 cellData가 생성되므로 이것이 있는지 확인한다
            return;
        }
        dispatch({type:CLICK_CELL, row:rowIndex, cell:cellIndex});    
    },[cellData]); 

    return (
       <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;