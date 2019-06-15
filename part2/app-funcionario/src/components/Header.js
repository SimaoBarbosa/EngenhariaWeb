import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Responsive,
    Button,
    Container,
    Sidebar,
    Menu,
    Icon
} from 'semantic-ui-react';
import Authentication from "./Authentication";
import {headerStyle} from "../styles/styles";

const BigMenu = (handleLogout) => {
    return (
        <React.Fragment>
            <NavLink activeClassName="active" className="ui item" to="/home" >
                <i className="home icon" />
                <p>EVENTOS</p>
            </NavLink>
            <NavLink className="ui item" to="/equipas">
                <i className="search icon" />
                <p>EQUIPAS</p>
            </NavLink>
            <NavLink className="ui item" to="/gerirUsers">
                <i className="users icon" />
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
                    <Button content='LOGOUT' icon='sign-out' labelPosition='right' onClick={() => handleLogout()}/>
                </div>
            </div>
        </React.Fragment>
    );
};

const SmallMenu = (handleLogout, hideMenu) => {
    return (
        <React.Fragment>
            <NavLink className="ui item" to="/home" onClick={() => hideMenu()}>
                <i className="home icon" />
                <p>EVENTOS</p>
            </NavLink>
            <NavLink className="ui item" to="/equipas" onClick={() => hideMenu()}>
                <i className="search icon" />
                <p>EQUIPAS</p>
            </NavLink>
            <NavLink className="ui item" to="/gerirUsers" onClick={() => hideMenu()}>
                <i className="users icon" />
                <p>GERIR USERS</p>
            </NavLink>
            <div className="right menu">
                <div className="item">
                    <Button className="ui button" onClick={() => {handleLogout(); hideMenu();}}>
                        LOGOUT
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};

const DefaultMenu = (hideMenu) => {
    return (
        <React.Fragment>
            <NavLink activeClassName="active" className="ui item" to="/home" onClick={() => hideMenu()}>INÍCIO</NavLink>
        </React.Fragment>
    );
}

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    handleLogout = async () => {
        await Authentication.logout();
        window.location.reload();
    };

    handleHideClick = () => {
        this.setState({visible: false});
    }
    
    handleShowClick = () => {
        this.setState({visible: true});
    }

    render() {

        const {visible} = this.state;

        let bigMenu = DefaultMenu(this.handleHideClick.bind(this))
        let smallMenu = DefaultMenu(this.handleHideClick.bind(this))

        if (localStorage.getItem('userType') === 'funcionario'){
            bigMenu = BigMenu(this.handleLogout.bind(this))
            smallMenu = SmallMenu(this.handleLogout.bind(this), this.handleHideClick.bind(this))
        }

        return (
            <React.Fragment>
                <Responsive minWidth={820}>
                    <div className="ui fluid secondary pointing menu" style={headerStyle}>
                        <Container>
                            {
                                bigMenu     
                            }
                        </Container>
                    </div>
                </Responsive>
                <Responsive maxWidth={819}>
                    <Menu secondary style={headerStyle}>
                        <div style={{marginLeft: '20px', marginTop:' 15px'}}>
                            <Icon name='bars' size={'large'} onClick={this.handleShowClick} />
                        </div>
                    </Menu>
                    <Sidebar
                        as={Menu}
                        direction={'left'}
                        animation='overlay'
                        icon='labeled'
                        onHide={this.handleHideClick}
                        vertical
                        visible={visible}
                        width='thin'
                    >
                        <Menu.Item
                            position={'right'}
                            icon={'close'}
                            onClick={this.handleHideClick}
                        />
                        {
                            smallMenu
                        }
                    </Sidebar>
                </Responsive>
            </React.Fragment>
        );
    }
}

export default Header;