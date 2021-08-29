import React, { Component } from 'react';

class Nav extends Component {
    render() {
        return (
            <div>
                <nav>
                    <ol>
                        <li><a href="html.html">HTML</a></li>
                        <li><a href="css.html">CSS</a></li>
                        <li><a href="js.html">JS</a></li>
                    </ol>
                </nav>
            </div>
        );
    }
}

export default Nav;