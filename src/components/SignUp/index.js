import React, { useState } from 'react';
import Button from './../../components/forms/Button'
import FormInput from '../../components/forms/FormInput';
import './styles.scss';
import {auth, handlUserProfile} from '../../firebase/ultils';
const initialState = {
    displayName: '',
    email:'',
    password: '',
    confirmPassword: '',
    errors: []
};

const SignUp = props => {
    const [state, setstate] = useState({...initialState});

    const handleChange = e => {
        const {name, value} = e.target;
        setstate({...state, [name]: value});
    }

    const handleRegister = async e => {
        e.preventDefault();
        const {displayName, email, password, confirmPassword, errors} = state;
        if (password !== confirmPassword) {
            const err = ['Password Don\'t match'];
            setstate({...state, errors : err});
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await handlUserProfile(user, {displayName});
            setstate({...initialState});
        } catch (error) {
            setstate({...state, errors : [error.message]});
        }
    }


    return (
        <div className="signup">
            <div className="wrap">
                <form onSubmit = {handleRegister}>
                    <h2>Sign Up</h2>
                    {state && state.errors.length > 0 && (
                        <ul>
                            {state.errors.map((err, index) => {
                                return (
                                    <li key={index} className="text-danger">{err}</li>
                                )
                            })}
                        </ul>
                    )}
                    <FormInput label="Full name" type="text"
                        name="displayName" value={state.displayName}
                        placeholder = "Full name"
                        handleChange = {handleChange}
                    />
                   <FormInput label="Email" type="text"
                        name="email" value={state.email}
                        placeholder = "email"
                        handleChange = {handleChange}
                    />
                     <FormInput label="Password" type="password"
                        name="password" value={state.password}
                        placeholder = "password"
                        handleChange = {handleChange}
                    />
                     <FormInput label="Confirm Password" type="password"
                        name="confirmPassword" value={state.confirmPassword}
                        placeholder = "Confirm password"
                        handleChange = {handleChange}
                    />
                    <div className="form-group">
                        <Button type="submit">Register</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;