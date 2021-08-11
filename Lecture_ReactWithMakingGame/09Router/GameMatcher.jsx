import React , {Component} from 'react';
//import {withRouter} from 'react-router-dom';
import NumberBaseball from "../03NumberBaseball/NumberBaseballClass";
import RSP from "../05RSP/RSP";
import Lotto from "../06Lotto/Lotto";

class GameMatcher extends Component {
    render(){
        console.log(this.props)
        if(this.props.match.params.name == "number-baseball"){
            return <NumberBaseball />
        } else if(this.props.match.params.name == "rock-scissors-paper"){
            return <RSP />
        } else if(this.props.match.params.name == "lotto-generator"){
            return <Lotto />
        }
        return(
            <>
                일치하는 게임이 없습니다.
            </>
        );
    }
}

//export default withRouter(GameMatcher);
export default GameMatcher;