import React, { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
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

    if(mode === 'delete'){

      if(window.confirm('정말 삭제하시겠습니까?')){ //사용자가 예를 누르면 참이 된다
        var _contents = Array.from(this.state.contents);
        var i = 0
        while(i < _contents.length){
          if(_contents[i].id === this.state.selected_content_id){
              _contents.splice(i, 1);
              break;
          }

          i = i + 1;

        }
        this.setState({
          mode:'welcome',
          contents:_contents
        });
        alert('삭제되었습니다');

      } else{

      }

    } else{

      this.setState({
        mode:mode
      });

    }

  }

  onSubmitCreate =(_title, _desc) =>{
    console.log(_title, _desc);
    var max = this.state.max_id;
    // var _contents = this.state.contents.concat({id:max + 1, title:_title, desc:_desc});
    
    // this.setState({
    //   contents:_contents,
    //   max_id:max +1
    // });

    //배열에 값을 추가하는 방법은 push와 concat 두 가지가 있으나
    //push는 원본을 바꾼다(arr =[2,3]일때 arr.push(1) 이면 arr 원본에 1을 추가하는 것)
    //그러나 concat은 원본은 그대로 두고 복제본을 만들어 값을 추가한 새로운 배열을 리턴한다
    //var arr2 = arr.concat(1)이면 arr은 여전히 [2,3]이고
    //concat이 리턴한 arr2가 [2,3,1]이다
    //리액트의 성능을 개선하기 위해서는 push보다 concat이 더 적합하다

    //concat말고 from도 배열을 복사할 수 있다
    //만약 배열 아니라 객체를 복사해서 리턴하고 싶다면 Object.assign()을 사용할 수 있다
    //예를 들어 var a = {name:a} 일때 var b = Object.assign({},a) 로 빈 객체를 추가하더라도
    // a == b는 false가 된다 만약 var b =  Object.assign({name2:b},a) 라고 하면
    //var b는 {name2:b, name:a}인 객체가 된다
    
    var newContents = Array.from(this.state.contents);
    newContents.push({id:max + 1, title:_title, desc:_desc});
    this.setState({
      contents:newContents //기존의 배열을 복사한 것을 리턴한 newContents에 push 했으니 원본은 그대로!
    })
  }

  onSubmitUpdate = (_id, _title, _desc, _content) =>{

    console.log(_id, _title, _desc);
    var _contents = Array.from(this.state.contents);
    var i = 0;
    while(i < _contents.length){
      if(_contents[i].id === _id){
        _contents[i] = {id:_id, title:_title, desc:_desc};
        break;
      }
      i = i + 1;
    }
    this.setState({
      contents:_contents 
    })

  }
  getReadContent = () =>{

    var i =0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i = i+1;
    }

  }
  getContent =() =>{
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    } else if(this.state.mode === 'read'){      
      var _content = this.getReadContent();
      _article = <ReadContent title={ _content.title} desc={ _content.desc}></ReadContent>
      
    } else if(this.state.mode === 'create'){
        _article = <CreateContent onSubmit={this.onSubmitCreate}></CreateContent>
    } else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={this.onSubmitUpdate}></UpdateContent>  
    }
    return _article;
  }

  render(){
    console.log('App render');
    return(
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={this.onChangePage}>
        </Subject>
        <TOC onChangePage={this.onChangePage} data={this.state.contents}></TOC>
        <Control onChangeMode={this.onChangeMode}/>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
