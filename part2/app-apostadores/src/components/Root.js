import React from 'react';
import PropTypes from 'prop-types';

// Redux
import {Provider as StoreProvider} from 'react-redux';

// React router
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Authentication
import Authentication from './Authentication';

// Components
import Header from './Header';
import Login from './Login';
import Registar from './Registar';
import Eventos from './Eventos';
import Equipas from './Equipas';
import Apostas from './Apostas';
import Perfil from './Perfil';
import Notificacoes from './Notificacoes';
import ApostasDisponiveis from './ApostasDisponiveis'
import Apostar from './Apostar'
import Vip from './Vip';

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

const Root = ({ store }) => {

    const routesByApostador = {
        normal: (
            <React.Fragment>
                <Header userType={'normal'} />
                <Switch>
                    <FindRoute exact path="/" component={Eventos} />
                    <FindRoute exact path="/apostasDisponiveis" component={ApostasDisponiveis} />
                    <FindRoute exact path="/apostar" component={Apostar} />
                    <FindRoute exact path="/home" component={Eventos} />
                    <FindRoute exact path="/equipas" component={Equipas} />
                    <FindRoute exact path="/apostas" component={Apostas} />
                    <FindRoute exact path="/perfil" component={Perfil} />
                    <FindRoute exact path="/notificacoes" component={Notificacoes} />
                    <FindRoute exact path="/vip" component={Vip} />
                </Switch>
            </React.Fragment>
        ),
        vip: (
            <React.Fragment>
                <Header userType={'vip'} />
                <Switch>
                    <FindRoute exact path="/" component={Eventos} />
                    <FindRoute exact path="/apostasDisponiveis" component={ApostasDisponiveis} />
                    <FindRoute exact path="/apostar" component={Apostar} />
                    <FindRoute exact path="/home" component={Eventos} />
                    <FindRoute exact path="/equipas" component={Equipas} />
                    <FindRoute exact path="/apostas" component={Apostas} />
                    <FindRoute exact path="/perfil" component={Perfil} />
                    <FindRoute exact path="/notificacoes" component={Notificacoes} />
                </Switch>
            </React.Fragment>
        ),
        default: (
            <React.Fragment>
                <Header userType={'default'} />
                <Switch>
                    <Route exact path="/home" render={ props => <Login {...props} />} />
                    <Route exact path="/registar" render={ props => <Registar {...props} />} />
                    <Redirect from="/" to="/home" />
                </Switch>
            </React.Fragment>
        )
    };

    let content;
    const userType = localStorage.getItem('userType');
    switch (userType) {
        case 'normal':
            content = routesByApostador.normal;
            break;

        case 'vip':
            content = routesByApostador.vip;
            break;

        default:
            content = routesByApostador.default;
    }

    return (
        <StoreProvider store={store}>
            <BrowserRouter>
                {content}
            </BrowserRouter>
        </StoreProvider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;