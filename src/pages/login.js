import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthService from "../services/auth.service";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
export default class Login extends Component {

    state = {
        email: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false,
        location: {},
    };

    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    };
    handlePwdChange = event => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        AuthService.login(this.state.email, this.state.password).then(
            () => {
                this.setState({ redirect: true, isLoading: false });
                localStorage.setItem('isLoggedIn', true);
            },
            error => {

                this.setState({ authError: true, isLoading: false });
            }
        );
    };

    async componentDidMount() {
        // You can await here
        const auth = await AuthService.auth();
        const result = await auth.json();
        if (result.data) {
            window.location.href = "/myboard";
        }
        else {

        }
    }
    responseGoogle = (response) => {
        const profile = response.profileObj;
        AuthService.login(response.profileObj.email, response.profileObj.googleId).then(
            () => {
                this.setState({ redirect: true, isLoading: false });
                localStorage.setItem('isLoggedIn', true);
            },
            async error => {
                const res = await AuthService.register(response.profileObj.email.split('@')[0], response.profileObj.email, response.profileObj.googleId);
                if (res.success) {
                    AuthService.login(response.profileObj.email, response.profileObj.googleId).then(
                        () => {
                            this.setState({ redirect: true, isLoading: false });
                            localStorage.setItem('isLoggedIn', true);
                        },
                        error => {
                            this.setState({ authError: true, isLoading: false });
                        }
                    )
                }
                else {
                    this.setState({ authError: true, isLoading: false });
                }

            }
        );

    }
    responseFacebook = (response) => {
        console.log(response);
        // const profile = response.profileObj;
        AuthService.login(response.email, response.id).then(
            () => {
                this.setState({ redirect: true, isLoading: false });
                localStorage.setItem('isLoggedIn', true);
            },
            async error => {
                const res = await AuthService.register(response.email.split('@')[0], response.email, response.id);
                if (res.success) {
                    AuthService.login(response.email, response.id).then(
                        () => {
                            this.setState({ redirect: true, isLoading: false });
                            localStorage.setItem('isLoggedIn', true);
                        },
                        error => {
                            this.setState({ authError: true, isLoading: false });
                        }
                    )
                }
                else {
                    this.setState({ authError: true, isLoading: false });
                }

            }
        );
    }
    componentClicked = () => {
        console.log('response');
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/myboard' />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                {/* <TitleComponent title="React CRUD Login "></TitleComponent> */}
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>
                    <div className="text-center">
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputEmail" placeholder="Email address" type="text" name="email" onChange={this.handleEmailChange} autoFocus required />
                                    <label htmlFor="inputEmail">Email address/Username</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Email.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputPassword" placeholder="******" name="password" onChange={this.handlePwdChange} required />
                                    <label htmlFor="inputPassword">Password</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Password.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me" />Remember Password
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Login &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                            <span></span>
                                        )}
                                </button>
                            </div>
                            <div className="form-group">
                                <GoogleLogin
                                    clientId="411712365546-p28pbq0qrk077885iajap05pdo5ufg6k.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />

                            </div>
                            <div className="form-group">
                                <FacebookLogin
                                    appId="4657099037694433"
                                    fields="name,email,picture"
                                    onClick={this.componentClicked}
                                    callback={this.responseFacebook}
                                />

                            </div>

                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={'register'}>Register an Account</Link>
                            <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}


