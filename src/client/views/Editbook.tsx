import * as React from 'react';
import { json, User } from '../utils/api';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

export interface EditbookProps extends RouteComponentProps<{ id: string }> {

}

export interface EditbookState {
    book: {
        id: number,
        category: string,
        title: string,
        author: string,
        price: any
    },
    allcat: [],
    newcat: string
}

class Editbook extends React.Component<EditbookProps, EditbookState> {
    constructor(props: EditbookProps) {
        super(props);
        this.state = {
            book: {
                id: null,
                category: null,
                title: "",
                author: "",
                price: ""
            },
            allcat: [],
            newcat: ''
        };
    }

    async componentDidMount() {
        if (!User || User.userid === null || User.role !== 'admin') {
            this.props.history.push('/login');
        } else {
            try {
                let book = await json(`/api/books/${this.props.match.params.id}`);
                let allcat = await json(`/api/cat`);
                let newcat = await json(`/api/cat/${this.props.match.params.id}`);
                console.log(allcat);
                this.setState({ book, allcat, newcat });
            } catch (error) {
                console.log(error);
            }
        }
    }

    handleTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            newcat: e.target.value
        })
    };

    handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let newbook = {
            title: this.state.book.title,
            author: this.state.book.author,
            categoryid: this.state.newcat,
            price: this.state.book.price
        }
        try {
            let data = await json(`/api/books/edit/${this.props.match.params.id}`, 'PUT', newbook);
        } catch (error) {
            console.log(error);
        } finally {
            this.props.history.push('/books');
        };
    }



    render() {
        return (<>
            <section className="row">
                <h1>Edit Book Page</h1>
            </section>
            <section className="row d-flex justify-content-center">
                <section className="col-6">
                    <form>
                        <section className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                value={this.state.book.title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ ...this.state, book: { ...this.state.book, title: e.target.value } })}
                            />
                        </section>
                        <section className="form-group">
                            <label>Category</label>
                            <select className="form-control" id="exampleFormControlSelect1" value={this.state.newcat} onChange={this.handleTag}>
                                {this.state.allcat.map((cat: { category: string }, index) => {
                                    return <option value={index + 1} key={index}>{cat.category}</option>
                                })}
                            </select>
                        </section>
                        <section className="form-group">
                            <label>Author</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                value={this.state.book.author}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ ...this.state, book: { ...this.state.book, author: e.target.value } })}
                            />
                        </section>
                        <section className="form-group">
                            <label>Price: USD</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                value={this.state.book.price}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ ...this.state, book: { ...this.state.book, price: e.target.value } })}
                            />
                        </section>
                        <button className="btn btn-primary" onClick={this.handleAdd}>Save Changes</button>
                    </form>
                </section>
            </section>

        </>);
    }
}

export default Editbook;