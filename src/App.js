import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./pages/login";
import Myboard from "./pages/myboard";
import Detail from "./pages/detail";
import Register from "./pages/register";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/myboard' component={Myboard} />
                        <Route  path='/myboard/:id' render={(props) => {
                            return (
                                <Detail id={props.match.params.id} />)
                        }}/>
                        <Route path='/register' component={Register} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
