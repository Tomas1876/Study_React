import React from 'react';
import TodoItem from './TodoItem'

/* 
TodoItemList 컴포넌트는 TodoItem 컴포넌트 여러 개를 렌더링해주는 역할을 한다.
동적인 '리스트'를 렌더링을 하는 경우에는 함수형이 아닌 클래스형 컴포넌트로 작성하는 것이 컴포넌트 성능 최적화를 하기에 유리하다.
    todos: todo 객체들이 들어있는 배열
    onToggle : 체크박스를 on/off 하는 함수
    onRemove : todo 객체를 삭제하는 함수      
*/

class TodoItemList extends React.Component{
    render(){
        const {todos, onToggle, onRemove} = this.props;
        

        return(
            <div>
                 <TodoItem content="TodoItem1" />
                 <TodoItem content="TodoItem2" />
                 <TodoItem content="TodoItem3" />
            </div>
        );
    }
}

export default TodoItemList;