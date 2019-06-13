import React, {PureComponent} from 'react';
import { List,Table , TableCell, TableRow,TableBody, Header } from 'semantic-ui-react';
import {Redirect } from 'react-router-dom';
class Evento extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
          evento: this.props.evento,
          redirectE: false,
          redirectH: false
        };
    }

    render() {

      if (this.state.redirectE) {
        return <Redirect to={{ pathname: "/apostas_disponiveis", state: {evento: this.state.evento }}} />
      }

      if (this.state.redirectH) {
        return <Redirect to={{pathname: "/historico"}} />
      }

      const evento =  this.state.evento;
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
                        onClick={() => this.setState({
                          redirectH: true
                        })}
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