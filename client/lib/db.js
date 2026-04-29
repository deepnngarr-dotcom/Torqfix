import { Sequelize } from 'sequelize';

const globalForDb = global;
export const db = globalForDb.db || new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

if (process.env.NODE_ENV!== 'production') globalForDb.db = db;