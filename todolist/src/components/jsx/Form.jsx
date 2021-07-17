import React from 'react';
import '../css/Form.css';

/* 총 네 가지의 props를 받을 것 
    value : Input 내용
    onChange : Input 내용이 변경될 때 실행되는 함수
    onCreate : 버튼이 클릭될 때 실행되는 함수
    onKeyPress : 인풋에서 키를 입력할 때 실행되는 함수로 추후에 Enter Key Event 로 onCreate 와 동일한 작업을 위한 함수

    구현해야 하는 기능
    1. input 값이 변경되면 state 업데이트
    2. 버튼이 클릭되면 새로운 todo 생성 후 todos 업데이트
    3. input 박스에서 Enter 키를 누르면 버튼 이벤트와 동일하게 새로운 todo 생성 후 todos 업데이트
*/

const Form = ({value, onChange, onCreate, onKeyPress}) => {
    return(

        <div className='form'>
            <input value={value}
                placeholder='오늘 할 일을 입력하세요'
                onChange={onChange}
                onKeyPress={onKeyPress} />
            <div className='create-button' onClick={onCreate}>추가</div>
        </div>

    );
};

export default Form;