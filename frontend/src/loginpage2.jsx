import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './login.css';
import { useUser } from './context/UserContext';

const LoginPage2 = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    
    const { setUserType,setUserRoll } = useUser();  // Use updateUser function

    const onSubmit = (data) => {
        axios.post('http://localhost:3000/login', data, {
            withCredentials: true  // ✅ This ensures cookies are sent and stored
        })
            .then((result) => {
                console.log(result.data);
                // Save the user type from the response
                setUserType(result.data.userType);
                setUserRoll(result.data.roll);
                //console.log(result.data.token);
                navigate('/');
            })
            .catch((err) => alert(err.response.data));
    };
    
    return (
        <div className="login-page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Roll Number"
                    {...register('Roll', {
                        required: true,
                        pattern: /^[0-9]{4}[a-zA-Z]{3}[0-9]{4}$/,
                    })}
                />
                {errors.Roll && <div>Enter a valid Roll number</div>}
                
                <input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                />
                {errors.password && <div>Password is required</div>}
                
                <select {...register('type', { required: true })}>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                {errors.type && <div>Please select a user type</div>}
                
                <input type="submit" disabled={isSubmitting} value="Submit" />
            </form>
        </div>
    );
};

export default LoginPage2;
