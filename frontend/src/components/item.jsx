import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/UI/button';
import styles from '../styles/item.module.css';

const itemDate = (item) =>
  new Date(item)
    .toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
    .split(',')
    .join(' - ');

const ParcelItem = ({ item, handleActions, filter }) => {
  const authCtx = useContext(AuthContext);
  return (
    <tr classes={styles['card']}>
      <td>{item.pick_up_address}</td>
      <td>{item.drop_off_address}</td>
      <td>{item.status}</td>
      <td>{itemDate(item.created_at)}</td>
      <td>{item.updated_at ? itemDate(item.updated_at) : '--'}</td>
      {authCtx.user.role === 1 && (
        <td>{item.username ? item.username : '--'}</td>
      )}
      {authCtx.user.role === 0 && (
        <td>
          {item.status !== 'DELIVERED' && item.status !== 'PICKED' ? (
            <Button
              onClick={() => handleActions(item.id)}
              type='button'
              text='PICK'
              style={{
                backgroundColor: 'var(--background-dark)',
                color: '#FFF',
                width: '80px',
                margin: 'auto',
                display: 'block',
                border: 'none',
                borderRadius: '2px',
                padding: '5px',
                cursor: 'pointer'
              }}
            />
          ) : (
            '--'
          )}
        </td>
      )}
    </tr>
  );
};

const OrderItem = ({ item, handleActions, filter }) => {
  const authCtx = useContext(AuthContext);
  console.log(item);
  return (
    <tr classes={styles['card']}>
      <td>
        #{item.id}-{item.parcel_id}
      </td>
      <td>{item.username}</td>
      <td>{item.pick_up_address}</td>
      <td>{item.drop_off_address}</td>
      {filter === 'DELIVERED' && (
        <td>{item.updated_at && itemDate(item.updated_at)}</td>
      )}
      {authCtx.user.role === 0 && filter !== 'DELIVERED' && (
        <td>
          <Button
            onClick={() => handleActions(item.id)}
            type='button'
            text='Done'
            style={{
              backgroundColor: 'var(--background-dark)',
              color: '#FFF',
              width: '80px',
              margin: 'auto',
              display: 'block',
              border: 'none',
              borderRadius: '2px',
              padding: '5px',
              cursor: 'pointer'
            }}
          />
        </td>
      )}
    </tr>
  );
};

const Item = ({ type, item, handleActions, filter }) => {
  return type === 'ORDER' ? (
    <OrderItem item={item} handleActions={handleActions} filter={filter} />
  ) : (
    <ParcelItem item={item} handleActions={handleActions} filter={filter} />
  );
};

export default Item;
