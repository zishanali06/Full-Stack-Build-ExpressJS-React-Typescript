import * as React from 'react';
import { json, User } from '../utils/api';
import { RouteComponentProps } from 'react-router';

export interface AddbookProps extends RouteComponentProps<{ id: string }> {

}

export interface AddbookState {
    title: string,
    author: string,
    price: string,
    allcat: [],
    newcat: string
}

class Addbook extends React.Component<AddbookProps, AddbookState> {
    constructor(props: AddbookProps) {
        super(props);
        this.state = {
            title: '',
            author: '',
            price: '',
            allcat: [],
            newcat: '1'
        };
    }

    async componentDidMount() {
        if (!User || User.userid === null || User.role !== 'admin') {
            this.props.history.push('/login');
        } else {
            try {
                let allcat = await json(`/api/cat`);
                this.setState({ allcat });
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
            title: this.state.title,
            author: this.state.author,
            categoryid: this.state.newcat,
            price: this.state.price
        }
        try {
            let data = await json(`/api/books/add`, 'POST', newbook);
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
                                value={this.state.title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })}
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
                                value={this.state.author}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ author: e.target.value })}
                            />
                        </section>
                        <section className="form-group">
                            <label>Price: USD</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                value={this.state.price}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ price: e.target.value })}
                            />
                        </section>
                        <button className="btn btn-primary" onClick={this.handleAdd}>Add Book</button>
                    </form>
                </section>
            </section>
        </>);
    }
}

export default Addbook;