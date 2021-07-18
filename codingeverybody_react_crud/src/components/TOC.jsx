import React, { Component } from 'react';

class TOC extends Component{
    //부모 컴포넌트에 변화가 일어나면 자식컴포넌트가 다시 렌더링 되기 때문에
    //현재 TOC와 무관한 컴포넌트에 변화가 일어나도
    //TOC까지 다시 렌더링이 된다
    //이를 막기 위해 조치가 필요하다 그것이 shouldComponentUpdate()
    //shouldComponentUpdate() 는 두 가지 인자를 받을 수 있다
    //1. newProps == 변화가 일어났을 때 새로운 props값
    //2. newState == 변화가 일어났을 때 새로운 state값
    //이 함수가 false를 리턴하면 렌더는 호출되지 않는다
    //그런데 만약 App.js에서 배열에 값을 추가할 때 push를 사용한다면
    //배열의 원본 자체가 바뀌어버리기 때문에 this.props.data === newProps.data 가 true가 된다
    //그래서 concat를 써야 한다
    
    shouldComponentUpdate(newProps, newState){
        console.log('=======shouldComponentUpdate');
       if(this.props.data === newProps.data){
            return false;
       }
       return true;
    }
    render(){
        console.log('=======TOC render');
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