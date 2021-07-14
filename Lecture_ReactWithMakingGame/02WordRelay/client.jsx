const React = require('react');
const ReactDOM = require('react-dom');

//사실 이 파일은 js로 확장자를 해도 되지만
//내부에 jsx 문법이 있다면 jsx를 확장자로 하는 것이 좋다
//왜냐하면 확장자가 jsx라면 굳이 파일을 열지 않고도
//이것이 내부에 어떤 문법이 있는지, 그리고 리액트 전용 파일이라는 점을 바로 알 수 있기 때문

/*
class WordRelay extends React.Component{

    state ={

    };

    render(){

    }

}

이렇게 하지 않고 외부파일로 분리한다
그리고 다시 불러온다
*/
const WordRelay = require('./WordRelay');

ReactDOM.render(<WordRelay />, document.querySelector('#root'));