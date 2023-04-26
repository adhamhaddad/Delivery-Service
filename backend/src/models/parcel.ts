import { PoolClient } from 'pg';
import { pgClient } from '../database';

interface ParcelType {
  id: number;
  sender_id: number;
  pick_up_address: string;
  drop_off_address: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

class Parcel {
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
  async createParcel(p: ParcelType): Promise<ParcelType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO parcels (sender_id, pick_up_address, drop_off_address) VALUES ($1, $2, $3) RETURNING *',
        values: [p.sender_id, p.pick_up_address, p.drop_off_address]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getParcels(): Promise<ParcelType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM parcels'
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getParcel(id: string): Promise<ParcelType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM parcels WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateParcel(id: string, p: ParcelType): Promise<ParcelType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE parcels SET pick_up_address=$2, drop_off_address=$3, updated_at=CURRENT_TIMESTAMP WHERE id=$1 RETURNING *',
        values: [id, p.pick_up_address, p.drop_off_address]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteParcel(id: string): Promise<ParcelType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM parcels WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Parcel;
