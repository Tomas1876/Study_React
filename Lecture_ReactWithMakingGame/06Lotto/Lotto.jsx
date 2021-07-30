import React, {Component} from 'react';
import Ball from './Ball';


function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i)=> i+1);
    //Array(45) -> 45칸짜리 배열이 만들어짐(만들어지기만 하지 배열은 비어있음)
    //Array(45).fill() 하면 배열이 undefined로 채워짐(IE에서는 사용 못하는 메서드)
    //빈 배열과 undefined로 채워진 배열은 다르다
    //빈 배열은 정말 비어있어서, 반복문도 못 돌림 하지만 undefined로 채워진 건 말 그래도 '채워진' 배열
    //값이 undefined일 뿐
    
    //이제 map을 이용해서 undefined 자리에 인덱스+1인 값을 넣은 배열을 생성한다

    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
      }

      const bonusNumber = shuffle[shuffle.length - 1];
      const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
      return [...winNumbers, bonusNumber];
} 
class Lotto extends Component{

    state={
        winNumbers:getWinNumbers(), //당첨 숫자들
        winBalls:[],
        bonus:null, //보너스
        redo:false
    }
    timeouts = [];
    runTimeouts = ()=>{

        const {winNumbers} = this.state;
        for(let i =0; i< this.state.winNumbers.length - 1; i++){ 
            //변수 let을 사용하면 비동기에서 클로저 문제가 발생하지 않는다

            this.timeouts[i] = setTimeout(()=>{
                this.setState((prevState) => {
                    return {
                      winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                  });
                }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(()=>{
            this.setState({
                bonus:winNumbers[6],
                redo:true
            });
        }, 7000);

    }
    componentDidMount(){
        this.runTimeouts()
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.winBalls.length ===0){
            this.runTimeouts();
        }
    }

    componentWillUnmount(){
        this.timeouts.forEach((v) =>{
            clearTimeout(v);
        });
    }

    onClickRedo =() =>{ //한 번 더 할때 초기화 시켜주는 함수

        this.setState({
            winNumbers:getWinNumbers(),
            winBalls:[],
            bonus:null,
            redo:false
        });
        this.timeouts = [];
        
    }

    render(){
        const {winBalls, bonus, redo} = this.state;
        return(
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div> 
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
            </>
        );
    } 
}

export default Lotto;