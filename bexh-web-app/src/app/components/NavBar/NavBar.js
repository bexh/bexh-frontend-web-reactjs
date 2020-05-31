import React from 'react';
import './style.scss';
import {
  Link,
} from 'react-router-dom';

export default class NavBar extends React.Component {
    // TODO: set logo back to landing page. needed a way to get to event page temporarily
    render() {
        return (
            <nav role="navigation">
                <div id="NavLeft">
                    <div id="Logo"><Link to="/event/123">BEXH</Link></div>
                    <input id="Search" placeholder=" Search" />
                </div>
                <div id="NavRight">
                    <ul>
                        <li>Sports
                            <ul className="dropdown">
                                <li><Link to="/sports/football">Football</Link></li>
                                <li><Link to="/sports/basketball">Basketball</Link></li>
                                <li><Link to="/sports/baseball">Baseball</Link></li>
                                <li><Link to="/sports/hockey">Hockey</Link></li>
                            </ul>
                        </li>
                        <li><Link to="portfolio">User Hub</Link></li>
                        <li>Account
                            <ul className="dropdown">
                                <li><Link to="/friends">Friends</Link></li>
                                <li><Link to="/banking">Banking</Link></li>
                                <li><Link to="/settings">Settings</Link></li>
                                <li id="LogOut"><Link to="/">Log Out</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
