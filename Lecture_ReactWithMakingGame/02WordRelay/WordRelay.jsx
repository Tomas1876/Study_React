//컴포넌트를 분리할 때마다 반드시 npm에서 사용하는 것을(여기서는 react) 불러와야 한다
const React = require('react');
//위를 간략화하면 아래와 같다
//const {Component} = React; 

class WordRelay extends React.Component{
    state ={
        text:'Hello, webpack'
    };
 
    render(){
        return <h1>{this.state.text}</h1>
    }
}

//이것도 파일을 쪼갤 때 반드시 적어야함
//내가 쪼갠 파일에서 사용하는 컴포넌트를 바깥에서도 사용할 수 있게 해주는 것
//노드의 모듈시스템
module.exports = WordRelay;