import React,{useState, useRef, useEffect} from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
  };
  
  const scores = {
    가위: 1,
    바위: 0,
    보: -1,
  };
   
  const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
      return v[1] === imgCoord;
    })[0];
  };

const RSPHooks = ()=>{
      const [result, setResult] = useState('');
      const [imgCoord, setImgCoord] = useState(rspCoords.바위);
      const [score, setScore] = useState('0');
      const interval = useRef();

      //componentDidMount, componentWillUnmount 역할
      //1대1 대응은 아님 이 둘을 합쳐놓은 것 같은 것
      useEffect(()=>{ //useEffect도 함수 컴포넌트 안에 적어야 한다
    
        interval.current = setInterval(changeHand, 500);

        return () =>{ //여기가 componentWillUnmount 역할
            clearInterval(interval.current);
        }   
      }, [imgCoord]);
      //useEffect의 첫번째 인자는 함수고 두 번째 인자는 배열이다
      //이 배열 안에 바꿀 state를 적는다
      //이 배열을 비워둔다면 어떤 것이 변하든 신경쓰지 않고 최초 한 번만 실행하겠다는 뜻

    const changeHand = () => {

            if (imgCoord === rspCoords.바위) {

                setImgCoord(rspCoords.가위);

            } else if (imgCoord === rspCoords.가위) {
                setImgCoord(rspCoords.보);
            } else if (imgCoord === rspCoords.보) {
                setImgCoord(rspCoords.바위);
            }
    }

    const onClickBtn = (choice)=> () =>{

        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
            setResult('비겼습니다!');

        } else if([-1, 2].includes(diff)){

                setResult('이겼습니다!');
                setScore((prevScore)=>{
                    return prevScore +1
                });
        } else{
            setResult('졌습니다!');
            setScore((prevScore)=>{
                return prevScore -1
            });

        }
        setTimeout(()=>{
            interval.current = setInterval(changeHand, 500);
        }, 1000);
        

    }

    return (
        <>
          <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
          <div>
            <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
            <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
          </div>
          <div>{result}</div>
          <div>현재 {score}점</div>
        </>
      );
  }


export default RSPHooks;


