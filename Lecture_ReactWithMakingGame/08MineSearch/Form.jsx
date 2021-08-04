import React, {useState, useCallback, useContext} from 'react'; //useContext는 ContextAPI를 이용해 값을 가져오기 위해 사용
import {TableContext} from "./MineSearch";

const Form = () =>{
    const [row, setRow] = useState(10); //세로
    const [cell, setCell] = useState(10); //가로
    const [mine, setMine] = useState(20); //지뢰
    const {dispatch} = useContext(TableContext)
    
    onChangeRow = useCallback((e)=>{
        setRow(e.target.value);
    },[]);
    onChangeCell = useCallback((e)=>{
        setCell(e.target.value);
    },[]);
    onChangeMine = useCallback((e)=>{
        setMine(e.target.value);
    },[]);

    onClickBtn= useCallback(()=>{
        dispatch({type:START_GAME, row, cell, mine});
    },[row, cell, mine]);

    return(
        <div>
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
            <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
            <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
            <button onClick={onClickBtn}>시작</button>
        </div>
    );
};

export default Form;