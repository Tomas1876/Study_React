import React, {Component} from 'react';

class ResponseCheck extends Component {
    state = {
        //state 안에 state를 쓸 수 있다
        state:'waiting',
        message:"클릭해서 시작하세요",
        result :[]
    }

    onClickScreen = () =>{

    }

    renderAverage = () =>{
        const {result} = this.state;
        return result.length === 0 ? null : <div>평균 시간 - {result.reduce((a, c) => a+c) / result.length}ms</div>
    }

    render(){
        const {state, message}
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