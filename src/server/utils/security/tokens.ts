import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

import config from '../../config';
import knex from '../../db';

export const CreateToken = async (payload: IPayload) => {
    // let tokenid: any = await DB.AccessTokens.insert(payload.userid);
    let tokenid: any = await knex('tokens').insert({ userid: payload.userid });
    payload.accesstokenid = tokenid;
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jwt.sign(payload, config.auth.secret);
    //await DB.AccessTokens.update(payload.accesstokenid, token);
    await knex('tokens').where('id', payload.accesstokenid).update('token', token);
    return token;
}

export const ValidToken = async (token: string) => {
    let payload: IPayload = <IPayload>jwt.decode(token);
    let accesstokenid = await knex('tokens').where({ id: payload.accesstokenid, token });
    if(!accesstokenid) {
        throw new Error('Invalid Token!');
    } else {
        return accesstokenid;
    }
}

export interface IPayload {
    [key: string]: any;
    userid: number;
    unique?: string;
}