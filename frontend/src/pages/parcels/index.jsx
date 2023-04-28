import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../config';
import Filter from '../../components/filter';
import Table from '../../components/table';
import styles from '../../styles/parcels.module.css';

const Parcels = ({ socket }) => {
  const [filter, setFilter] = useState('PENDING');
  const [parcels, setParcels] = useState([]);
  const authCtx = useContext(AuthContext);

  const handlePick = (parcel_id) => {
    const body = {
      biker_id: authCtx.user.id,
      parcel_id: parcel_id
    };
    api.post('/orders', body).catch((err) => console.log(err));
  };
  const getParcels = async () => {
    if (authCtx.user.role === 1) {
      api
        .get(`/parcels/${authCtx.user.id}`)
        .then((res) => setParcels(res.data))
        .catch((err) => console.log(err.response.data.message));
    } else {
      api
        .get('/parcels')
        .then((res) => setParcels(res.data))
        .catch((err) => console.log(err.response.data.message));
    }
  };

  useEffect(() => {
    getParcels();

    socket.on('parcels', (data) => {
      if (data.type === 'CREATE') {
        setParcels((prev) => [...prev, data.data]);
      }
    });
    socket.on('orders', (data) => {
      if (data.type === 'CREATE') {
        const { id: parcel_id, status, username, updated_at } = data.data;
        setParcels((prev) =>
          prev.map((parcel) =>
            parcel.id === parcel_id
              ? {
                  ...parcel,
                  status,
                  username,
                  updated_at
                }
              : parcel
          )
        );
      }
      if (data.type === 'UPDATE') {
        const { parcel_id, updated_at, status } = data.data;
        setParcels((prev) =>
          prev.map((parcel) =>
            parcel.id === parcel_id ? { ...parcel, status, updated_at } : parcel
          )
        );
      }
    });
    return () => {
      setFilter('PENDING');
      setParcels([]);
    };
  }, []);

  return (
    <div className={styles['parcels-page']}>
      <Filter
        title='Parcels'
        options={['ALL', 'PENDING', 'PICKED', 'DELIVERED']}
        filter={filter}
        setFilter={setFilter}
      />
      <Table
        filter={filter}
        thead={[
          { title: 'Pick-up Address', role: true, valid: true },
          { title: 'Drop-off Address', role: true, valid: true },
          { title: 'Status', role: true, valid: true },
          { title: 'Created Date', role: true, valid: true },
          { title: 'Updated Date', role: true, valid: true },
          { title: 'Picked By', role: authCtx.user.role === 1, valid: true },
          {
            title: 'Action',
            role: authCtx.user.role === 0,
            valid: filter !== 'DELIVERED'
          }
        ]}
        list={parcels}
        handleActions={handlePick}
        type='PARCEL'
      />
    </div>
  );
};
export default Parcels;
