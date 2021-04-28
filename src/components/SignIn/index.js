import React, { useEffect, useState } from 'react';
import './styles.scss';
import Button from '../../components/forms/Button';
import FormInput from '../../components/forms/FormInput';
import { Link, withRouter } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStart, signInUser, signInWithGoogleRequest } from '../../redux/User/user.action';


const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    signInSuccess: user.signInSuccess,
    signInError: user.signInError,
    signInWithGoogleSuccess: user.signInWithGoogleSuccess,
    signInWithGoogleError: user.signInWithGoogleError
});

const SignIn = props => {
    const { currentUser, signInSuccess, signInError, signInWithGoogleSuccess, signInWithGoogleError } = useSelector(mapState);
    const dispatch = useDispatch();
    const initialState = {
        email: '',
        password: '',
        errors: []
    };
    const [state, setstate] = useState(initialState)

    useEffect(() => {
        if (currentUser) {
            setstate({
                ...initialState
            });
            props.history.push('/');
        }
    }, [currentUser, signInSuccess, signInWithGoogleSuccess]);

    useEffect(() => {
        if (signInError) {
            setstate({
                ...initialState, errors: signInError
            });
        }
    }, [signInError]);


    useEffect(() => {
        if (signInWithGoogleError) {
            setstate({
                ...initialState, errors: signInWithGoogleError
            });
        }
    }, [signInWithGoogleError]);

    const handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = state;
        dispatch(emailSignInStart({ email, password }));
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

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogleRequest());
    }

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
                            <Button type="button" onClick={handleGoogleSignIn}>
                                Sign in with Google
                                    </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default withRouter(SignIn);