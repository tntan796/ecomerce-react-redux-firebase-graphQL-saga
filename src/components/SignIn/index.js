import React, { Component, useState } from 'react';
import './styles.scss';
import Button from '../../components/forms/Button';
import { signInWithGoogle, auth } from '../../firebase/ultils';
import FormInput from '../../components/forms/FormInput';
import { Link } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
const SignIn = props => {

    const initialState = {
        email: '',
        password: '',
        errors: []
    };

    const [state, setstate] = useState(initialState)

    const handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = state;
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            setstate({
                ...initialState
            });
        } catch (error) {
            setstate({ ...state, errors: [error.message] });
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setstate({
            ...state, [name]: value
        });
    }

    const configAuthWrapper = {
        headline: 'login'
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    <div className="socialSignIn">
                        {state.errors && state.errors.length > 0 && (
                            <div className="row">
                                <ul>
                                    {
                                        state.errors.map((error, index) => {
                                            return (
                                                <li className="text-danger" key={index}>{error}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )}
                        <div className="row">
                            <FormInput name="email" type="email" placeholder="Email" value={state.email}
                                onChange={handleChangeInput}
                            />
                            <FormInput name="password" type="password" placeholder="Password" value={state.password}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className="row forgot-password">
                            <Link to="/recovery">For got password?</Link>
                        </div>
                        <div className="row">
                            <Button type="submit">
                                Login
                                    </Button>
                            <Button type="button" onClick={signInWithGoogle}>
                                Sign in with Google
                                    </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default SignIn;