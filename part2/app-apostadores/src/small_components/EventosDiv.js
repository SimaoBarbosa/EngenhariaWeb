import React, {PureComponent} from 'react';
import Evento from './Evento'
import {allEvents} from '../services/Api'

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
        if(props.id_fase.toString() !== this.props.id_fase.toString())
            this.setState({id_fase:props.id_fase})
    }
      
    componentDidUpdate (prevProps, prevState, snapshot){
        console.log("Updated  id_fase eventosDIR"+this.state.id_fase);
        console.log(this.state.id_fase);
        
        
    }
    
    componentDidMount(){
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
        if(this.state.id_fase.toString()!=="-1"){
            this.state.eventos.forEach(ev=>{
                if(ev.fase_id_fase.toString()===this.state.id_fase.toString())
                    eventos.push(ev);
            })
        }
        else eventos = this.state.eventos
        console.log(this.state.eventos);
        
        if(!eventos) eventos = []
        return (
            <div >
                <div className="ui column stackable center page grid">
                <div className="twelve wide column">
                    <div className="ui stacked segment left aligned">
                    <div className="ui list">
                  {eventos.map(evento => ( 
                    <Evento evento={evento}  key={evento.id_evento} />
                  ))}
                </div>
                </div>
                    </div>
                    </div>
            </div>
          );
    }
}

export default EventosDiv;