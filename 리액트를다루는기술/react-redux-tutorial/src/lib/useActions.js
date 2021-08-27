import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

//액션 생성함수를 액션을 디스패치 하는 함수로 변환하기
//액션 생성함수로 액션 객체를 만든다음 스토어에서 디스패치하는 작업을 해주는 함수로 만드는 것

//useActions에는 두 가지 파라미터가 필요한데, 첫번째는 액션 생성 함수로 이루어진 배열
//두번째는 deps배열로 이 배열 안에 들어있는 원소가 바뀌면 액션을 디스패치하는 함수를 새로 만들게 된다
export default function useActions(actions, deps) {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map(a => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : deps
  );
}
