import React, { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import Content from './components/Content';
import './App.css';

class App extends Component{
  state = {
    mode:'read',
    selected_content_id:2,
    subject:{title:'WEB', sub:'World Wid Web!'},
    welcome:{title:'Welcome', desc:'Hello, React!'},
    contents:[
      {id:1, title:'HTML', desc:'HTML is for information'},
      {id:2, title:'CSS', desc:'CSS is for design'},
      {id:3, title:'Javascript', desc:'Javascript is for interactive'}
    ]
  }

  onChangePage =(id, mode) =>{
    this.setState({
      mode:mode,
      selected_content_id:Number(id) //id가 인자로 들어올 때 문자이기 때문에 숫자로 바꿔주어야 함
    });
  }


  render(){
    console.log('App render');
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;

    } else if(this.state.mode === 'read'){

      var i =0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i+1;
      }
      
    }

    return(
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={this.onChangePage}>
        </Subject>
        <TOC onChangePage={this.onChangePage} data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
