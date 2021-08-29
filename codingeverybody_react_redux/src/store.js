import {createStore} from 'redux';

let initState = {
    mode:'WELCOME', //mode가 WELCOM이면 welcome_content가 노출되고 READ라면 selected_id에 따라 알맞은 content가 노출된다
    welcom_content:{
        title:"WEB",
        description:"Hello, WEB"
    },
    selected_content_id:1,
    contents:[
        {id:1, title:'HTML', descript:'HTML is...'},
        {id:2, title:'CSS', descript:'CSS is...'},
        {id:3, title:'JS', descript:'JS is...'}
    ]
}

//리듀서 작셩
function reducer(state = initState, action){
    return state;
}

//reducer를 스토어에 주입
export default createStore(reducer);