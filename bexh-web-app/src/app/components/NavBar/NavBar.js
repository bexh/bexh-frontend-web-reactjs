import React from 'react';
import './style.scss';

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="NavBar">
                <div className="NavBarLeft">
                    <div id="Logo">BEXH</div>
                    <input type="text" placeholder=" Search" id="Search" />
                </div>
                <div className="NavBarRight">
                    <div className="NavBarRightItem">
                        Sports &#9660;
                    </div>
                    <div className="NavBarRightItem">
                        Portfolio
                    </div>
                    <div className="NavBarRightItem">
                        Settings &#9660;
                    </div>
                </div>
                
                    
                    
                
            </div>
        );
    }
}