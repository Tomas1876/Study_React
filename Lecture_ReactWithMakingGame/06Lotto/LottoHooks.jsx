import React, {useState, useEffect, useRef} from 'react';
import Ball from './Ball';


function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i)=> i+1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
      }

      const bonusNumber = shuffle[shuffle.length - 1];
      const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
      return [...winNumbers, bonusNumber];
} 

const LottoHooks = () =>{
    const [winNumbers, setWinNumbers] = useState(getWinNumbers());
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    
    useEffect(()=>{
        console.log("useEffect")
        runTimeouts()
        return ()=>{
            timeouts.current.forEach((v)=>{
                clearTimeout(v);
            });
        }
    },[timeouts.current]); //useEffect의 이 인자가 빈 배열일 때
        // useEffect는 componentDidMount와 동일한 역할을 한다
        // 만약 이 부분이 빈 배열이 아니라면 useEffect는
        // componentDidMount와 componentDidupdate 둘 다 수행

    const runTimeouts = ()=>{

        for(let i =0; i<winNumbers.length - 1; i++){ 
            //변수 let을 사용하면 비동기에서 클로저 문제가 발생하지 않는다

            timeouts.current[i] = setTimeout(()=>{
                setWinBalls((prevWinBalls) => {
                    return[...prevWinBalls, winNumbers[i]];
                  });
                }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(()=>{
            setBonus(winNumbers[6]);
            setRedo(true)

        }, 7000);

    }

    const onClickRedo =() =>{ //한 번 더 할때 초기화 시켜주는 함수
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);

        timeouts.current = [];
        
    }

    return(
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div> 
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한번 더!</button>}
        </>
    );

}

export default LottoHooks;