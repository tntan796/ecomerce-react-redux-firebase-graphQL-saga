import React from 'react';
import ShopMan from '../../assets/images/ShopMen.png';
import ShopWoman from '../../assets/images/ShopWoman.png';
import './styles.scss';
const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div className="item" style={{ backgroundImage: `url(${ShopMan})` }}>
                    <a>Shop Man</a>
                </div>
                <div className="item" style={{ backgroundImage: `url(${ShopWoman})` }}>
                    <a>Shop woman</a>
                </div>
            </div>
        </div>
    );
}

export default Directory;