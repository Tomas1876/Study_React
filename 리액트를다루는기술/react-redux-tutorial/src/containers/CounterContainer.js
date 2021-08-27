import React, { useCallback } from 'react';

//useSelector를 이용하면 connect 함수를 사용하지 않고도 리덕스의 상태를 조회할 수 있다
// const 결과 = useSelector(상태 함수)  의 형태로 사용한다
import { useSelector, useDispatch } from 'react-redux';
//useDispatch란 컴포넌트 내부에서 스토어의 내장함수 dispatch를 사용할 수 있게 해주는 Hook이다
//const dispatch = useDispatch();
//dispatch({type:'SAMPLE_ACTION'}); 의 형태로 사용한다

import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = () => {
  
  //connect 대신 useSelector를 사용해 counter.number 값을 조회한 다음 return 부분에서 Counter에게 props로 넘겨주기
  const number = useSelector(state => state.counter.number);

  //아래 Counter 컴포넌트에 바로 dispatch를 적용해도 되지만 그럴 경우 렌더링이 일어날 때마다 함수도 새로 생성되기 때문에
  //최적화를 위해 useCallback으로 dispatch를 감싼 함수를 만든 다음, 그 함수 이름을 렌더링 되는 부분에 적어준다
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
