import React, {PureComponent} from 'react';
import Evento from './Evento'
import {allEvents} from '../services/Api'
import {Header} from 'semantic-ui-react';

class EventosDiv extends PureComponent {

    constructor(props) {
        super(props);
        
        let id_fase = -1
        if(props.id_fase>0) id_fase=props.id_fase
        this.state = {
            id_fase:id_fase,
            id_competicao:props.id_competicao,
            eventos:[],
            redirect:false

        };
    }
    
    setRedirect = () => {
        this.props.history.push("/criarEvento", {
            id_fase: this.state.id_fase,
            id_competicao :  this.state.id_competicao
        } )

        this.setState({
          redirect: true
        })
    }
      
    renderRedirect = () => {
        console.log("HISTORY EVENTOS DIV");
        
        console.log(this.props.history);
        
        if (this.state.redirect) {
        }
    }

    componentWillReceiveProps(props) {
        if(props.id_fase.toString() !== this.props.id_fase.toString() || props.id_competicao.toString() !== this.props.id_competicao.toString())
            this.setState({
                id_fase:props.id_fase,
                id_competicao : props.id_competicao
            })
    }
    
    componentDidMount(){
        allEvents()
        .then(evts=>{  
            this.setState({eventos:evts}) ;
        })
        .catch(err=>console.log(err))
    }

    
    render() {

        //console.log("fase:");
        //console.log(this.state.id_fase);
        
        let eventos =[]
        if(this.state.id_fase.toString()!=="-1"){
            this.state.eventos.forEach(ev=>{
                if(ev.fase_id_fase.toString()===this.state.id_fase.toString())
                    eventos.push(ev);
            })
        }
        else eventos = this.state.eventos
        //console.log(this.state.eventos);
        
        if(!eventos) eventos = []
        return (
            <div>
                
                {this.renderRedirect()}
                <div className="ui column stackable center page grid">
                    <div className="wide column">
                        <div className="ui container center aligned">
                            <Header color='orange' as='h3'>Eventos</Header>
                        </div>
                        <div className="ui stacked segment left aligned">
                            <div className="ui list">
                                {eventos.map(evento => ( 
                                    <Evento evento={evento}  key={evento.id_evento} history={this.props.history} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ui column stackable center page grid">
                    <div className="wide column">
                        <div hidden={this.state.id_fase<0}>
                            <button  className="ui button" onClick = {() => this.setRedirect() }  >
                                        Criar Novo Evento
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventosDiv;