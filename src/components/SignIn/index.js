import React, { Component } from 'react';
import './styles.scss';
import Button from '../../components/forms/Button';
import { signInWithGoogle, auth } from '../../firebase/ultils';
import FormInput from '../../components/forms/FormInput';
import { Link } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
class SignIn extends Component {

    initialValue = {
        email: '',
        password: '',
        errors: []
    };

    constructor(props) {
        super(props);
        this.state = this.initialValue;
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...this.initialValue
            });
        } catch (error) {
            console.log(error);
            this.setState({ ...this.state, errors: [error.message] });
        }
    }

    handleChangeInput = e => {
        const { name, value } = e.target;
        this.setState({
            ...this.state, [name]: value
        });
    }

    render() {
        const configAuthWrapper = {
            headline: 'login'
        };
        const { email, password, errors } = this.state;
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>
                        <div className="socialSignIn">
                            {errors && errors.length > 0 && (
                                <div className="row">
                                    <ul>
                                        {
                                            errors.map((error, index) => {
                                                return (
                                                    <li className="text-danger" key={index}>{error}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )}
                            <div className="row">
                                <FormInput name="email" type="email" placeholder="Email" value={email}
                                    onChange={this.handleChangeInput}
                                />
                                <FormInput name="password" type="password" placeholder="Password" value={password}
                                    onChange={this.handleChangeInput}
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
}

export default SignIn;