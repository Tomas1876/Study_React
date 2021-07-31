import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
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
    const lottoNumbers = useMemo(()=>getWinNumbers(),[]);
    //useEffect나 useMemo 등은 늘 두 번째 인자로 배열을 가지는데
    //배열 안의 값이 변화하지 않는 이상 다시 실행되지 않는다
    //이렇게 useMemo를 사용해서 값을 기억한 다음 그 값을 winNumber에 넣어주어야
    //getWinNumber가 Balls 컴포넌트가 렌더링 될 때마다 재실행되지 않는다
    //useMemo는 함수의 실행 결과값 등을 기억하고
    //useRef는 비교적 간단한 일반 값을 기억한다

    //반면 useCallBack은 함수의 결과값이 아니라 함수 자체를 기억한다
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    //Hooks는 선언 순서도 중요하다 실행순서에 맞춰 선언해야 함
    
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

        // useEffect는 componentDidMount, componentDidUpdate의 역할을 하기 때문에
        // componenteDidMout의 역할을 하지 않고 componentDidUpdate만 하길 원한다면, 아래와 같이 할 수 있다
        const mounted = useRef(false);
        useEffect(()=>{
            if(!mounted.current){
                mounted.current = true; //이렇게 하면 componenteDidMout 시점에 아무일도 일어나지 않는다
            } else{
                //여기에 update시 실행할 방법을 넣는다
            }
        },[]); //이 배열에 바뀌는 값을 넣는다

        //만약 componentDidUpdate말고 componenteDidMout만 하고 싶다면
        useEffect(()=>{
            //실행할 동작
        },[]);

        //위 두 개는 일종의 요령인데 패턴이니까 기억해둘 것

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

    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
      }, [winNumbers]);
    //함수컴포넌트는 전체가 재실행된다는 특징이 있는데
    //useCallBack으로 함수를 기억해두면 재실행 될 때마다 함수를 불필요하게 새로 생성할 필요가 없다
    //만약 자식 컴포넌트에 함수를 props로 넘긴다면 useCallback을 반드시 설정해야 한다
    //그렇게 하지 않으면 함수형 부모 컴포넌트가 새로 렌더링 될 때마다 함수는 바뀐 것이 없는데
    //함수가 새로 렌더링 됐기 때문에 props가 바뀌었다고 생각해 자식 컴포넌트도 새로 렌더링이 된다
    //불필요한 렌더링 줄줄이 발생

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