const React = require('react');
const ReactDOM = require('react-dom');
/*  위 두 줄을 import로 표현하면 다음과 같다
    import React from 'react';
    import ReactDom from 'react-dom';
*/

const NumberBaseball = require('./NumberBaseball');

ReactDOM.render(<NumberBaseball />, document.querySelector('#root'));