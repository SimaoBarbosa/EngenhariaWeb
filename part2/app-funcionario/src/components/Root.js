import React from 'react';

// React router
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Authentication
import Authentication from './Authentication';

// Components
import Header from './Header';
import Login from './Login';
import Eventos from './Eventos';
import Equipas from './Equipas';
import GerirUsers from './GerirUsers';
import ApostasDisponiveis from './ApostasDisponiveis'
import CriarEvento from './CriarEvento'
const FindRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Authentication.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
        }
    />
);

const Root = () => {
    // Authentication.logout();
    const routes = {
        funcionario: (
            <React.Fragment>
                <Header userType={'funcionario'} />
                <Switch>
                    <FindRoute exact path="/" component={Eventos} />
                    <FindRoute exact path="/home" component={Eventos} />
                    <FindRoute exact path="/equipas" component={Equipas} />
                    <FindRoute exact path="/gerirUsers" component={GerirUsers} />
                    <FindRoute exact path="/apostasDisponiveis" component={ApostasDisponiveis} />
                    <FindRoute exact path="/criarEvento" component={CriarEvento} />
                </Switch>
            </React.Fragment>
        ),
        default: (
            <React.Fragment>
                <Header userType={'default'} />
                <Switch>
                    <Route exact path="/home" render={ props => <Login {...props} />} />
                    <Redirect from="/" to="/home" />
                </Switch>
            </React.Fragment>
        )
    };

    let content;
    const userType = localStorage.getItem('userType');
    console.log("Aqui");
    console.log(userType);
    
    
    if(userType==='funcionario')
        content = routes.funcionario;
    else 
        content = routes.default;

    return (
        <BrowserRouter>
            {content}
        </BrowserRouter>
    );
};

export default Root;