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

        if (this.props.userType === 'funcionario') {

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
                        <NavLink className="ui item" to="/gerirUsers">
                            <i className="search icon" />
                            <p>GERIR USERS</p>
                        </NavLink>
                        <div className="right menu">
                            <div className="item">
                                <div className="ui yellow label">
                                    {localStorage.getItem('username')}
                                    <div className="detail">Funcionário</div>
                                </div>
                            </div>
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
                </Container>
            </div>
        );
    }
}

export default Header;