import React, {Component} from 'react';
import { Header, List, Table, TableCell, TableRow, TableBody } from 'semantic-ui-react';
import { getEventosEquipa } from '../services/Api'
import { Redirect } from 'react-router-dom';

class EventosEquipa extends Component {

    constructor(props) {
        super(props);

        this.state = {
            equipa: this.props.location.state.equipa,
            eventos: [],
            redirect: false,
            evento: {}
        };
    }

    componentDidMount(){
        getEventosEquipa(this.state.equipa.id_equipa).then(eventos => {
            this.setState({eventos: eventos})
        }).catch(err => {
            console.log(err)
        })
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to={{
                pathname: '/apostas_disponiveis',
                state: {evento: this.state.evento}}
            }/>)
        }

        return (
            <div>
                <div className="ui stackable grid container center aligned">
                    <div className="twelve wide column">
                        <div className="ui container center aligned">
                            <Header style={{marginTop: "40px"}} color='orange' as='h2'>Lista de eventos de {this.state.equipa.nome}</Header>
                        </div>
                        <div className="ui stacked segment left aligned">
                            <div className="ui list">

                                {(this.state.eventos.length > 0) ?
                                    this.state.eventos.map(evento => ( 
                                        
                                        <List.Item key={evento.id_evento}>
                                            <div className="item">
                                                <Table>
                                                <TableBody>
                                                    <TableRow>
                                                    <TableCell>
                                                        <div className="content">
                                                            <Header as='h3'>{evento.titulo}</Header>
                                                            <div style={{marginTop: "5px"}} className="description">{evento.datahora.data}  {evento.datahora.hora}</div>
                                                            <div style={{marginTop: "5px"}} className="description">{evento.fase.competicao.nome}, {evento.fase.nome}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="right floated">
                                                        <button
                                                            className="ui orange right labeled icon button"
                                                            onClick={() => this.setState({
                                                                evento: evento,
                                                                redirect: true
                                                            })}
                                                        >
                                                            <i className="angle right icon"></i>
                                                            Apostar
                                                        </button>
                                                        </div>
                                                    </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                                </Table>
                                            </div>
                                        </List.Item>
                                    )) :
                                    <Header color='grey' as='h2'>Sem eventos</Header>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventosEquipa;