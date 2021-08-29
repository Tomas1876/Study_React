import React, { Component } from 'react';
import {connect} from 'react-redux';

/*
class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <h1>WEB</h1>
                    WWW
                </header>
            </div>
        );
    }
}

export default Header;*/
class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <h1><a href="#welcome" onClick={function(){
                        this.props.onClick();
                    }.bind(this)}>WEB</a></h1>
                    WWW
                </header>
            </div>
        );
    }
}
export default connect(null, 
                       function(dispatch){
                           return{
                               onClick:function(){
                                   dispatch({type:'CHANGE_MODE', mode:'WELCOME'})
                               }
                           }
                        }
                )(Header);