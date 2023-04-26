import { setAccessToken } from './setAccessToken';
import { setRefreshToken } from './setRefreshToken';
import { verifyAccessToken } from './verifyAccessToken';
import { verifyRefreshToken } from './verifyRefreshToken';

interface Payload {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  role: number;
}
interface DecodedToken {
  id: number;
  role: number;
}

export {
  setAccessToken,
  setRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  Payload,
  DecodedToken
};
