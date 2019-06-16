import React, {PureComponent} from 'react';
import Evento from './Evento'
import {allEventsDisponiveis} from '../services/Api'
import {Header} from 'semantic-ui-react';

class EventosDiv extends PureComponent {

    constructor(props) {
        super(props);
        
        
        this.state = {
            id_desporto:props.data.id_desporto,
            id_regiao:props.data.id_regiao,
            id_competicao:props.data.id_competicao,
            id_fase: props.data.id_fase,
            action:props.data.action,
            titulo:props.titulo,
            eventos:[],
        };
    }
    
    componentWillReceiveProps(props) {
        if(
            props.data.id_desporto.toString() !== this.props.data.id_desporto.toString() ||
            props.data.id_regiao.toString() !== this.props.data.id_regiao.toString() ||
            props.data.id_competicao.toString() !== this.props.data.id_competicao.toString() ||
            props.data.id_fase.toString() !== this.props.data.id_fase.toString() ||
            props.data.action.toString() !== this.props.data.action.toString() 
        ) 
            this.setState({
                id_desporto:props.data.id_desporto,
                id_regiao:props.data.id_regiao,
                id_competicao:props.data.id_competicao,
                id_fase: props.data.id_fase,
                action:props.data.action,
                titulo:props.titulo
            })
    }
    
    componentDidMount(){
        allEventsDisponiveis()
        .then(evts=>{  
            this.setState({eventos:evts}) ;
        })
        .catch(err=>console.log(err))
    }
    render() {
        console.log("Action:"+this.state.action);

        let eventos =[]
        switch(this.state.action){
            case -1 :{
                eventos = this.state.eventos
                break;
            }
            case 0 :{
                this.state.eventos.forEach(ev=>{
                    if(ev.fase.competicao.desporto_id_desporto.toString()===this.state.id_desporto.toString())
                        eventos.push(ev);
                })
                break;
            }
            case 1 :{
                this.state.eventos.forEach(ev=>{
                    if(
                        ev.fase.competicao.desporto_id_desporto.toString()===this.state.id_desporto.toString()
                                                        &&
                        ev.fase.competicao.regiao_id_regiao.toString()===this.state.id_regiao.toString() 
                    )
                        eventos.push(ev);
                })
                break;
            }
            case 2 :{
                this.state.eventos.forEach(ev=>{
                    if(ev.fase.competicao_id_competicao.toString()===this.state.id_competicao.toString())
                        eventos.push(ev);
                })
                break;
            }
            case 3 :{
                
                this.state.eventos.forEach(ev=>{
                    if(ev.fase_id_fase.toString()===this.state.id_fase.toString())
                        eventos.push(ev);
                })
                break;
            }
            default:{
                console.log("How did i get here?");
            }
        }

        if(!eventos) eventos = []
        return (
            <div>
                <div className="ui column stackable center page grid">
                    <div className="wide column">
                        <div className="ui container center aligned">
                            <Header style={{marginTop: "15px"}} color='orange' as='h2'>Lista de Eventos</Header>
                            <Header style={{marginTop: "15px"}} color='grey' as='h4'>{this.state.titulo}</Header>
                        </div>
                        <div className="ui stacked segment left aligned">
                            <div className="ui animated list">
                                {eventos.map(evento => ( 
                                    <Evento evento={evento}  key={evento.id_evento} history={this.props.history}/>
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