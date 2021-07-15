import React, {Component} from 'react';

class Try extends Component{
    render(){
        return(
            <li key={this.props.value}>{this.props.index + this.props.value}</li>/* 리액트가 key를 보고 같은 컴포넌트인지 아닌지 판단한다 */
        );
    }
}

export default Try;