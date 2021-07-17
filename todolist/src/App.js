import React from 'react';
import TodoList from './components/jsx/TodoList';
import Form from './components/jsx/Form';
import TodoItemList from './components/jsx/TodoItemList';

class App extends React.Component {

  state={
    input:"",
    todos:[],
    id:1
  }

  handleChange =(e)=> {
    this.setState({
        input: e.currentTarget.value
    });
}

handleCreate =()=> {
    const { input, todos } = this.state;
    if (input === "") {
        alert("오늘 할 일을 입력해주세요!");
        return;
    }
    this.setState({
        input: "",
        todos: todos.concat({
            id: this.id++,
            content: input,
            isComplete: false
        })
    });
}

handleKeyPress = (e) => {
    if (e.key === "Enter") {
        this.handleCreate();
    }
}

  render() {
      return (
          <TodoList form={
          <Form 
              value={this.state.input}
              onChange={this.handleChange}
              onCreate={this.handleCreate}
              onKeyPress={this.handleKeyPress}
          />}>
              <TodoItemList todos ={this.state.todos}/>
          </TodoList>
      );
  }
}

export default App;