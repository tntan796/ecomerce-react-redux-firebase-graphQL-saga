import React from 'react';
import men from '../../assets/images/men.png';
import woman from '../../assets/images/woman.png';
import './styles.scss';
const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div className="item" style={{ backgroundImage: `url(${men})` }}>
                    <a>Shop Man</a>
                </div>
                <div className="item" style={{ backgroundImage: `url(${woman})` }}>
                    <a>Shop woman</a>
                </div>
            </div>
        </div>
    );
}

export default Directory;