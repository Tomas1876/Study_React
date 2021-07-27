import React, {useState, useRef} from 'react';

const ResponseCheckHooks = () => {
    const [state,setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);

    //Hooks에서는 this 속성을 ref로 표현할 수 있다
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

   const onClickScreen = () =>{

     if(state === 'waiting'){
         setState('ready');
         setMessage('초록색이 되면 클릭하세요')

         timeout.current = setTimeout(()=>{
            setState('now');
            setMessage('지금 클릭')
            startTime.current = new Date();
         }, Math.floor(Math.random()*1000)+2000);
     } else if(state === 'ready'){
        setState('waiting');
        setMessage('이런, 성급하시네요! 초록색이 된 후에 클릭하세요')

         //여기서 끝이 아니라, 위의 setTimeout이 실행되지 않도록 초기화도 시켜줘야 한다
         clearTimeout(timeout.current);

     } else if(state === 'now'){
         endTime.current = new Date();
         setState('waiting');
         setMessage('클릭해서 시작하세요')
         setResult((prevResult)=>{
             return [...prevResult, endTime.current - startTime.current];
         });

     }
 

    }
    const onReset = () =>{
        setResult([]);

    }

    // 아래 태그 부분은 새 컴포넌트로 하고, result 등은 props로 물려주는 식으로 하는 것이 낫다
    const renderAverage = () =>{

        return result.length === 0 ? null : <>
            <div>평균 시간 - {result.reduce((a, c) => a+c) / result.length}ms</div>
            <button onClick={onReset}>취소</button>
        </>
    }

    return(
        <>
                <div id="screen"
                     className={state}
                     onClick={onClickScreen}>
                    {message}
                </div>
                {renderAverage()}              
            </>

    );
}

//jsx에서 false, null, undefined는 태그가 없다는 뜻
//리액트 render 안에서 조건문은 삼항 연산자로 사용함 

export default ResponseCheckHooks;

//state는 setState등으로 값을 바꿔줬을 때 return부분이 다시 실행된다
//하지만 ref는 값이 바뀐다고 렌더링이 다시 일어나지 않는다
//그러므로 값이 변할 때마다 렌더링을 할 필요가 없는 것들은 ref를 사용한다