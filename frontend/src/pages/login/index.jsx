import React, { useState, useContext } from 'react';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../../styles/login.module.css';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null
  });
  const authCtx = useContext(AuthContext);
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const formInputs = [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      value: values['email'],
      onChange: handleChange('email')
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      value: values['password'],
      onChange: handleChange('password')
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Fired');
    const { email, password } = values;
    authCtx.login({ email, password }, (err) => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      });
    });
  };
  return (
    <div className={styles['login-page']}>
      <form onSubmit={handleSubmit}>
        {formInputs.map((input) => (
          <Input
            key={input.id}
            id={input.id}
            label={input.label}
            type={input.type}
            value={input.value}
            onChange={input.onChange}
          />
        ))}

        <Button
          type='submit'
          text='Login'
          onClick={handleSubmit}
          style={{
            backgroundColor: 'var(--background-dark)',
            padding: '10px',
            width: '100%',
            display: 'block',
            border: 'none',
            borderRadius: '2px',
            color: '#FFF',
            marginTop: '10px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        />
        {errors.email && <p>{errors.email}</p>}
        {errors.password && <p>{errors.password}</p>}
      </form>
      <p className={styles['register-hint']}>
        You don't have account? <Link to='/register'>Register Now</Link>
      </p>
    </div>
  );
};
export default Login;
