import React,{ memo } from 'react';

const Ball = memo(({number}) => {

        let background;
        if (number <= 10) {
            background = 'red';
          } else if (number <= 20) {
            background = 'orange';
          } else if (number <= 30) {
            background = 'yellow';
          } else if (number <= 40) {
            background = 'blue';
          } else {
            background = 'green';
          }
        return(
            <div className="ball" style={{background}}>{number}</div>
        );
});

//이건 함수 컴포넌트
//state를 가지지 않은 컴포넌트는 이렇게 함수형으로 만드는 것이 효율적이다
//모양이 비슷하지만 Hooks와는 다르니 주의할 것
//Hooks는 useState, useEffect 등을 사용하지만 함수컴포넌트는 아니다

export default Ball