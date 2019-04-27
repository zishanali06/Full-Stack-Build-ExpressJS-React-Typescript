import * as express from 'express';
import knex from '../../db';

const router = express.Router();

router.get('/:id?', async (req, res, next) => {
    let id = req.params.id;
    if(id){
        try {
            let [book] = await knex('books').select('books.id as id', 'categories.name as category', 'books.title as title', 'books.author as author', 'books.price as price').join('categories', 'categories.id', '=', 'books.categoryid').where('books.id', id);
            res.json(book);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    } else {
        try {
            let books = await knex('books').select('books.id as id', 'categories.name as category', 'books.title as title', 'books.author as author', 'books.price as price').join('categories', 'categories.id', '=', 'books.categoryid');
            res.json(books);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
});

router.put('/edit/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let change = await knex('books').where('books.id', id).update({ title: req.body.title, categoryid: req.body.categoryid, author: req.body.author, price: req.body.price });
        res.json(change);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/add', async (req, res, next) => {
    try {
        let data = await knex('books').insert(req.body);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
        let data = await knex('books').where('books.id', req.params.id).del();
        res.json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

export default router;
