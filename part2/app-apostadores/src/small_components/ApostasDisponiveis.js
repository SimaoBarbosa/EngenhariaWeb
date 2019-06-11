import React, {Component} from 'react';

import {apostasOfEvent} from '../services/Api'
import { List } from 'semantic-ui-react';
import ApostaDisponivel from './ApostaDisponivel'


class ApostasDisponiveis extends Component {

    constructor(props) {
        super(props);
        
        let id_evento = -1
        if(props.id_evento) id_evento=props.id_evento
        this.state = {
            id_evento:id_evento,
            apostas:[],
        };
    }
    
    
    componentWillMount(){
        console.log("id_evento:");
        
        console.log(this.state.id_evento);
        
        const id_evento = this.state.id_evento
        if(id_evento>0){
            apostasOfEvent(2,1,id_evento)
            .then(apts=>{
                this.setState({apostas:apts }) ;
            })
            .catch(err=>console.log(err))
          }
        
    }

    render() {
        const apostas = this.state.apostas;
        
        return (
            <div >
                <List>
                  {apostas.map(aposta => ( 
                    <ApostaDisponivel aposta={aposta}  key={aposta.id_aposta_disponivel} />
                  ))}
                </List>
            </div>
          );
    }
}

export default ApostasDisponiveis;