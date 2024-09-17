import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import admin from '../../Images/admin_pic.jpg';
import logo from './logo.png';

function Navbar() {
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return (
        <div className="navbar">
            <div className="navbar_main">
                
                

                <div className="menu_logo">
                    <Link to="/" style={{ textDecoration: 'none' }}>  
                    </Link>
                </div>

                <div className="logo_container">
                    <img src={logo} className="navbar_logo" alt="Logo"/>
                </div>

                <div className="item_lists">    
                    <div className="item">
                        <NotificationsNoneIcon className="item_icon" />
                    </div>
                    <div className="item">
                        <img className="admin_pic" src={admin} alt="admin" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
