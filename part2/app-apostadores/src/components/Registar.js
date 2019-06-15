import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import { register } from './../services/Api';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            saldo: '',
            password: '',
            error: '',
            message: '',
        };
    }

    handleInputChange = (event) => {

        const input = event.target;

        const value = input.value;

        this.setState({ [input.name]: value });
    };

    handleRegisterSubmit = async (event, history) => {

        event.preventDefault()

        const { username, email, saldo, password } = this.state;
        
        if (username !== '' && password !== '' && email !== '' && saldo !== '') {

            register({
                username: username,
                email: email,
                saldo: saldo,
                password: password
            }).then(response => {
                if (response.success){
                    this.setState({message: response.message + ' A ser redirecionado...', error: ''})
                    sleep(3000).then(() => {
                        this.props.history.push('/home');
                    })
                } else {
                    this.setState({message: '', error: response.message})
                }
            }).catch(err => {
                this.setState({message: '', error: 'Não foi possível efetuar o pedido'})
            })

        } else {
            this.setState({message: '', error: 'Preencha todos os campos'})
        }
    };

    render() {

        return (
            <div className="ui stackable grid container center aligned">
                <div className="eight wide column">
                    <Header color='orange' size='huge' style={{marginTop: "20px"}}>BetESS</Header>
                    <img
                        src={require("../images/register.png")}
                        className="ui small centered image"
                        style={{marginBottom: "20px"}}
                        alt={"logo"}
                    />
                    <Header color='blue' as='h4'>Efetuar registo:</Header>
                    <form className="ui form">
                        <div className="ui stacked segment left aligned">
                            <div className="field">
                                <label>Username</label>
                                <div className="ui left icon input">
                                    <input
                                        name={"username"}
                                        placeholder="Introduza o seu username"
                                        onChange={this.handleInputChange}
                                    />
                                    <i className="user icon" />
                                </div>
                            </div>
                            <div className="field">
                                <label>E-mail</label>
                                <div className="ui left icon input">
                                    <input
                                        type="email"
                                        name={"email"}
                                        placeholder="Introduza o seu e-mail"
                                        onChange={this.handleInputChange}
                                    />
                                    <i className="mail icon" />
                                </div>
                            </div>
                            <div className="field">
                                <label>Saldo</label>
                                <div className="ui left icon input">
                                    <input
                                        type="number"
                                        step="0.01"
                                        name={"saldo"}
                                        placeholder="Introduza a quantia a importar"
                                        onChange={this.handleInputChange}
                                    />
                                    <i className="money bill alternate icon" />
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
                            <Header color='red' as='h4'>{this.state.error}</Header>
                            <Header color='green' as='h4'>{this.state.message}</Header>
                            <button
                                className="ui fluid button"
                                type="submit"
                                color="orange"
                                onClick={this.handleRegisterSubmit.bind(this)}
                            >REGISTAR</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default Login;