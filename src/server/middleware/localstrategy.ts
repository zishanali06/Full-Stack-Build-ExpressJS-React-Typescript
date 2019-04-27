import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import knex from '../db';
import { ComparePassword } from '../utils/security/passwords';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email',
    session: false
}, async (email, password, done) => {
    try {
        let [user]: any = await knex('users').where('email', email);
        if (user && ComparePassword(password, user.password)) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        console.log(error);
        done(error);
    };
}));