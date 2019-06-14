import React, {Component} from 'react';
import {apostasOfEvent} from '../services/Api'
import { Container, Header } from 'semantic-ui-react';
import ApostaDisponivel from '../small_components/ApostaDisponivel'


class ApostasDisponiveis extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        
        console.log("evento:");
        console.log(this.props.location.state.evento);
        
        let evento ={}
        if(this.props.location.state.evento) evento=this.props.location.state.evento;
        this.state = {
            evento:evento,
            apostas:[],
        };
    }
    
    componentDidMount(){    
        console.log("evento:");
        
        console.log(this.state.evento);
        
        const id_evento = this.state.evento.id_evento
        if(id_evento>0){
            apostasOfEvent(2,1,id_evento)
            .then(apts=>{
                this.setState({apostas:apts }) ;
            })
            .catch(err=>console.log(err))
          }
        
    }

    render() {
        const apostas = this.state.apostas ?  this.state.apostas : []
        const evento = this.state.evento;
        return (
            <div >
                <Container  textAlign={'center'}>
                    <Header style={{marginTop: "40px"}} color='orange' size='huge'>
                        {evento.titulo}
                    </Header>
                    <Header as='h4'>
                        Data: {evento.datahora.data}, Hora: {evento.datahora.hora}
                    </Header>
                </Container>
                <br></br>
                <br></br>
                <Container className="" width={'2'}>
                <div className="twelve wide column">
                    <div className="ui stacked segment left aligned">
                    <div className="ui list">
                        {apostas.map(aposta => ( 
                            <ApostaDisponivel aposta={aposta} evento={evento}  key={aposta.id_aposta_disponivel} history={this.props.history} />
                        ))}
                    </div>
                    </div>
                </div>
                </Container>
            </div>
          );
    }
}

export default ApostasDisponiveis;