const React = require('react');
const {useState, useRef} = React; 

const WordRelay_Hooks = () => {

    const [word, setWord] = useState('가희');
    const [value, setValue] = useState('');
    const [result, setReault] = useState('');

    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(word[word.length -1] === value[0]){ //word의 마지막 글자와 value의 첫번째 글자가 같으면(정답)
            
            setReault('딩동댕');
            setWord(value);
            setValue('');
            inputRef.current.focus();
        
        } else{

            setReault('땡');
            setValue('');
            inputRef.current.focus();
        }
    }    
    const onChangeInput = (e) => {
        setValue(e.target.value);

    };

        return (
            <>
                <div>{word}</div>
                    <form onSubmit={onSubmitForm}>
                        <lable htmlFor="im-id">글자를 입력하세요</lable>
                        <input id="im-id"className="im-class" ref={inputRef} value={value} onChange={onChangeInput} />
                        <button>입력!</button>
                    </form>
                <div>{result}</div>
            </>
        );
        
};

module.exports = WordRelay_Hooks;

//이 앱을 실행하면 브라우저 콘솔 창에 HMR이나 WDS같은 로그가 찍히는데
//HMR은 HotModuleReload, WDS는 WebpackDevServer다 
//각각의 변화가 어디에서 일어나는지도 잘 살필 것