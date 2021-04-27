import React, { useEffect, useState } from 'react';
import Button from './../../components/forms/Button'
import FormInput from '../../components/forms/FormInput';
import './styles.scss';
import AuthWrapper from '../AuthWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../redux/User/user.action';
import { withRouter } from 'react-router';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
};
const mapState = ({user}) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
});
const SignUp = props => {
    const [state, setstate] = useState({ ...initialState });
    const {signUpSuccess, signUpError} = useSelector(mapState);
    const dispatch = useDispatch();
    const handleChange = e => {
        const { name, value } = e.target;
        setstate({ ...state, [name]: value });
    }

    useEffect(() => {
        if (signUpSuccess) {
            setstate({...initialState});
            props.history.push('/');
        }
    }, [signUpSuccess])

    useEffect(() => {
        console.log('error chnge:', signUpError);
      if (signUpError.length > 0) {
          setstate({...state, errors: signUpError});
      }
    }, [signUpError])

    const handleRegister = async e => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword, errors } = state;
        dispatch(signUpUser({ displayName, email, password, confirmPassword}));
    }

    const configAuthWrapper = {
        headline: 'Sign Up'
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <form onSubmit={handleRegister}>
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
                    placeholder="Full name"
                    handleChange={handleChange}
                />
                <FormInput label="Email" type="text"
                    name="email" value={state.email}
                    placeholder="email"
                    handleChange={handleChange}
                />
                <FormInput label="Password" type="password"
                    name="password" value={state.password}
                    placeholder="password"
                    handleChange={handleChange}
                />
                <FormInput label="Confirm Password" type="password"
                    name="confirmPassword" value={state.confirmPassword}
                    placeholder="Confirm password"
                    handleChange={handleChange}
                />
                <div className="form-group">
                    <Button type="submit">Register</Button>
                </div>
            </form>
        </AuthWrapper>
    )
}

export default withRouter(SignUp);