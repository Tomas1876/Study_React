import React, {useReducer, createContext, useMemo} from "react"; //contextAPI
import Table from "./Table";

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
const TableContext = createContext({ //안에 기본값을 넣어줄 수 있다
    tableData:[
        [],
        [],
        [],
        [],
        []
    ],
    dispatch:()=>[]
});

const initialState={
    tableData:[],
    timer:0,
    result:''
}
export const START_GAME = "START_GAME";

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
const MineSearch = ()=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(()=>{
        tableData:state.tableData, dispatch
    }, [state.tableData]);

    return (
        <TableContext.Provider value={{value}}> 
        {/* ContextAPI를 사용할 컴포넌트를 Provider로 묶어줘야 한다*/}  
            <Form />
            <div>{state.timer}</div>
                <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    );

};

export default MineSearch;