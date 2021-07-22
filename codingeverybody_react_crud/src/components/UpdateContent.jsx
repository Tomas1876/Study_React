import React, { Component } from 'react';

class UpdateContent extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            id:this.props.data.id,
            title: this.props.data.title,
            desc: this.props.data.desc
          }
    }
    onChangeValue = (e) =>{
        console.log(e.target.value);
        this.setState({
            [e.target.name]:e.target.value //e.target.name을 사용하면 이벤트 타겟의 name값이 들어오게 된다
        });
    }
    render(){
        console.log('UpdateContent render');
        console.log(this.props.data.title)
        return(
            <article>
                    <h2>UpdateContent</h2>
                    <form action="/create_process" method="post"
                        onSubmit={(e)=>{
                             e.preventDefault();
                             //debugger; //이렇게 debugger로 탐색하는 버릇을 들이자
                             this.props.onSubmit(
                                 this.state.id,
                                 this.state.title,
                                 this.state.desc
                             );
                        }}>
                            <input type="hidden" name="id" value={this.state.id}></input>
                        <p>
                            <input type="text" 
                                   name="title" 
                                   placeholder="title"
                                   value={this.state.title}
                                   onChange={this.onChangeValue}></input>
                            </p>
                        <p>
                            <textarea name="desc"
                                      placeholder="description"
                                      value={this.state.desc}
                                      onChange={this.onChangeValue}></textarea>
                        </p>
                        <p><input type="submit"></input></p>
                    </form>
            </article>
        );
    }
}

export default UpdateContent;