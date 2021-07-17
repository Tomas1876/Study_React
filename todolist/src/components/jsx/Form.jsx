import React from 'react';
import '../css/Form.css';

/* 총 네 가지의 props를 받을 것 
    value : Input 내용
    onChange : Input 내용이 변경될 때 실행되는 함수
    onCreate : 버튼이 클릭될 때 실행되는 함수
    onKeyPress : 인풋에서 키를 입력할 때 실행되는 함수로 추후에 Enter Key Event 로 onCreate 와 동일한 작업을 위한 함수
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