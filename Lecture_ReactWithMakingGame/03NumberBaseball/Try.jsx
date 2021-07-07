import React, {memo} from 'react';

//Hooks로 바꾸기
//const Try = (props) => { 혹은 구조분해할당을 해서 아래처럼 할 수도 있다
const Try = memo(({ tryInfo }) =>{
    return(
        <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
    </li>
    )
});

export default Try;