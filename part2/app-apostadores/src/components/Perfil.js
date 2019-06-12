import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import { getInformacoesUser, importarSaldo } from './../services/Api';

class Perfil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: '',
            message: '',
            quantia: '',
            username: localStorage.getItem('username'),
            email: '',
            saldo: '',
            userType: localStorage.getItem('userType')
        };
    }

    componentDidMount(){
        getInformacoesUser().then(response => {
            this.setState({
                email: response.email,
                saldo: response.saldo
            })
        }).catch(err => {
            console.log(err)
        })
    }

    handleInputChange = (event) => {

        const input = event.target;

        const value = input.value;

        this.setState({ [input.name]: value });
    };

    depositarQuantia = async (event) => {
        event.preventDefault()
        console.log(this.state.quantia)

        if (this.state.quantia !== ''){

            importarSaldo({
                user: localStorage.getItem('user_id'),
                valor: this.state.quantia
            }).then(response => {
                if (response.success){
                    let newSaldo = Number(this.state.saldo) + Number(this.state.quantia)
                    this.setState({
                        message: 'Saldo atualizado com sucesso',
                        error: '',
                        saldo: newSaldo
                    })
                }
                else{
                    this.setState({
                        message: '',
                        error: 'Não foi possível carregar o seu saldo'
                    })
                }
            }).catch(err => {
                this.setState({
                    message: '',
                    error: 'Ocorreu um erro'
                })
            })

        }
    }

    render() {
        return (
            <div className="ui stackable grid container center aligned">
                <div className="seven wide column">
                    <Header style={{marginTop: "40px"}} color='orange' size='huge'>Perfil do Apostador</Header>
                    <img 
                        className="ui small centered circular image"
                        src={require("../images/profile.png")}
                        style={{marginBottom: "20px"}}
                        alt={"logo"}
                    />
                    <div className="ui stacked segment left aligned">
                        <div className="ui list">

                            <div className="item">
                                <i className="user icon"></i>
                                <div className="content">
                                    <Header as='h4'>Username</Header>  
                                    <div className="description">{this.state.username}</div>
                                </div>
                            </div>

                            <div className="item" style={{marginTop: "3px"}}>
                                <i className="mail icon"></i>
                                <div className="content">
                                    <Header as='h4'>E-mail</Header>  
                                    <div className="description">{this.state.email}</div>
                                </div>
                            </div>

                            <div className="item" style={{marginTop: "3px"}}>
                                <i className="tag icon"></i>
                                <div className="content">
                                    <Header as='h4'>Tipo de apostador</Header>  
                                    
                                    {(this.state.userType === 'normal') ?
                                        <div className="description">Apostador normal</div> :
                                        <div className="description">Apostador VIP</div>
                                    }

                                </div>
                            </div>

                            <div className="item" style={{marginTop: "3px"}}>
                                <i className="money bill alternate icon"></i>
                                <div className="content">
                                    <Header as='h4'>Saldo</Header>  
                                    <div className="description">{this.state.saldo} ESScoins</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <form className="ui form">
                        <div className="ui stacked segment left aligned">
                            
                            <div className="field">
                                <label>Depositar valor</label>
                                <div className="ui left icon input">
                                    <input
                                        type="number"
                                        step="0.01"
                                        name={"quantia"}
                                        min="1"
                                        placeholder="Introduza a quantia a importar"
                                        onChange={this.handleInputChange}
                                    />
                                    <i className="money bill alternate icon" />
                                </div>
                            </div>
                            
                            <Header color='red' as='h4'>{this.state.error}</Header>
                            <Header color='green' as='h4'>{this.state.message}</Header>
                            <button
                                className="ui fluid button"
                                type="submit"
                                color="orange"
                                onClick={this.depositarQuantia.bind(this)}
                            >DEPOSITAR</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Perfil;