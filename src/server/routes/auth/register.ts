import * as express from 'express';
import knex from '../../db';
import { HashPassword } from '../../utils/security/passwords';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let user = req.body;
        user.password = HashPassword(req.body.password);
        let [userid] = await knex('users').insert(req.body);
        let token = await CreateToken({ userid });
        res.json({
            token,
            role: 'admin',
            userid
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
});


export default router;
