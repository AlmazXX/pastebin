import * as process from 'process';

export default () => ({
  port: Number(process.env.NEST_PORT) || 4000,
  hashSalt: Number(process.env.HASH_SALT) || 10,
  jwtSecret: process.env.JWT_SECRET,
});
