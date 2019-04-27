import * as React from 'react';

import './scss/app';

export default class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);

    }

    async componentWillMount() {

    }

    render () {
        return (
            <main className="container">
                <h1 className="covalence-blue">Hello</h1>
                <h2></h2>
            </main>
        )
    }
}

interface IAppProps {

}

interface IAppState {
}