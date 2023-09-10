import mysqlPromise from 'mysql2/promise';
import { DATABASE_URL } from '$env/static/private';

export const db = mysqlPromise.createPool(DATABASE_URL);
