//컴포넌트를 분리할 때마다 반드시 npm에서 사용하는 것을(여기서는 react) 불러와야 한다
const React = require('react');
const {Component} = React; 

class WordRelay extends Component{
    state ={
        word:'가희',
        value:'',
        result:''
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.word[this.state.word.length -1] === this.state.value[0]){ //word의 마지막 글자와 value의 첫번째 글자가 같으면(정답)
            this.setState({
                result:'딩동댕',
                word:this.state.value,
                value:''
            });
            this.input.focus();
        } else{
            this.setState({
                result:'땡',
                value:''
            });
            this.input.focus();
        }
    }; //클래스 메서드는 무조건 화살표 함수 사용해야 한다(직접 만든 메서드)
    
    onChangeInput = (e) => {
        this.setState({value: e.currentTarget.value});
        /*
            e.target은 부모로부터 이벤트가 위임되어 발생하는 자식의 위치, 내가 클릭한 자식 요소를 반환한다.
            하지만 currentTarget은 이벤트가 부착된 부모의 위치를 반환한다.
        */
    };
    input;
    onRefInput = (c) => {
        this.input = c;
    };

    render(){
        return (
            <>
                <div>{this.state.word}</div>
                    <form onSubmit={this.onSubmitForm}>
                        <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
                        <button>입력!</button>
                    </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}
//value와 onChange는 input에서 세트! 아니면 defaultValue를 사용할 것

//이것도 파일을 쪼갤 때 반드시 적어야함
//내가 쪼갠 파일에서 사용하는 컴포넌트를 바깥에서도 사용할 수 있게 해주는 것
//노드의 모듈시스템
module.exports = WordRelay;