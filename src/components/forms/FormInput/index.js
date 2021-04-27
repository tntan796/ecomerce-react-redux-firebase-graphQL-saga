import React from 'react';
import './styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className="formRow">
            {
                label && (
                    <React.Fragment>
                        <label>
                            {label}
                        </label>
                        <br />
                    </React.Fragment>
                )
            }
            <input className="formInput" onChange={handleChange} {...otherProps} />
        </div>
    );
}

export default FormInput;