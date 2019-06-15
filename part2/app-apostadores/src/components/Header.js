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

const NormalBigMenu = (handleLogout) => {
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
                <i className="star outline icon small" />
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
                    <Button content='LOGOUT' icon='sign-out' labelPosition='right' onClick={() => handleLogout()}/>
                </div>
            </div>
        </React.Fragment>
    );
};

const NormalSmallMenu = (handleLogout, hideMenu) => {
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
            <NavLink className="ui item" to="/apostas" onClick={() => hideMenu()}>
                <i className="dollar sign icon" />
                <p>APOSTAS</p>
            </NavLink>
            <NavLink className="ui item" to="/perfil" onClick={() => hideMenu()}>
                <i className="user icon" />
                <p>PERFIL</p>
            </NavLink>
            <NavLink className="ui item" to="/notificacoes" onClick={() => hideMenu()}>
                <i className="bell icon" />
                <p>NOTIFICAÇÕES</p>
            </NavLink>
            <NavLink className="ui item" to="/vip" onClick={() => hideMenu()}>
                <i className="star outline icon" />
                <p>VIP</p>
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
            <NavLink className="ui item" to="/registar" onClick={() => hideMenu()}>REGISTAR</NavLink>
        </React.Fragment>
    );
}

const VIPBigMenu = (handleLogout) => {
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
                        <div className="detail">Apostador normal</div>
                    </div>
                </div>
            </div>
            <div className="right menu">
                <div className="item">
                    <Button content='LOGOUT' icon='sign-out' labelPosition='right' onClick={() => handleLogout()}/>
                </div>
            </div>
        </React.Fragment>
    );
};

const VIPSmallMenu = (handleLogout, hideMenu) => {
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
            <NavLink className="ui item" to="/apostas" onClick={() => hideMenu()}>
                <i className="dollar sign icon" />
                <p>APOSTAS</p>
            </NavLink>
            <NavLink className="ui item" to="/perfil" onClick={() => hideMenu()}>
                <i className="user icon" />
                <p>PERFIL</p>
            </NavLink>
            <NavLink className="ui item" to="/notificacoes" onClick={() => hideMenu()}>
                <i className="bell icon" />
                <p>NOTIFICAÇÕES</p>
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

        if (localStorage.getItem('userType') === 'normal'){
            bigMenu = NormalBigMenu(this.handleLogout.bind(this))
            smallMenu = NormalSmallMenu(this.handleLogout.bind(this), this.handleHideClick.bind(this))
        } else if (localStorage.getItem('userType') === 'vip'){
            bigMenu = VIPBigMenu(this.handleLogout.bind(this))
            smallMenu = VIPSmallMenu(this.handleLogout.bind(this), this.handleHideClick.bind(this))
        } 

        return (
            <React.Fragment>
                <Responsive minWidth={1200}>
                    <div className="ui fluid secondary pointing menu" style={headerStyle}>
                        <Container>
                            {
                                bigMenu     
                            }
                        </Container>
                    </div>
                </Responsive>
                <Responsive maxWidth={1199}>
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