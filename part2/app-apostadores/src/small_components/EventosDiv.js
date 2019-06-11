import React, {PureComponent} from 'react';
import Evento from './Evento'
import {allEvents} from '../services/Api'
import { List } from 'semantic-ui-react';

class EventosDiv extends PureComponent {

    constructor(props) {
        super(props);
        
        let id_fase = -1
        if(props.id_fase>0) id_fase=props.id_fase
        this.state = {
            id_fase:id_fase,
            eventos:[],
        };
    }
    
    componentWillReceiveProps(props) {
        if(props.id_fase!=this.props.id_fase)
            this.setState({id_fase:props.id_fase})
    }
      
    componentDidUpdate (prevProps, prevState, snapshot){
        console.log("Updated  id_fase eventosDIR"+this.state.id_fase);
        console.log(this.state.id_fase);
        
        
    }
    
    componentWillMount(){
        allEvents()
        .then(evts=>{  
            this.setState({eventos:evts}) ;
        })
        .catch(err=>console.log(err))
    }

    render() {

        console.log("fase:");
        
        console.log(this.state.id_fase);
        let eventos =[]
        if(this.state.id_fase!==-1){
            this.state.eventos.forEach(ev=>{
                if(ev.fase_id_fase==this.state.id_fase)
                    eventos.push(ev);
            })
        }
        else eventos = this.state.eventos
        console.log(this.state.eventos);
        
        if(!eventos) eventos = []
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