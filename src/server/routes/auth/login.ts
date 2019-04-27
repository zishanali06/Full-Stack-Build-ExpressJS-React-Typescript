import * as express from 'express';
import { CreateToken } from '../../utils/security/tokens';
import * as passport from 'passport';


const router = express.Router();

router.post('/', passport.authenticate('local'), async (req, res, next) => {
    try {
        let token = await CreateToken({ userid: req.user.id });
        res.json({
            token,
            role: req.user.role,
            userid: req.user.id
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

export default router;
