import React from 'react'; 
import {BrowserRouter, HashRouter, Route, Link} from 'react-router-dom';
import NumberBaseball from "../03NumberBaseball/NumberBaseballClass";
import RSP from "../05RSP/RSP"; //RSP와 Lotto는 class형이 이미 있음
import Lotto from "../06Lotto/Lotto";

const Games = () => {

  //이렇게 최상위 요소로 router를 만들어주거나, client.jsx에서 설정할 수도 있다
    return (
        <BrowserRouter>
          <div>
            공통인 부분<br />
            <Link to="/number-baseball" >숫자야구</Link>
            <br />
            <Link to="/rock-scissors-paper">가위바위보</Link>
            <br />
            <Link to="/lotto-generator" >로또 추첨</Link>
          </div>
          <div>
            <Route path="/number-baseball" component={NumberBaseball}/>
            <Route path="/rock-scissors-paper" component={RSP} />
            <Route path="/lotto-generator" component={Lotto}/>
          </div>
        </BrowserRouter>
    );
    //원래는 컴포넌트를 client.jsx에서 임포트 해서 사용했지만 
    //router가 여러 개의 페이지를 동시에 렌더링 해주기 때문에
    //path로 가상의 페이지 주소를 만들어 각각 컴포넌트를 연결해준 것

    //페이지가 여러 개인 척 하는 것이고, 실제는 한 페이지이기 때문에
    //진짜로 페이지 이동하는 a태그를 사용하면 에러가 발생한다

};

export default Games;