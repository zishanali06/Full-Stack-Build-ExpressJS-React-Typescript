import * as express from 'express';
import knex from '../../db';

const router = express.Router();

router.get('/:id?', async (req, res, next) => {
    let id = req.params.id;
    if(id){
        try {
            let [cat] = await knex('books').where('books.id', id).select('categories.id as id').join('categories', 'categories.id', '=', 'books.categoryid');
            console.log(cat);
            res.json(cat.id);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    } else {
        try {
            let all = await knex('categories').select('name as category');
            res.json(all);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
})

export default router;
