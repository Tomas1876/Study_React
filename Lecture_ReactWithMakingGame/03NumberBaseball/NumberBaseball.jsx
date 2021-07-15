import React, {Component} from 'react'; 

function getNumbers(){ //숫자 네 개를 랜덤하게 뽑는 함수(중복 X)



}

class NumberBaseball extends Component{
    state = {
        result:'',
        value:'',
        answer: getNumbers(),
        tries:[]
    };

    onSubmitForm = () =>{

    }

    onChangeInout = () => {

    }

    render(){
        return (
            <>
               <h1>{this.state.result}</h1>
               <form onSubmit={this.onSubmitForm}>

                    <input maxLength={4} value={this.state.value} onChnge={this.onChangeInout} />

               </form>
               <div>차시 : {this.state.tries.length}</div>
               <ul> 
                   {['사과','바나나','포도','감','귤'].map((v)=>{ 
                       return(
                        <li>{v}</li>
                       );
                   })};
               </ul>
            </>
        );
    }

}

//export const hello = 'hello'; // default를 사용하지 않고 export했다면 import { hello } 

export default NumberBaseball; //이렇게 default로 export했다면 import Numberbaseball 이렇게 import한다
                               // default로 export하는 건 한 파일에서 한 번만 할 수 있다

//node의 module 문법(node에서는 위의 문법을 지원하지 않는다)
//기본적으로 webpack은 node로 돌리기 때문에 import를 사용할 수 없지만
//webpack의 babel이 import를 require로 바꿔주기 때문에 사용할 수 있는 것
//물론 webpack.config.js에서는 node문법을 사용해야 한다
//const React = require('react');
//module.exports = NumberBaseball;
//exports.hello = 'hello';