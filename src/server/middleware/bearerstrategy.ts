import * as passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';
import knex from '../db';
import { ValidToken } from '../utils/security/tokens';

passport.use(new BearerStrategy.Strategy(async (token, done) => {
    try {
        let payload = await ValidToken(token);
        let [user] = await knex('users').where('id', payload.userid);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        console.log(error);
        done(error);
    }
}))