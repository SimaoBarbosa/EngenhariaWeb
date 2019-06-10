import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            rememberMe: true
        };
    }

    componentDidMount() {

        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const email = rememberMe ? localStorage.getItem('email') : '';

        this.setState({ email, rememberMe });
    }

    handleInputChange = (event) => {

        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;

        this.setState({ [input.name]: value });
    };

    handleLoginSubmit = async (history) => {

        const { email, password, rememberMe } = this.state;

        if(email !== '' && password !== '') {

            const response = await this._login();
            if(response.success) {

                console.log("login success");

                if(rememberMe) {
                    localStorage.setItem('name', response.name);
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('email', email);
                }

                localStorage.setItem('userType', response.userType);
                this.props.history.push('/home');
            }
        }
    };

    /**
     * User login
     * @private
     */
    async _login() {

        if(true) {
            return {
                success: true,
                userType: 'normal',
                token: 'token_token_token',
            };
        }
        else {
            return {
                success: false,
                error: 'Credenciais erradas'
            };
        }
    }

    render() {

        return (
            <div className="ui stackable grid container center aligned">
                <div className="eight wide column">
                    <Header size='huge'>BetESS</Header>
                    <img
                        src={require("../images/logo.png")}
                        className="ui small centered image"
                        style={{marginBottom: "20px"}}
                        alt={"logo"}
                    />
                    <form className="ui form">
                        <div className="ui stacked segment left aligned">
                            <div className="field">
                                <label>Username</label>
                                <div className="ui left icon input">
                                    <input
                                        type="email"
                                        name={"email"}
                                        placeholder="Introduza o seu username"
                                        onChange={this.handleInputChange}
                                    />
                                    <i className="user icon" />
                                </div>
                            </div>
                            <div className="field">
                                <label>Palavra-passe</label>
                                <div className="ui left icon input">
                                    <input
                                        type="password"
                                        name={"password"}
                                        placeholder="Introduza a sua palavra-passe"
                                        onChange={this.handleInputChange}
                                    />
                                    <i className="lock icon" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui checkbox">
                                    <input
                                        type="checkbox"
                                        name={"rememberMe"}
                                        defaultChecked={true}
                                        onChange={this.handleInputChange}
                                        tabIndex="0"
                                    />
                                    <label>Lembrar o meu acesso</label>
                                </div>
                            </div>
                            <button
                                className="ui fluid button"
                                type="submit"
                                onClick={this.handleLoginSubmit.bind(this)}
                            >LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);