import React from 'react';
import './style.scss';

export default class NavBar extends React.Component {
    render() {
        return (
            <nav role="navigation">
                <div id="NavLeft">
                    <div id="Logo"><a href="#">BEXH</a></div>
                    <input id="Search" placeholder=" Search" />
                </div>
                <div id="NavRight">
                    <ul>
                        <li><a>Sports</a>
                            <ul class="dropdown">
                                <li><a>Football</a></li>
                                <li><a>Basketball</a></li>
                                <li><a>Baseball</a></li>
                                <li><a>Hockey</a></li>
                            </ul>
                        </li>
                        <li><a>User Hub</a></li>
                        <li><a>Account</a>
                            <ul class="dropdown">
                                <li><a>Friends</a></li>
                                <li><a>Banking</a></li>
                                <li><a>Settings</a></li>
                                <li id="LogOut"><a>Log Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
