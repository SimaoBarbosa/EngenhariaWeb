import React, {Component} from 'react';
import Evento from './Evento'
import {eventsOfFase} from '../services/Api'
import { List } from 'semantic-ui-react';

class EventosDiv extends Component {

    constructor(props) {
        super(props);
        
        let id_fase = -1
        if(props.id_fase>0) id_fase=props.id_fase
        this.state = {
            id_fase:id_fase,
            eventos:[],
        };
    }

    
    componentWillMount(){
        console.log("fase:");
        
        console.log(this.state.id_fase);
        
        const id_fase = this.state.id_fase
        if(id_fase>0){
            eventsOfFase(id_fase)
            .then(evts=>{
                
                this.setState({eventos:evts.eventos }) ;
            })
            .catch(err=>console.log(err))
          }
        
    }

    render() {
        const eventos = this.state.eventos;
        
        return (
            <div >
                <List>
                  {eventos.map(evento => ( 
                    <Evento evento={evento}  key={evento.id_evento} />
                  ))}
                </List>
            </div>
          );
    }
}

export default EventosDiv;