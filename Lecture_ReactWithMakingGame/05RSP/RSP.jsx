import React, {Component} from 'react';

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
class RSP extends Component{
    state = {
        result:'',
        imgCoord:rspCoords.바위,
        score:0
    };

    interval;
    
    //렌더링이 최초로 일어날 때, 성공적으로 렌더링이 끝났다면 componentDidMount가 실행된다
    //그 이후로 setState등으로 렌더링이 다시 일어날때는 실행되지 않는다
    componentDidMount(){ // - 비동기 요청을 많이 한다
        
        this.interval = setInterval(this.changeHand, 500);
    }

    //setState든 props가 바뀌든 렌더링이 다시 일어날 때마다 실행된다
    componentDidUpdate(){

    }

    //컴포넌트가 제거되기 직전 실행
    componentWillUnmount(){ // - 비동기 요청 정리를 많이 한다
        clearInterval(this.interval);
    }

    changeHand = () => {
        const {imgCoord} = this.state; //비동기 함수가 바깥에 있는 변수를 참조하면 클로저가 발생한다 함수 안에 넣어줘야함
            if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
            } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
            } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });
            }
    }

    //onClickBtn = (choice)=>{ //원래 보통 이렇게 쓰지만 아래 렌더 내부에서 onClick의 {} 안에서 this.onClickBtn이라고 함수를 호출하는 부분에서 화살표를 지우고
                            //아래와 같이 쓸 수도 있다
     onClickBtn = (choice)=> () =>{
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
            this.setState({
                result:'비겼습니다!'
            });
        } else if([-1, 2].includes(diff)){
            this.setState((prevState)=>{
                return{
                    result:'이겼습니다!',
                    score: prevState.score + 1
                }
            });
        } else{
            this.setState((prevState)=>{
                return{
                    result:'졌습니다!',
                    score: prevState.score - 1
                }
            });
        }
        setTimeout(()=>{
            this.interval = setInterval(this.changeHand, 500);
        }, 2000);
        

    }

    //클릭이 일어났을 때만 렌더링이 일어나게 할 수는 없을까...

    //setState는 render 안에서 사용할 수 없다 무한 렌더링 지옥에 빠지니까...
    render(){
        const {result, score, imgCoord} = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={ this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={ this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;

//컴포넌트의 라이프사이클(클래스의 경우)
//constructor -> render -> (있다면)ref 설정 -> componentDidMount 
//-> setState나 props 변화 등으로 render ->  componentDidUpdate
//->부모가 자식컴포넌트를 없앨 때 자식 입장에서 componentWillUnmount
//만약 shouldComponentUpdate를 사용한다면 render되기 전에 실행된다

