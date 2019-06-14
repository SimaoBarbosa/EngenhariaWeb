import React, {PureComponent} from 'react';
import { List,Table , TableCell, TableRow,TableBody, Header } from 'semantic-ui-react';
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
      //  return <Redirect to={{ pathname: "/apostas_disponiveis", state: {evento: this.state.evento }}} />
          this.props.history.push("/apostas_disponiveis", {evento: this.state.evento })   
     }

      if (this.state.redirectH) {
       // return <Redirect to={{pathname: "/historico"}} />
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
                      <button 
                        className="ui icon button"
                        disabled={(localStorage.getItem('userType') === 'normal')}
                        onClick={() => this.getTeams()}
                      >
                        <i className="history icon"></i>
                      </button>
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