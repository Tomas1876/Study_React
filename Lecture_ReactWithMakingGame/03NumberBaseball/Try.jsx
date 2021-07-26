import React, {memo, useState} from 'react';


//Hooks로 바꾸기
//const Try = (props) => { 혹은 구조분해할당을 해서 아래처럼 할 수도 있다
const Try = memo(({ tryInfo }) =>{

    //props는 부모가 바꿔야지 자식은 절대 바꿀 수 없다
    //하지만 실무를 하다 보면 바꿔야 하는 경우가 있는데 이때 props를 state 안에 넣어주고
    //그 state를 setState를 통해 바꿔준다
    //원래 tryInfo.result인데 아래처럼 쓸 수 있는 것
    const [result, setResult] = useState();

    //만약 클래스형이라면
    // state = {
    //     result : this.props.result,
    //     try : this.props.try 
    // }

    //constructor 를 사용하면 더 정밀한 사용이 가능하다

    const onClick = () => {
        setResult('1');
    }

    return(
        <li>
        <div>{tryInfo.try}</div>
        <div>{result}</div>
    </li>
    )
});

export default Try;