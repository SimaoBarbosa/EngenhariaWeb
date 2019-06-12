import React, {Component} from 'react';
import {criar_aposta_concreta} from '../services/Api'
import {Redirect } from 'react-router-dom';

class Apostar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            redirect: false,
            evento:this.props.location.state.evento,
            aposta: this.props.location.state.aposta  ,
            opcao:  this.props.location.state.opcao ,
            quantia:0
        };
    }

    apostar = () => {
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

        debugger;
        criar_aposta_concreta(body)
        .then(res=>{
            console.log(res);
            this.setState({
                redirect: true
              })            
        })
        .catch(err=>alert(err))

    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: "/apostas" }} />
        }
    }
    
    saveQuantia(quantia){
        console.log("quantia:");
        console.log(quantia);
        this.setState({quantia : quantia})
    }
    
    componentDidMount(){   
    }

    render() {
        const aposta = this.state.aposta;
        const evento = this.state.evento;
        const opcao = this.state.opcao;
        console.log(opcao);
        console.log(evento);
        console.log(aposta);
        
        return (
            <div >
                {this.renderRedirect()}
                <div className="ui right labeled input">
                    <div className="ui basic label">$</div>
                        <input type="text" placeholder="Quantia a apostar"  onChange={({target: {value}}) => this.saveQuantia(value) } />
                </div>
                <button className="ui button" onClick = {() => this.apostar() }  >
                             Apostar
                </button>
            </div>
          );
    }
}

export default Apostar;