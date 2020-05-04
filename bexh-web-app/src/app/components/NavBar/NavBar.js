import React from 'react';
import './style.scss';

export default class NavBar extends React.Component {
    render() {
        return (
            <nav role="navigation">
                <div id="NavLeft">
                    <div id="Logo"><a href="https://www.google.com">BEXH</a></div>
                    <input id="Search" placeholder=" Search" />
                </div>
                <div id="NavRight">
                    <ul>
                        <li><a href="https://www.google.com">Sports</a>
                            <ul className="dropdown">
                                <li><a href="https://www.google.com">Football</a></li>
                                <li><a href="https://www.google.com">Basketball</a></li>
                                <li><a href="https://www.google.com">Baseball</a></li>
                                <li><a href="https://www.google.com">Hockey</a></li>
                            </ul>
                        </li>
                        <li><a href="https://www.google.com">User Hub</a></li>
                        <li><a href="https://www.google.com">Account</a>
                            <ul className="dropdown">
                                <li><a href="https://www.google.com">Friends</a></li>
                                <li><a href="https://www.google.com">Banking</a></li>
                                <li><a href="https://www.google.com">Settings</a></li>
                                <li id="LogOut"><a href="https://www.google.com">Log Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
