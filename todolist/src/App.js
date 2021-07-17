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
            id: this.state.id++,
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

handleToggle = (id) =>{
  const todos = this.state.todos;

  const isComplete = todos.find(todos => todos.id === id).isComplete;
  if(!window.confirm(isComplete ? "미완료 처리하시겠습니까?" : "완료처리 하시겠습니까?")){
    return;
  }

  const i = todos.findIndex(todo => todo.id === id);

  const selected = todos[i];

  const nextTodos = [...todos];

  nextTodos[i] = {...selected, isComplete: !selected.isComplete};

  this.setState({
    todos:nextTodos
  });
}
handleRemove = (id) => {

  const todos = this.state.todos;

  const removeContent = todos.find(todos => todos.id === id).content;
  if(!window.confirm("'" + removeContent + "' 을 삭제하시겠습니까?")) {
      return;
  }

  this.setState({
      todos : todos.filter(todo => todo.id !== id)
  });
}

render() {
  return (
      <TodoList form={(
          <Form
              value={this.state.input}
              onChange={this.handleChange}
              onCreate={this.handleCreate}
              onKeyPress={this.handleKeyPress} />
      )}>
          <TodoItemList
              todos={this.state.todos}
              onToggle={this.handleToggle}
              onRemove={this.handleRemove} />
      </TodoList>
  );
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
              <TodoItemList todos ={this.state.todos}
                            onToggle={this.handleToggle}
                            onRemove={this.handleRemove} />
          </TodoList>
      );
  }
}

export default App;