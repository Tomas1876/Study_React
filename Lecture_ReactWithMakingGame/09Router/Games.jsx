import React from 'react'; 
import {BrowserRouter, HashRouter, Route, Link} from 'react-router-dom';
import GameMatcher from "./GameMatcher"

const Games = () => {

  //이렇게 최상위 요소로 router를 만들어주거나, client.jsx에서 설정할 수도 있다
    return (
        <BrowserRouter>
          <div>
            공통인 부분<br />
            <Link to="/game/number-baseball" >숫자야구</Link>
            <br />
            <Link to="/game/rock-scissors-paper">가위바위보</Link>
            <br />
            <Link to="/game/lotto-generator" >로또 추첨</Link>
            <br />
            <Link to="/game/index" >GameMatcher</Link>
          </div>
          <div>
            <Route path="/game/:name" component={GameMatcher} />
          </div>
        </BrowserRouter>
    );
    //원래는 컴포넌트를 client.jsx에서 임포트 해서 사용했지만 
    //router가 여러 개의 페이지를 동시에 렌더링 해주기 때문에
    //path로 가상의 페이지 주소를 만들어 각각 컴포넌트를 연결해준 것

    //페이지가 여러 개인 척 하는 것이고, 실제는 한 페이지이기 때문에
    //진짜로 페이지 이동하는 a태그를 사용하면 에러가 발생한다

    //해쉬라우터는 새로고침해도 페이지가 동작한다
    //주소창에서 # 뒤에 붙는 부분은 브라우저만 알고 있으면 되는 부분이기 때문
    //하지만 브라우저라우터도 wepackconfig에 코드를 추가하면 새로고침을 이용할 수 있다
    //해쉬라우터를 사용하면 검색엔진에서 뜨지 않는다 그래서 실무에서 잘 안 씀
    //(검색엔진은 서버에 물어봐서 페이지를 확인한다)

};

export default Games;