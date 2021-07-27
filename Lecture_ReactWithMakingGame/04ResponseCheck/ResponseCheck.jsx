import React, {Component} from 'react';

class ResponseCheck extends Component {
    state = {
        //state 안에 state를 쓸 수 있다
        state:'waiting',
        message:"클릭해서 시작하세요",
        result :[]
    }

    //setTimeout을 제어하기 위한 장치
    timeout;

    startTime;
    endTime;

    onClickScreen = () =>{
        //구조분해 할당 하는 습관을 들이는 것이 좋음
        const {state, message, result} = this.state;
        if(state === 'waiting'){
            this.setState({
                state:'ready',
                message:'초록색이 되면 클릭하세요'
            });
            this.timeout = setTimeout(()=>{
                this.setState({
                    state:'now',
                    message:'지금 클릭'
                });
                this.startTime = new Date();
            }, Math.floor(Math.random()*1000)+2000);
        } else if(state === 'ready'){

            this.setState({
                state:'waiting',
                message:'이런, 성급하시네요! 초록색이 된 후에 클릭하세요'
            })
            //여기서 끝이 아니라, 위의 setTimeout이 실행되지 않도록 초기화도 시켜줘야 한다
            clearTimeout(this.timeout);

        } else if(state === 'now'){
            this.endTime = new Date();
            this.setState((prevState)=>{
                return{
                    state:'waiting',
                    message:'클릭해서 시작하세요',
                    result:[...prevState.result, this.endTime - this.startTime] //옛날 배열에 push(반드시 함수형 사용)
                }
            });

        }

    }

    renderAverage = () =>{
        const {result} = this.state;
        return result.length === 0 ? null : <div>평균 시간 - {result.reduce((a, c) => a+c) / result.length}ms</div>
    }

    render(){
        const {state, message} = this.state
        return(
            <>
                <div id="screen"
                     className={state}
                     onClick={this.onClickScreen}>
                    {message}
                </div>
                {this.renderAverage()}              
            </>
        );
    }
}
//jsx에서 false, null, undefined는 태그가 없다는 뜻
//리액트 render 안에서 조건문은 삼항 연산자로 사용함 

export default ResponseCheck;