import React from 'react';
import { NavLink } from 'react-router-dom';
import {Button, Container} from 'semantic-ui-react';
import Authentication from "./Authentication";
import {headerStyle} from "../styles/styles";

class Header extends React.Component {

    /**
     * User logout.
     * @returns {Promise<void>}
     */
    handleLogout = async () => {

        await Authentication.logout();
        window.location.reload();
    };

    render() {

        if (this.props.userType === 'normal') {

            return (
                <div className="ui fluid secondary pointing menu" style={headerStyle}>
                    <Container>
                        <NavLink activeClassName="active" className="ui item" to="/home" >
                            <i className="home icon" />
                            <p>EVENTOS</p>
                        </NavLink>
                        <NavLink className="ui item" to="/equipas">EQUIPAS</NavLink>
                        <NavLink className="ui item" to="/apostas">APOSTAS</NavLink>
                        <NavLink className="ui item" to="/perfil">PERFIL</NavLink>
                        <NavLink className="ui item" to="/notificacoes">NOTIFICAÇÕES</NavLink>
                        <NavLink className="ui item" to="/vip">VIP</NavLink>
                        <div className="right menu">
                            <div className="item">
                                <Button className="ui button" onClick={this.handleLogout.bind(this)}>
                                    LOGOUT
                                </Button>
                            </div>
                        </div>
                    </Container>
                </div>
            );
        }
        
        else if (this.props.userType === 'vip') {
            
            return (
                <div className="ui fluid secondary pointing menu" style={headerStyle}>
                    <Container>
                        <NavLink activeClassName="active" className="ui item" to="/home" >
                            <i className="home icon" />
                            <p>EVENTOS</p>
                        </NavLink>
                        <NavLink className="ui item" to="/equipas">EQUIPAS</NavLink>
                        <NavLink className="ui item" to="/apostas">APOSTAS</NavLink>
                        <NavLink className="ui item" to="/perfil">PERFIL</NavLink>
                        <NavLink className="ui item" to="/notificacoes">NOTIFICAÇÕES</NavLink>
                        <div className="right menu">
                            <div className="item">
                                <Button className="ui button" onClick={this.handleLogout.bind(this)}>
                                    LOGOUT
                                </Button>
                            </div>
                        </div>
                    </Container>
                </div>
            );
        }

        return (
            <div className="ui fluid secondary pointing menu" style={headerStyle}>
                <Container>
                    <NavLink activeClassName="active" className="ui item" to="/home">INÍCIO</NavLink>
                    <NavLink className="ui item" to="/registar" >REGISTAR</NavLink>
                </Container>
            </div>
        );
    }
}

export default Header;