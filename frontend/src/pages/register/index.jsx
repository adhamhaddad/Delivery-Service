import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/login.module.css';

const Register = () => {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    username: '',
    role: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: {}
  });
  const authCtx = useContext(AuthContext);
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const formInputs = [
    {
      id: 'first_name',
      label: 'First Name',
      type: 'text',
      value: values['first_name'],
      onChange: handleChange('first_name')
    },
    {
      id: 'last_name',
      label: 'Last Name',
      type: 'text',
      value: values['last_name'],
      onChange: handleChange('last_name')
    },
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      value: values['username'],
      onChange: handleChange('username')
    },
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
  const handleError = (prop) => (value) => {
    setErrors((prev) => ({ [prop]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authCtx.register(values, (err) => {
      console.log(err);
      if (err.email) {
        setErrors('email', {
          type: 'manual',
          message: err.email
        });
      }
      if (err.username) {
        setError('username', {
          type: 'manual',
          message: err.username
        });
      }
      if (err.password) {
        setError('password', {
          type: 'manual',
          message: err.password
        });
      }
    });
  };

  return (
    <div className={styles['register-page']}>
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
        <div className={styles['role']}>
          <label>
            Biker
            <input
              type='radio'
              name='role'
              value={0}
              onChange={handleChange('role')}
            />
          </label>
          <label>
            Sender
            <input
              type='radio'
              name='role'
              value={1}
              onChange={handleChange('role')}
            />
          </label>
        </div>
        <Button
          type='submit'
          text='Sign Up'
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
      </form>
      <p className={styles['register-hint']}>
        You have already account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};
export default Register;
