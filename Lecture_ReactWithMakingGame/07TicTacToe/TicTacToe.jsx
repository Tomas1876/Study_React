import React, {useState, useReducer, useCallback} from 'react';
import Table from './Table';

const initialState={
    winner:'',
    turn:'0',
    tableData:[['','',''],['','',''],['','','']]
}
const SET_WINNER = 'SET_WINNER'
const reducer = (state, action) =>{
    switch(action.type){
        case SET_WINNER :
            return { //이렇게 새로운 객체를 만들어 바뀐 값을 넣어줘야 한다
                ...state,
                winner:action.winner
            }
            // state.winner = action.state 이런 식으로 기존 state를 직접 바꾸면 안된단
    }
}
const TicTacToe = () =>{
    const[state, dispatch] = useReducer(reducer, initialState);
    //const [winner, setWinner] = useState('');
    //const [turn, setTurn] = useState('0');
    //const [tableData, setTableData] = useState([['','',''],['','',''],['','','']])

    const onClickTable = useCallback(()=>{
        dispatch({type:SET_WINNER, winner:'O'})    //dispatch 안에 들어가는 건 액션(액션 객체)라고 부른다
    }, []);
    return(
        <>
            <Table onClick={onClickTable}/>
            {state.winner && <div>{state.winner}님 승리!</div>}
        </>
    );
}

export default TicTacToe;