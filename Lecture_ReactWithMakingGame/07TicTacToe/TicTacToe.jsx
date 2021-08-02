import React, {useEffect, useState, useReducer, useCallback} from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    recentCell: [-1, -1], //최근에 클릭한 셀. 초기값은 아예 없는 셀로 설정
  };
export const SET_WINNER = 'SET_WINNER'; //그냥 선언만 하지 말고 다른 컴포넌트에서도 사용할거니까 모듈로 만들기
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = 'RESET_GAME';

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
                tableData,
                recentCell:[action.row, action.cell] //최근에 클릭한 셀 기억하기 그리고 useEffect에서 활용
            }
        }
        case CHANGE_TURN:{
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O'
              };
        }
        case RESET_GAME: {
          return {
            ...state,
            turn: 'O',
            tableData: [
              ['', '', ''],
              ['', '', ''],
              ['', '', ''],
            ],
            recentCell: [-1, -1],
          };
        }
        default:
          return state;
      }
}
const TicTacToe = () =>{
    const[state, dispatch] = useReducer(reducer, initialState);
    const {tableData, turn, winner,recentCell} = state; //구조분해할당
    //const [winner, setWinner] = useState('');
    //const [turn, setTurn] = useState('0');
    //const [tableData, setTableData] = useState([['','',''],['','',''],['','','']])

    const onClickTable = useCallback(()=>{
        dispatch({type:SET_WINNER, winner:'O'})    //dispatch 안에 들어가는 건 액션(액션 객체)라고 부른다
    }, []);

    useEffect(()=>{
        const [row, cell] = recentCell;
        if(row < 0){ //useEffect는 처음 컴포넌트가 렌더링 될 때도 실행되기 때문에
            return;  // recentCell의 값이 -1 즉 최초 게임 시작할 때는 실행되지 않도록 조건
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
          }
          if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
          }
          if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
          }
          if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
          } 

          if(win){ //승리시
            dispatch({type:SET_WINNER, winner:turn})
          } else{ //무승부
            //무승부 검사는 테이블이 다 찼는지를 확인해야 한다
            let all = true; //칸이 다 찼는지 판단하는 변수

            tableData.forEach((row)=>{
              row.forEach((cell)=>{
                if(!cell){ //하나라도 안 찬 칸이 있다면
                  all=false; 
                } 
              })
            })

            if(all){
            //무승부이므로 게임 데이터를 리셋하기 
            dispatch({type:RESET_GAME}); 
            } else {
              dispatch({type:CHANGE_TURN});
            }
            
          }

    }, [recentCell]); //클릭한 셀이 바뀔 때마다 useEffect를 실행해서 승리 검사하기
    return(
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님 승리!</div>}
        </>
    );
}

export default TicTacToe;