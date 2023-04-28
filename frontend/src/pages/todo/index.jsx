import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../config/api';
import Filter from '../../components/filter';
import Table from '../../components/table';
import styles from '../../styles/todo.module.css';

const Todo = ({ socket }) => {
  const [filter, setFilter] = useState('PICKED');
  const [orders, setOrders] = useState([]);
  const authCtx = useContext(AuthContext);

  const getOrders = () => {
    api
      .get(`/orders/${authCtx.user.id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  const handleDone = (order_id) => {
    api
      .patch(`/orders/${order_id}`, { biker_id: authCtx.user.id })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrders();

    socket.on('orders', (data) => {
      if (data.type === 'UPDATE') {
        const { id, updated_at, status } = data.data;
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, updated_at, status } : order
          )
        );
      }
    });

    return () => {
      setFilter('PICKED');
      setOrders([]);
    };
  }, []);

  return (
    <div className={styles['todo-page']}>
      <h1>My Todo</h1>
      <Filter
        title='Todo'
        options={['DELIVERED', 'PICKED']}
        filter={filter}
        setFilter={setFilter}
      />
      <Table
        filter={filter}
        thead={[
          { title: 'ID', role: true, valid: true },
          { title: 'Username', role: true, valid: true },
          {
            title: 'Pick-up Address',
            role: true,
            valid: true
          },
          {
            title: 'Drop-off Address',
            role: true,
            valid: true
          },
          {
            title: 'Delivered Date',
            role: true,
            valid: filter === 'DELIVERED'
          },
          {
            title: 'Action',
            role: authCtx.user.role === 0,
            valid: filter !== 'DELIVERED'
          }
        ]}
        list={orders}
        handleActions={handleDone}
        type='ORDER'
      />
    </div>
  );
};
export default Todo;
