import * as React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

import './scss/app';
import Home from './views/Home';
import Navbar from './components/Navbar';
import Allbooks from './views/Allbooks';
import Singlebook from './views/Singlebook';
import Editbook from './views/Editbook';
import Addbook from './views/Addbook';

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