import React from 'react';
import '../css/topbar.css';
import {BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

const TopBar = (props) => {
    const logout = () => {
        Cookies.remove('userId');
        window.location.reload();
    }


    return (
        <div className="topbar-wrap">
            <div className="user-wrap">
                <img className="user-pic" src={ require('../assets/logos/default-user.png') } />
                <div className="flex v-center">{props.name}</div>
            </div>
            <div className="flex">
                <Link className="flex v-center" to={'/addtrip'}>+ Add trip</Link>
                <div className="flex v-center log-out" onClick={logout}>Log Out</div>
            </div>
        </div>
    )
}

export default TopBar