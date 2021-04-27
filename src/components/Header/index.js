import React from 'react';
import './styles.scss';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/ultils';
import { connect, useSelector }  from 'react-redux';

const Header = props => {
    let currentUser = useSelector(state => state.user.currentUser);
    
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Tano" />
                    </Link>
                </div>
                <div className="callToActions">
                    {
                        currentUser && (
                            <ul>
                                <li>
                                    <span className="logout" onClick = {() => auth.signOut()}>LogOut</span>
                                </li>
                            </ul>
                        )
                    }
                    {
                        !currentUser && (
                            <ul>
                                <li>
                                    <Link to="/registration">Register</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </ul>
                        )
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;