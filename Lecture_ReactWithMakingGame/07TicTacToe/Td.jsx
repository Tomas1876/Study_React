import React,{useCallback, useEffect, useRef} from 'react';
import {CLICK_CELL, CHANGE_TURN} from "./TicTacToe";

const Td= ({rowIndex, cellIndex, cellData, dispatch})=>{
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
};

export default Td;