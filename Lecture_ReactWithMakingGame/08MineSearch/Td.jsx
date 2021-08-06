import React, { useContext, useCallback, useMemo, memo } from 'react';
import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext } from './MineSearch';

const getTdStyle = (code) =>{
    switch(code){
        
        case CODE.NORMAL:
        case CODE.MINE:
            return{
                background:'#444'
            }
        case CODE.OPENED:
            return{
                background: '#fff'
            }
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return{
                background:'yellow'
            }
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return{
                background:'red'
            }
        default:
            return{
                background:'#fff'
            }
    }
}

const getTdText = (code) => {
    switch(code){
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return '';
    }
}


const Td = ({rowIndex, cellIndex})=>{
    const {tableData, dispatch} = useContext(TableContext);
    const onClickTd = useCallback(() =>{
        switch(tableData[rowIndex][cellIndex]){
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({type:OPEN_CELL, row:rowIndex, cell:cellIndex})
                return;
            case CODE.MINE:
                dispatch({type:CLICK_MINE, row:rowIndex, cell:cellIndex})
                return;
            default:
                return;
            
        }
       
    },[])

    const onRightClickTd = useCallback((e)=>{
        //onContextMenu는 마우스 우클릭 이벤트
        e.preventDefault(); //우클릭시 기본적으로 뜨는 메뉴를 막는다
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
              dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
              return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
              dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
              return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
              dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
              return;
            default:
              return;
          }

    },[])
    return(
        <td style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;