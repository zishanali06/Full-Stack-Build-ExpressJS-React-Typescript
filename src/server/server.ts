import * as path from 'path';
import * as express from 'express';
import Router from './routes';
import * as passport from 'passport';
import './middleware/bearerstrategy';
import './middleware/localstrategy';

const app = express();

app.use(express.json());
app.use(passport.initialize());

let p = path.join(__dirname, '../public');
console.log(p);

app.use(express.static(p));
app.use(Router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
