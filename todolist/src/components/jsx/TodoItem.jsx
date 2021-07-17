import React from 'react';
import '../css/TodoItem.css';

/*  props
    content: todo 내용
    isComplete : 체크박스 on/off 상태를 의미하며, 오늘 할 일의 완료 유무를 판단
    id : TodoItem 의 Key 값
    onToggle : 체크박스를 on/off 시키는 함수
    onRemove : TodoItem 을 삭제시키는 함수
*/

class TodoItem extends React.Component{
    render(){

        const {content, isComplete, id, onToggle, onRemove} = this.props;

        return(
            <div className='todo-item' onClick={ () => onToggle(id)}>
                {
                    isComplete && (<div className="isComplete-mark">✓ </div>)
                }
                <div className={`todo-item-content ${isComplete && 'isComplete'}`}>
                    <div>
                        {content}
                    </div>
                </div>
                
                <div className='todo-item-remove' onClick={(e)=>{
                    e.stopPropagation(); //이벤트 확산 막음 onToggle 실행 안 되게 함
                    onRemove(id)}
                }>
                    X
                </div>
            </div>
        );

    }
}

export default TodoItem;