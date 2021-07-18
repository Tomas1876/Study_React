import React, { Component } from 'react';

class TOC extends Component{

    render(){
        console.log('TOC render');
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while( i < data.length){
            lists.push(<li key={data[i].id}>
                <a href={"/content/" + data[i].id}
                data-id={data[i].id} //data-id는 이벤트 객체의 dataset이라는 속성을 이용해 접근할 수 있다
                onClick={(e) => {
                    e.preventDefault();
                    this.props.onChangePage(e.target.dataset.id, 'read');
                }}>{data[i].title}</a>
            </li>);
            i = i+1;
        }
        return(
            <nav>
                <ul>{lists}</ul>
            </nav>
        );
    }

}

export default TOC;