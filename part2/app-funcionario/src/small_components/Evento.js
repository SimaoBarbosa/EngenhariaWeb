import React, {PureComponent} from 'react';
import {Header, List,Table , TableCell, TableRow,TableBody } from 'semantic-ui-react';
class Evento extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
          redirect:0,
          evento:this.props.evento
        };
    }
   
    setRedirect = (value) => {
      this.setState({
        redirect: value
      })
    }
    
    renderRedirect = () => {
      if (this.state.redirect===1) {
        this.props.history.push("/apostasDisponiveis", {
            evento: this.state.evento
        } )
      }
    }

    render() {
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
                    {this.renderRedirect()}
                    <div className="right floated content">
                    <button className="ui orange right labeled icon button" onClick = {() => this.setRedirect(1) }  >
                       <i className="angle right icon"></i>
                        Gerir Apostas
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