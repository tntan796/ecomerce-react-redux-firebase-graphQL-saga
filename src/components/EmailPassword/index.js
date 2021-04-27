import React, {Component} from 'react';
import './styles.scss';
import AuthWrapper  from '../AuthWrapper';
import FormInput from '../../components/forms/FormInput';
import Button from '../../components/forms/Button';
import {auth} from '../../firebase/ultils';
import { withRouter} from 'react-router-dom';
const initialState = {
    email: '',
    error: ''
}

class EmailPassword extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    
    configAuthWrapper = {
        headline: 'Email Password'
    }

    handleSubmit = async e => {
        e.preventDefault();
        try {
            const {email} = this.state;
            const config = {
                url: 'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email, config)
            .then(res => {
                this.props.history.push('/login');
            })
            .catch(error => {
                this.setState({...this.state, error: error.message})
            });
        } catch (error) {
            console.log(error);
            this.setState({...this.state, error: error.message})
        }
    }

    handleChangeInput = e => {
        const {name, value} = e.target;
        this.setState({
            ...this.state, [name]: value
        });
    }

    render() {
        const {email, error} = this.state;
        return (
            <AuthWrapper {...this.configAuthWrapper}>
                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name="email" onChange = {this.handleChangeInput}
                    value = {email} label="Email" placeholder = "Email" type="email"></FormInput>
                    {error && (
                        <div>
                            <label className="text-danger">{error}</label>
                        </div>
                    )}
                    <Button type="submit">Send</Button>
                </form>
            </AuthWrapper>
        );
    }
}

export default withRouter(EmailPassword);