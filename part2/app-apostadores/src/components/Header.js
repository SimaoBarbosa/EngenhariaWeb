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
                        <NavLink className="ui item" to="/equipas">
                            <i className="search icon" />
                            <p>EQUIPAS</p>
                        </NavLink>
                        <NavLink className="ui item" to="/apostas">
                            <i className="dollar sign icon" />
                            <p>APOSTAS</p>
                        </NavLink>
                        <NavLink className="ui item" to="/perfil">
                            <i className="user icon" />
                            <p>PERFIL</p>
                        </NavLink>
                        <NavLink className="ui item" to="/notificacoes">
                            <i className="bell icon" />
                            <p>NOTIFICAÇÕES</p>
                        </NavLink>
                        <NavLink className="ui item" to="/vip">
                            <i className="star outline icon" />
                            <p>VIP</p>
                        </NavLink>
                        <div className="right menu">
                            <div className="item">
                                <div className="ui yellow label">
                                    {localStorage.getItem('username')}
                                    <div className="detail">Apostador normal</div>
                                </div>
                            </div>
                        </div>
                        <div className="right menu">
                            <div className="item">
                                <Button content='LOGOUT' icon='sign-out' labelPosition='right' onClick={this.handleLogout.bind(this)}/>
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
                        <NavLink className="ui item" to="/equipas">
                            <i className="search icon" />
                            <p>EQUIPAS</p>
                        </NavLink>
                        <NavLink className="ui item" to="/apostas">
                            <i className="dollar sign icon" />
                            <p>APOSTAS</p>
                        </NavLink>
                        <NavLink className="ui item" to="/perfil">
                            <i className="user icon" />
                            <p>PERFIL</p>
                        </NavLink>
                        <NavLink className="ui item" to="/notificacoes">
                            <i className="bell icon" />
                            <p>NOTIFICAÇÕES</p>
                        </NavLink>
                        <div className="right menu">
                            <div className="item">
                                <div className="ui yellow label">
                                    {localStorage.getItem('username')}
                                    <div className="detail">Apostador VIP</div>
                                </div>
                            </div>
                        </div>
                        <div className="right menu">
                            <div className="item">
                                <Button content='LOGOUT' icon='sign-out' labelPosition='right' onClick={this.handleLogout.bind(this)}/>
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