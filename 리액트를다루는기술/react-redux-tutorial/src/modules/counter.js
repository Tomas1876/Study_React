import { createAction, handleActions } from 'redux-actions';
//createAction은 간단하게 액션 생성함수를 선언할 수 있게 해준다
//handleActions은 리듀서 함수의 가독성을 높여준다
//첫번째 파라미터는 각 액션에 대한 업데이트 함수를 넣고 두번째 파라미터는 초기 상태를 넣는다

//액션 타입 정의
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//액션 생성 함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//Counter 모듈의 초기 상태 설정
const initialState = {
  number: 0,
};

const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);

export default counter;
