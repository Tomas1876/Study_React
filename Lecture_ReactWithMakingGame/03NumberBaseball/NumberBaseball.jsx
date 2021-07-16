import React, {Component} from 'react'; 
import Try from './Try';
function getNumbers(){ //숫자 네 개를 랜덤하게 뽑는 함수(중복 X)
    const candidates = [1,2,3,4,5,6,7,8,9];
    const array =[];
    for(let i = 0; i < 4; i += 1){          //Math.floor는 소수점 이하를 버림한다
        const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component{
    state = {
        result:'',
        value:'',
        answer: getNumbers(),
        tries:[]
    };

    onSubmitForm = (e) =>{
        e.preventDefault();

        if( this.state.value === this.state.answer.join('')){ //join()은 배열의 원소를 결합해 하나의 문자열로 만들어준다
            this.setState({
                result:'홈런!',
                tries:[...this.state.tries, {try:this.state.value, result:'홈런!'}]
                //리액트에서 배열에 값을 넣을 때(변화 감지하길 원한다면) push를 사용할 수 없다
                //리액트는 참조값이 변화해야 렌더링을 해주는데 단순히 arr.push(1) 이렇게 하면 감지하지 못한다
                // 그래서 위처럼 const arr2 = [...arr, 2] 이렇게 기존의 배열을 복사해서 새 값과 넣어주어야 한다
                // 단순히 push를 하면 arr이 빈 배열에서 1을 가진 배열로 바뀌어도 똑같다고 인식되지만
                // 이렇게 복사해서 값을 다시 넣어주면 arr === arr2는 false이기 때문에 리액트가 감지해서 렌더링 해준다
            });
            alert('게임을 다시 시작합니다');
                this.setState({
                    value:'',
                    answer: getNumbers(),
                    tries:[]
                });
        } else{

            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9){
                this.setState({
                    //result:'10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다!'
                    result: '10번 넘게 틀려서 실패! 답은 '+this.state.answer.join(',')+'였습니다!'
                });

                alert('게임을 다시 시작합니다');
                this.setState({
                    value:'',
                    answer: getNumbers(),
                    tries:[]
                });
            } else{
                for(let i = 0; i <4; i += 1){
                    if(answerArray[i] === this.state.answer[i]){
                        strike += 1;
                    } else if(this.state.answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }

                this.setState({
                    tries: [...this.state.tries, {try: this.state.value, result:strike+' 스트라이크, '+ball+' 볼입니다'}]
                })
            }

        }

    }

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value:e.target.value
        });
    }
    render(){
        return (
            <>
               <h1>{this.state.result}</h1>
               <form onSubmit={this.onSubmitForm}>

                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />

               </form>
               <div>차시 : {this.state.tries.length}</div>
               <ul> 
                   {this.state.tries.map((v, i)=>{ 
                       return(
                        <Try key={(i+1)+'차 시도:'} tryInfo={v} index={i}/> /*props로 부모자식관계가 형성된다 부모인 NumberBaseball이 자식 Try에게 props를 물려줌 */
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