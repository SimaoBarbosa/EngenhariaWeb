import React, {PureComponent} from 'react';
import { List,Table , TableCell, TableRow,TableBody, Header } from 'semantic-ui-react';
import {Redirect } from 'react-router-dom';
class Evento extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
          redirect:false,
          evento:this.props.evento
        };
    }
   
    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }
    
    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to={{ pathname: "/apostasDisponiveis", state: {evento: this.state.evento } }} />
      }
    }

    render() {
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
                    {this.renderRedirect()}
                    <div className="right floated">
                      <button
                        className="ui orange right labeled icon button"
                        onClick = {() => this.setRedirect() }
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