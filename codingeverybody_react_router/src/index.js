import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch, Link, NavLink, useParams} from 'react-router-dom';

function Home(){
  return(
    <div>
      <h2>Home</h2>
      Home...
    </div>
  );
}

let contents =[
  {id:1, title:"HTML",description:"HTML is..."},
  {id:2, title:"CSS",description:"CSS is..."},
  {id:3, title:"Js",description:"Js is..."}
]
function Topic(){
  let params = useParams();
  let topic_id = params.topic_id;
  let selected_topic = {
    title:'Not Found',
    description:"Sorry"
  }
  for(let i =0; i < contents.length; i++){
    if(contents[i].id === Number(topic_id)){
      selected_topic = contents[i];
      break;
    }
  }
  return(
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  );
}
function Topics(){
  let list = [];
  for(let i =0; i < contents.length; i++){
    list.push(<li key={contents.title}><NavLink to={'/topics/'+contents[i].id}>{contents[i].description}</NavLink></li>)
  }
  return(
    <div>
      <h2>Topics</h2>
        <ul>
          {list}
        </ul>
        <Route path="/topics/:topic_id">
          <Topic />
        </Route>
      </div>
  );
}

function Contact(){
  return(
    <div>
      <h2>Contact</h2>
      Contact...
    </div>
  );
}
function App(){
    return(
      <div>
        <h1>React Router DOM</h1>
        <ul>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/topics">Topics</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
        <Switch>
          <Route path="/home"><Home /></Route>    
          <Route path="/topics"><Topics /></Route>
          <Route path="/contact"><Contact /></Route>
          <Route path="/">Not Found</Route>
        </Switch>
      </div>
    )
}
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
