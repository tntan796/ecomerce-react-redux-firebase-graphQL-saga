import React, { useState } from 'react';
import './styles.scss';
import AuthWrapper from '../AuthWrapper';
import FormInput from '../../components/forms/FormInput';
import Button from '../../components/forms/Button';
import { auth } from '../../firebase/ultils';
import { withRouter } from 'react-router-dom';

const initialState = {
    email: '',
    error: ''
}

const EmailPassword = props => {
    const [state, setstate] = useState(initialState);

    const configAuthWrapper = {
        headline: 'Email Password'
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { email } = state;
            const config = {
                url: 'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email, config)
                .then(res => {
                    props.history.push('/login');
                })
                .catch(error => {
                    setstate({ ...state, error: error.message })
                });
        } catch (error) {
            console.log(error);
            setstate({ ...state, error: error.message })
        }
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
                {state.error && (
                    <div>
                        <label className="text-danger">{state.error}</label>
                    </div>
                )}
                <Button type="submit">Send</Button>
            </form>
        </AuthWrapper>
    );
}

export default withRouter(EmailPassword);