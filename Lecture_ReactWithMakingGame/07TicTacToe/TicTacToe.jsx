import React, {useState, useReducer, useCallback} from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    recentCell: [-1, -1],
  };
export const SET_WINNER = 'SET_WINNER'; //그냥 선언만 하지 말고 다른 컴포넌트에서도 사용할거니까 모듈로 만들기
export const CLICK_CELL = "CLICK_CELL";
export const SET_TURN = "SET_TURN";

const reducer = (state, action) =>{
    switch(action.type){
        case SET_WINNER :
            return { //이렇게 새로운 객체를 만들어 바뀐 값을 넣어줘야 한다
                ...state,
                winner:action.winner
            }
            // state.winner = action.state 이런 식으로 기존 state를 직접 바꾸면 안된다
        case CLICK_CELL:{
            const tableData = [...state.tableData]
            tableData[action.row] = [...tableData[action.row]] //객체를 바꾸려면 불변성 때문에 얕은 복사를 해야 한다
            tableData[action.row][action.cell] = state.turn;
            return{
                ...state,
                tableData
            }
        }
        case SET_TURN:{
            return{
                ...state,
                turn:state.turn === "O" ? "X" : "O"
            }
        }
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
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/>
            {state.winner && <div>{state.winner}님 승리!</div>}
        </>
    );
}

export default TicTacToe;