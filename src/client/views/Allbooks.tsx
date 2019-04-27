import * as React from 'react';
import { json } from '../utils/api';
import Bookcard from '../components/Bookcard';

export interface AllbooksProps {
    
}
 
export interface AllbooksState {
    books: [{
        id: number,
        category: string,
        title: string,
        author: string,
        price: any
    }];
}

class Allbooks extends React.Component<AllbooksProps, AllbooksState> {
    constructor(props: AllbooksProps) {
        super(props);
        this.state = {
            books: [{
                id: null,
                category: null,
                title: null,
                author: null,
                price: null
            }]
        };
    }

    async componentDidMount() {
        let books = await json('/api/books');
        this.setState({ books });
    }
    render() { 
        return ( 
        <>
            <section className="row d-flex justify-content-center">
                <h1>All Books</h1>
            </section>
            <section className="row d-flex justify-content-center">
            {this.state.books.map((book) => {
                return <Bookcard book={book} key={book.id} />
            })}
        </section>
        </> 
        );
    }
}

export default Allbooks;