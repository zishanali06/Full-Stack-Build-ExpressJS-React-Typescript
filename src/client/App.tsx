import * as React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

import './scss/app';
import Home from './views/Home';
import Navbar from './components/Navbar';
import Allbooks from './views/Allbooks';
import Singlebook from './views/Singlebook';
import Editbook from './views/Editbook';
import Addbook from './views/Addbook';
import Login from './views/Login';
import Register from './views/Register';

export default class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);

    }

    async componentWillMount() {

    }

    render() {
        return (
            <Router>
                <Navbar />
                <main className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/books" component={Allbooks} />
                        <Route exact path="/books/:id" component={Singlebook} />
                        <Route exact path="/edit/:id" component={Editbook} />
                        <Route exact path="/add" component={Addbook} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </main>
            </Router>
        )
    }
}

interface IAppProps {

}

interface IAppState {
}