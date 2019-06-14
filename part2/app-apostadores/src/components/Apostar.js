import React, {Component} from 'react';
import {criar_aposta_concreta,criar_aposta_concretaVIP} from '../services/Api'
import {Redirect } from 'react-router-dom';
import {getInformacoesUser} from '../services/Api'
import { Header } from 'semantic-ui-react';

class Apostar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            redirect: false,
            evento:this.props.location.state.evento,
            aposta: this.props.location.state.aposta  ,
            opcao:  this.props.location.state.opcao ,
            possiveisGanhos : 0,
            quantia: 0,
            saldo : 0,
            message: '',
            error: ''
        };
    }

    apostar = async () => {
        const userType = localStorage.getItem('userType');      
        if( (this.state.aposta.vip && userType==='normal')){
          alert("VIP ONLY")
          return ;
        }
        const body={
            quantia: this.state.quantia,
            odd_fixada : this.state.opcao.odd,
            id_aposta_disponivel : this.state.aposta.id_aposta_disponivel,
            id_opcao :  this.state.opcao.id_opcao,
            user_oid : localStorage.getItem('user_id'),
            nome_opcao : this.state.opcao.opcao,
            nome_aposta_disponivel : this.state.aposta.titulo ,
            nome_evento : this.state.evento.titulo,
            nome_competicao : this.state.evento.fase.competicao.nome
        }
        console.log("body:");
        console.log(body);

        if(userType==='normal') {
            criar_aposta_concreta(body)
            .then(async res=>{
                console.log(res);
                if(res.success===null){
                    await this.setState({
                        message: 'Aposta realizada com sucesso!',
                        error: ''
                    })
                }
                else if (res.success===false){
                    await this.setState({
                        message: '',
                        error: res.message
                    })
                }
                await sleep(3000)
                this.setState({
                    redirect: true
                }) 
                                
            })
            .catch(err => {
                this.setState({
                    message: '',
                    error: 'Não foi possível realizar a aposta'
                })
            })
        }
        else{
            criar_aposta_concretaVIP(body)
            .then(async res=>{
                console.log(res);
                if(res.success===null){
                    await this.setState({
                        message: 'Aposta realizada com sucesso!',
                        error: ''
                    })
                }
                else if (res.success===false){
                    await this.setState({
                        message: '',
                        error: res.message
                    })
                }
                await sleep(3000)
                this.setState({
                    redirect: true
                }) 
                                
            })
            .catch(err => {
                this.setState({
                    message: '',
                    error: 'Não foi possível realizar a aposta'
                })
            })
        }

    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: "/apostas" }} />
        }
    }
    
    saveQuantia(quantia){
        console.log("quantia:");
        console.log(quantia);
        this.setState({
            quantia : quantia,
            possiveisGanhos : quantia * this.state.opcao.odd
        })
    }
    
    componentDidMount(){ 
        getInformacoesUser().then(user=>{
            console.log(user);
            this.setState({saldo:user.saldo})
        })
    }

    render() {
        
        return (
            <div className="ui container center aligned">
                <Header style={{marginTop: "40px"}} color='orange' size='huge'>Definir Aposta</Header>
                <br></br>
                    <table className="ui orange table">
                      <thead>
                        <tr><th>Evento</th>
                        <th>Aposta</th>
                        <th>Opção escolhida</th>
                        <th>Odd</th>
                      </tr></thead><tbody>
                        <tr>
                          <td>{this.state.evento.titulo}</td>
                          <td>{this.state.aposta.titulo}</td>
                          <td>{this.state.opcao.opcao}</td>
                          <td>{this.state.opcao.odd}</td>
                        </tr>
                      </tbody>
                    </table>
                <br></br>
                <br></br>
                <div className="ui grid center aligned">
                    <div className="six wide column">
        			    <div className="ui container center aligned">
                            <table className="ui inverted orange table">
                              <thead>
                                <tr>
                                    <th>
                                        <i className="dollar yellow icon"></i>
                                        Saldo atual
                                    </th>
                                    <th>
                                        <i className="dollar yellow icon"></i>
                                        Possíveis ganhos
                                    </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{this.state.saldo} ESScoins</td>
                                  <td>{this.state.possiveisGanhos} ESScoins</td>
                                </tr>
                              </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                {this.renderRedirect()}
                <div className="ui stackable grid container center aligned">
                    <div className="ui action right labeled input">
                      <label className="ui label">$</label>
                      <input type="number" placeholder="Quantia a apostar"  onChange={({target: {value}}) => this.saveQuantia(value) } />
                      <button 
                        disabled={this.state.saldo<this.state.quantia || this.state.quantia<=0 || this.state.quantia===""}
                        className="ui orange right labeled icon button"
                        onClick = {() => this.apostar()}
                      >
                        <i className="arrow circle right icon"></i>
                        Apostar
                      </button>
                    </div>
                </div>
                <Header as="h4" color="green">{this.state.message}</Header>
                <Header as="h4" color="red">{this.state.error}</Header>
            </div>
          );
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default Apostar;