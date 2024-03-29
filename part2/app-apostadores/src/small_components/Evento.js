import React, {PureComponent} from 'react';
import {Popup,Button, List,Table , TableCell, TableRow,TableBody, Header } from 'semantic-ui-react';
import { getTeamsOfEvent } from './../services/Api';

class Evento extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
          evento: this.props.evento,
          redirectE: false,
          redirectH: false,
          equipas: []
        };
    }

    getTeams(){
      getTeamsOfEvent(this.state.evento.id_evento).then(equipas => {
        this.setState({
          equipas: equipas.equipas,
          redirectH: true
        })
      })
    }

    render() {

      if (this.state.redirectE) {
          this.props.history.push("/apostas_disponiveis", {evento: this.state.evento })   
     }

      if (this.state.redirectH) {
          this.props.history.push("/historico", {equipas: this.state.equipas})
      }

      const evento =  this.state.evento;
      console.log(evento);
      return (
        <List.Item>
          <div className="item">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="content">
                        <Header as='h3'>{evento.titulo}</Header>
                        <div style={{marginTop: "5px"}} className="description">{evento.datahora.data}  {evento.datahora.hora} </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="right floated content">
                    <Popup content="Ver histórico de resultados" trigger={
                      <Button 
                        className="ui icon button"
                        icon="history"
                        disabled={(localStorage.getItem('userType') === 'normal')}
                        onClick={() => this.getTeams()}
                      />
                    }/>
                      <button
                        className="ui orange right labeled icon button"
                        onClick = {() => this.setState({
                          redirectE: true
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
      );
    }
}

export default Evento;