import React, { useEffect, useState } from 'react';
import './styles.scss';
import AuthWrapper from '../AuthWrapper';
import FormInput from '../../components/forms/FormInput';
import Button from '../../components/forms/Button';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as userTypes from '../../redux/User/user.action';

const initialState = {
    email: '',
    errors: []
}

const mapState = ({ user }) => ({
    resetEmailSuccess: user.resetEmailSuccess,
    resetEmailError: user.resetEmailError
});

const EmailPassword = props => {
    const [state, setstate] = useState(initialState);
    const dispatch = useDispatch();
    const { resetEmailSuccess, resetEmailError } = useSelector(mapState);

    useEffect(() => {
        if (resetEmailSuccess) {
            setstate({ ...initialState });
            props.history.push('/login');
        }
    }, [resetEmailSuccess])


    useEffect(() => {
        if (resetEmailError && resetEmailError.length > 0) {
            setstate({ ...state, errors: resetEmailError });
        }
    }, [resetEmailError])

    const configAuthWrapper = {
        headline: 'Email Password'
    }

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(userTypes.resetEmail({email: state.email}));
    }

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setstate({
            ...state, [name]: value
        });
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <form onSubmit={handleSubmit}>
                <FormInput type="email" name="email" onChange={handleChangeInput}
                    value={state.email} label="Email" placeholder="Email" type="email"></FormInput>
                {state.errors && (
                    <div>
                        <ul>
                            {state.errors.map((error, index) => (
                                <li className="text-danger">{state.errors}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <Button type="submit">Send</Button>
            </form>
        </AuthWrapper>
    );
}

export default withRouter(EmailPassword);