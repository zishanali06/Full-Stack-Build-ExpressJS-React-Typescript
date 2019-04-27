import * as React from 'react';
import { Link } from 'react-router-dom';


export interface HomeProps {
    
}
 
export interface HomeState {
    
}
 
class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);

    }
    render() { 
        return ( 
            <>
            <section className="row mt-3">
                <h1>Welcome to ZtheDons Books Store</h1>
            </section>
            <section className="row d-flex flex-column justify-content-center mt-5">
                <Link to="/books" className="btn btn-primary mb-3">View Books</Link>
                <button className="btn btn-primary mb-3">Register</button>
                <Link to="/login" className="btn btn-primary mb-3">Login</Link>
            </section>
            </>
        );
    }
}

export default Home;