import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { login } from './../services/Api';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    handleInputChange = (event) => {

        const input = event.target;

        const value = input.value;

        this.setState({ [input.name]: value });
    };

    handleLoginSubmit = async (event, history) => {

        event.preventDefault()

        const { username, password } = this.state;

        if(username !== '' && password !== '') {

            login({user: username, password: password}).then(response => {
                console.log(response)
                if (response.success){
                    console.log("login success");

                    localStorage.setItem('token', response.token);
                    localStorage.setItem('username', username);
                    localStorage.setItem('user_id', response.id);
                    
                    if (response.group === 1)
                        localStorage.setItem('userType', 'normal');
                    else if (response.group === 3)
                        localStorage.setItem('userType', 'vip');
                    
                    //this.props.history.push('/home');
                    window.location.reload(); 
                } else {
                    this.setState({error: response.error})
                }
            }).catch(err => {
                this.setState({error: 'Ocorreu um erro'})
            })
        } else {
            this.setState({error: 'Preencha todos os campos'})
        }
    };

    render() {

        return (
            <div className="ui stackable grid container center aligned">
                <div className="eight wide column">
                    <Header color='orange' size='huge'>BetESS</Header>
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
                                        name={"username"}
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
                            <Header color='red' as='h4'>{this.state.error}</Header>
                            <button
                                className="ui fluid button"
                                type="submit"
                                color="orange"
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