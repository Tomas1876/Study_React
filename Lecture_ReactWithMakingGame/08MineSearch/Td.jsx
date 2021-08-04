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
        default:
            return '';
    }
}

const Td = ({rowIndex, cellIndex})=>{
    const {tableData} = useContext(TableContext);
    return(
        <td style={getTdStyle(tableData[rowIndex][cellIndex])}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;