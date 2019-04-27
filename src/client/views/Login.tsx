import * as React from 'react';
import { json, SetAccessToken } from '../utils/api';
import { RouteComponentProps } from 'react-router';

export interface LoginProps extends RouteComponentProps {

}

export interface LoginState {
    email: string,
    password: string
}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try{
            let data = await json('/auth/login', 'POST', { email: this.state.email, password: this.state.password });
            if(data) {
                SetAccessToken(data.token, { userid: data.userid, role: data.role });
                if(data.role === 'admin') {
                    this.props.history.push('/books');
                } else {
                    this.props.history.push('/');
                }
            } else {
                this.props.history.push('/register');
            };
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <section className="row d-flex justify-content-center">
                <section className="col-12 text-center"><h1>Login</h1>
                </section>
                <section className="col-4">
                    <form>
                        <section className="form-group">
                            <label htmlFor="exampleFormControlInput1">Email</label>
                            <input type="email" className="form-control shadow-sm" id="exampleFormControlInput1" placeholder="Email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                        </section>
                        <section className="form-group">
                            <label htmlFor="exampleFormControlInput2">Password</label>
                            <input type="password" className="form-control shadow-sm" id="exampleFormControlInput2" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                        </section>
                        <button type="submit" className="btn btn-primary mt-3 shadow-lg" onClick={this.handleClick}>Login</button>
                    </form>
                </section>
            </section>
        );
    }
}

export default Login;