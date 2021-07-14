const React = require('react');

//구조분해 할당 문법 사용(Hooks 사용시 반복되는 React.setState 더 깔끔하게 만들기)
const {useState, useRef} = React;
 

const GuGuDan = () =>{

    const [first, setFirst] = useState(Math.ceil(Math.random()*9));
    //원래는 const [first, setFirst] = React.useState(Math.ceil(Math.random()*9));
    const [second, setSecond] = useState(Math.ceil(Math.random()*9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null); //초기값 null

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        if(parseInt(value) === first * second){
            setResult(value + '는 정답입니다');
            setFirst(Math.ceil(Math.random()*9));
            setSecond(Math.ceil(Math.random()*9));
            setValue('');
            
            inputRef.current.focus(); 

        } else{
            setResult(value + '는 정답이 아닙니다');
            setValue('');
            inputRef.current.focus();
        }

    }

    return (
        <>  이건 React.Fragment의 간략한 표현
            
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} value={value} />
                
                <button id="button" className="" htmlFor>입력!</button>
            </form>
            <div id="result">{result}</div>
        </>
    );

}

module.exports = GuGuDan;