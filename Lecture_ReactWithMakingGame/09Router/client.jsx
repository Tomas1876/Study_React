import React from 'react';
import ReactDom from 'react-dom';
import Games  from "./Games";

ReactDom.render(<Games  />, document.querySelector('#root'));
//아래처럼 router로 감싸줄 수도 있고, Gamse 컴포넌트에서 설정할 수도 있다
//eactDom.render(<BrowserRouter><Games  /></BrowserRouter>, document.querySelector('#root'));