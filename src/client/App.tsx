import * as React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

import './scss/app';
import Home from './views/Home';
import Navbar from './components/Navbar';
import Allbooks from './views/Allbooks';

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