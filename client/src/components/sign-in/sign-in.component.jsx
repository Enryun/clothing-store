import React, {useState} from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.action';
import {connect} from 'react-redux';


const SignIn = ({emailSignInStart, googleSignInStart}) => {

    const [userCredentials, setCredentials] = useState({email: '', password: ''})
    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password)
    }

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials,[name]: value});
    }

        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign In with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email'
                        label='email'
                        handleChange={handleChange}
                        value={email} 
                        required />
                  
                    <FormInput 
                        name='password' 
                        type='password' 
                        label='password'
                        handleChange={handleChange}
                        value={password} 
                        required />

                    <div className='buttons'>
                        <CustomButton 
                            type='submit'>Sign In</CustomButton>
                        <CustomButton
                            type='button' 
                            onClick={googleSignInStart}
                            isGoogleSignIn>
                                Sign In with Google
                        </CustomButton>
                    </div> 
                </form>
            </div>
        )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);