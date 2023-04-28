import { PoolClient } from 'pg';
import { pgClient } from '../database';

interface OrderType {
  id: number;
  biker_id: number;
  parcel_id: number;
  delivered_at: Date;
  created_at: Date;
  updated_at: Date;
}

class Order {
  async withConnection<T>(
    callback: (connection: PoolClient) => Promise<T>
  ): Promise<T> {
    const connection = await pgClient.connect();
    try {
      return await callback(connection);
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async withTransaction<T>(
    connection: PoolClient,
    callback: () => Promise<T>
  ): Promise<T> {
    try {
      await connection.query('BEGIN');
      const result = await callback();
      await connection.query('COMMIT');
      return result;
    } catch (error) {
      await connection.query('ROLLBACK');
      throw error;
    }
  }
  async createOrder(o: OrderType): Promise<OrderType> {
    return this.withConnection(async (connection: PoolClient) => {
      return this.withTransaction(connection, async () => {
        const query = {
          text: 'INSERT INTO orders (biker_id, parcel_id) VALUES ($1, $2) RETURNING created_at, (SELECT username FROM users WHERE id=$1) AS username',
          values: [o.biker_id, o.parcel_id]
        };
        const result = await connection.query(query);
        console.log(result.rows[0]);
        const { created_at } = result.rows[0];
        const parcelQuery = {
          text: "UPDATE parcels SET status='PICKED', updated_at=$2 WHERE id=$1 RETURNING id, status, updated_at",
          values: [o.parcel_id, created_at]
        };
        const parcelResult = await connection.query(parcelQuery);
        console.log(parcelResult.rows[0]);
        return { ...result.rows[0], ...parcelResult.rows[0] };
      });
    });
  }
  async getOrders(id: string): Promise<OrderType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
          SELECT DISTINCT o.id, o.parcel_id, o.updated_at, u.username, p.pick_up_address, p.drop_off_address, p.status
          FROM orders o, users u, parcels p
          WHERE
          o.parcel_id = p.id
          AND
          p.sender_id = u.id
          AND
          o.biker_id=$1
        `,
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getOrder(id: string): Promise<OrderType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM orders WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateOrder(id: string): Promise<OrderType> {
    return this.withConnection(async (connection: PoolClient) => {
      return this.withTransaction(connection, async () => {
        const query = {
          text: 'UPDATE orders SET updated_at=CURRENT_TIMESTAMP WHERE id=$1 RETURNING *',
          values: [id]
        };
        const result = await connection.query(query);
        const { parcel_id, updated_at } = result.rows[0];
        const parcelQuery = {
          text: "UPDATE parcels SET status='DELIVERED', updated_at=$2 WHERE id=$1 RETURNING status",
          values: [parcel_id, updated_at]
        };
        const parcelResult = await connection.query(parcelQuery);
        return { ...result.rows[0], ...parcelResult.rows[0] };
      });
    });
  }
  async deleteOrder(id: string): Promise<OrderType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM orders WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Order;
