import React, { useEffect, useReducer, createContext, useMemo } from 'react'; //contextAPI
import Table from "./Table";
import Form from "./Form";

export const CODE={
    MINE:-7,
    NORMAL:-1,
    QUESTION:-2,
    FLAG:-3,
    QUESTION_MINE:-4,
    FLAG_MINE:-5,
    CLICKED_MINE:-6,
    OPENED:0 // 0 이상이면 다 OPENED가 되도록 할 것
}
export const TableContext = createContext({ //모듈로 만들어주는 것 잊지 말 것
    tableData: [],
    halted: true,
    dispatch: () => {}
});

const initialState = {
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0,
  };

const plantMine = (row, cell, mine) =>{
    console.log(row, cell, mine);
    const candidate = Array(row*cell).fill().map((arr, i ) => {
        return i;
    })
    const shuffle = [];

    //0~99사이의 수 중 지뢰 개수만큼 수들을 무작위로 뽑아서 suffle 배열에 담은 것
    while(candidate.length > row*cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)
        shuffle.push(chosen);
    }

    //지뢰찾기 게임 칸 만들기
    const data = [];
    for(let i =0 ; i<row; i++){
        const rowData = [];
        data.push(rowData);
        for(let j = 0; j < cell; j ++){
            rowData.push(CODE.NORMAL)
        }
    }

    //그리고 위에서 만든 칸들에 지뢰를 심는다(shuffle에 담아둔 숫자들이 지뢰)
    for(let k = 0; k < shuffle.length; k++){
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    console.log(data)
    return data;
}
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action)=>{
    switch(action.type){
        case START_GAME:
            return {
                ...state,
                tableData : plantMine(action.row, action.cell, action.mine)
            }
        default: return state;
    }
}
const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;
  
    const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);
  
    useEffect(() => {
      let timer;
      if (halted === false) {
        timer = setInterval(() => {
          dispatch({ type: INCREMENT_TIMER });
        }, 1000);
      }
      return () => {
        clearInterval(timer);
      }
    }, [halted]);

    return (
        <TableContext.Provider value={value}> 
        {/* ContextAPI를 사용할 컴포넌트를 Provider로 묶어줘야 한다*/}  
            <Form />
            <div>{timer}</div>
                <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );

};

export default MineSearch;