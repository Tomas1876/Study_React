import React from 'react';
import TodoList from './components/jsx/TodoList';
import Form from './components/jsx/Form';
import TodoItemList from './components/jsx/TodoItemList';

class App extends React.Component {
  render() {
      return (
          <TodoList form={<Form />}>
              <TodoItemList />
          </TodoList>
      );
  }
}

export default App;