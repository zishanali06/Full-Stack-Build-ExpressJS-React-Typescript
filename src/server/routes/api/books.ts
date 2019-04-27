import * as express from 'express';
import knex from '../../db';

const router = express.Router();

router.get('/:id?', async (req, res, next) => {
    let id = req.params.id;
    if(id){
        try {
            let book = await knex('books').select('books.id as id', 'categories.name as category', 'books.title as title', 'books.author as author', 'books.price as price').join('categories', 'categories.id', '=', 'books.categoryid').where('books.id', id)
            console.log(book);
            res.json(book);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
})

export default router;
