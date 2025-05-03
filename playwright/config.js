import { appendTimestamp } from '../utils/stringUtils.js';

export const config = {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com/',
    username: process.env.USERNAME || 'standard_user',
    password: process.env.PASSWORD || 'secret_sauce',
    invalidUsername: process.env.INVALID_USERNAME || appendTimestamp('invalid_user'),
    invalidPassword: process.env.INVALID_PASSWORD || appendTimestamp('wrong_pass'),
    timeout: 5000
};
