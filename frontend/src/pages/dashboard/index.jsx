import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import { api } from '../../config';
import styles from '../../styles/dashboard.module.css';

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const [values, setValues] = useState({
    sender_id: 0,
    pick_up_address: 'King Faisal street',
    drop_off_address: 'El-Haram street'
  });
  const [errors, setErrors] = useState({
    pick_up_address: null,
    drop_off_address: null
  });
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .post('/parcels', { ...values, sender_id: authCtx.user.id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const formInputs = [
    {
      id: 'pick_up',
      label: 'Pick-up Address',
      type: 'text',
      value: values['pick_up_address'],
      onChange: handleChange('pick_up_address')
    },
    {
      id: 'drop_off',
      label: 'Drop-off Address',
      type: 'text',
      value: values['drop_off_address'],
      onChange: handleChange('drop_off_address')
    }
  ];

  return (
    <div className={styles['dashboard-page']}>
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
          text='Add Parcel'
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
        {errors.pick_up_address && <p>{errors.pick_up_address}</p>}
        {errors.drop_off_address && <p>{errors.drop_off_address}</p>}
      </form>
    </div>
  );
};
export default Dashboard;
