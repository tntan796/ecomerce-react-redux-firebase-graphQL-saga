import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeLayout = props => {
    return (
        <div className="fullHeight">
            <Header {...props}/>
            <div className="main">
                {props.children}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default HomeLayout;