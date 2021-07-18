import React, { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import Control from './components/Control';
import './App.css';

class App extends Component{
  
  state = {
    mode:'Welcome',
    selected_content_id:0,
    subject:{title:'WEB', sub:'World Wid Web!'},
    welcome:{title:'Welcome', desc:'Hello, React!'},
    contents:[
      {id:1, title:'HTML', desc:'HTML is for information'},
      {id:2, title:'CSS', desc:'CSS is for design'},
      {id:3, title:'Javascript', desc:'Javascript is for interactive'}
    ],
    max_id:3
  }

  onChangePage =(id, mode) =>{
    this.setState({
      mode:mode,
      selected_content_id:Number(id) //id가 인자로 들어올 때 문자이기 때문에 숫자로 바꿔주어야 함
    });
  }

  onChangeMode = (mode) => {
    this.setState({
      mode:mode
    });
  }

  onSubmitCreate =(_title, _desc) =>{
    console.log(_title, _desc);
    // this.state.contents.push({id:this.state.contents.id + 1, title:_title, desc:_desc });
    // this.setState({
    //     contents:this.state.contents  
    // });
    var max = this.state.max_id;
    var _contents = this.state.contents.concat({id:max + 1, title:_title, desc:_desc});
    
    this.setState({
      contents:_contents,
      max_id:max +1
    });

    //배열에 값을 추가하는 방법은 push와 concat 두 가지가 있으나
    //push는 원본을 바꾼다(arr =[2,3]일때 arr.push(1) 이면 arr 원본에 1을 추가하는 것)
    //그러나 concat은 원본은 그대로 두고 복제본을 만들어 값을 추가한 새로운 배열을 리턴한다
    //var arr2 = arr.concat(1)이면 arr은 여전히 [2,3]이고
    //concat이 리턴한 arr2가 [2,3,1]이다
    //리액트의 성능을 개선하기 위해서는 push보다 concat이 더 적합하다
  }
  render(){
    console.log('App render');
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){

      var i =0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          _article = <ReadContent title={_title} desc={_desc}></ReadContent>
          break;
        }
        i = i+1;
      }
      
    } else if(this.state.mode === 'create'){
        _article = <CreateContent onSubmit={this.onSubmitCreate}></CreateContent>
        
    }
    return(
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={this.onChangePage}>
        </Subject>
        <TOC onChangePage={this.onChangePage} data={this.state.contents}></TOC>
        <Control onChangeMode={this.onChangeMode}/>
        {_article}
      </div>
    );
  }
}

export default App;
