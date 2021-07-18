import React, { Component } from 'react';

class CreateContent extends Component{
    render(){
        console.log('Content render');
        return(
            <article>
                    <h2>CreateContent</h2>
                    <form action="/create_process" method="post"
                        onSubmit={(e)=>{
                             e.preventDefault();
                             //debugger; //이렇게 debugger로 탐색하는 버릇을 들이자
                             this.props.onSubmit(
                                 e.target.title.value,
                                 e.target.desc.value
                             );
                        }}>
                        <p><input type="text" name="title" placeholder="title"></input></p>
                        <p>
                            <textarea name="desc" placeholder="description"></textarea>
                        </p>
                        <p><input type="submit"></input></p>
                    </form>
            </article>
        );
    }
}

export default CreateContent;