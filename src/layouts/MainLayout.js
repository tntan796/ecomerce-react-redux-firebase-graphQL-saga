import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
const MainLayout = props => {
    return (
        <div>
            <Header />
            <div className="main">
                {props.children}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;