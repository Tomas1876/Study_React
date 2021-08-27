import React from 'react';
import { useSelector } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';

//useActions를 이용하면 여러 개의 액션을 사용해야 하는 경우 코드를 훨씬 깔끔하게 정리할 수 있다
//
import useActions from '../lib/useActions';

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos
  }));

  //useActions에는 두 가지 파라미터가 필요한데, 첫번째는 액션 생성 함수로 이루어진 배열
  //두번째는 deps배열로 이 배열 안에 들어있는 원소가 바뀌면 액션을 디스패치하는 함수를 새로 만들게 된다
  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    []
  );
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

export default React.memo(TodosContainer);
