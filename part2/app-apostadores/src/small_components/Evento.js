import React, {PureComponent} from 'react';
import { List,Table , TableCell, TableRow,TableBody } from 'semantic-ui-react';
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

    componentDidMount(){
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
                        <div className="header">{evento.titulo}</div>
                        <div className="description">{evento.datahora.data}  {evento.datahora.hora} </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {this.renderRedirect()}
                    <button className="ui right floated button" onClick = {() => this.setRedirect() }  >
                          Ver Apostas
                    </button>
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