import * as React from 'react';
import { json, User } from '../utils/api';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

export interface SinglebookProps extends RouteComponentProps<{ id: string }> {

}

export interface SinglebookState {
    book: {
        id: number,
        category: string,
        title: string,
        author: string,
        price: any
    }
}

class Singlebook extends React.Component<SinglebookProps, SinglebookState> {
    constructor(props: SinglebookProps) {
        super(props);
        this.state = {
            book: {
                id: null,
                category: null,
                title: null,
                author: null,
                price: null
            }
        };
    }

    async componentDidMount() {
        try {
            let book = await json(`/api/books/${this.props.match.params.id}`);
            console.log(book);
            this.setState({ book });
        } catch (error) {
            console.log(error);
        }
    }

    handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await json(`/api/books/delete/${this.props.match.params.id}`, 'DELETE');
        } catch (error) {
            console.log(error);
        } finally {
            this.props.history.push('/books');
        }

    }

    render() {
        return (<>
            <section className="row">
                <h1>Single Book Page</h1>
            </section>
            <section className="row d-flex justify-content-center">
                <section className="col-6">
                    <h3>Book Title: {this.state.book.title}</h3>
                    <h3>Book Category: {this.state.book.category}</h3>
                    <h3>Book Author: {this.state.book.author}</h3>
                    <h3>Book Price: {this.state.book.price}</h3>
                    <Link to={`/edit/${this.props.match.params.id}`} className="btn btn-primary">Edit</Link>
                    <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                </section>
            </section>

        </>);
    }
}

export default Singlebook;