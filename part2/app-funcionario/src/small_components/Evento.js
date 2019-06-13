import React, {PureComponent} from 'react';
import { List,Table , TableCell, TableRow,TableBody } from 'semantic-ui-react';
import {Redirect } from 'react-router-dom';
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
       // return <Redirect to={{ pathname: "/apostasDisponiveis", state: {evento: this.state.evento } }} />
    //    const history = this.state.history
        this.props.history.push("/apostasDisponiveis", {
            evento: this.state.evento
        } )
      }
      else if(this.state.redirect===2) {
       // return <Redirect to={{ pathname: "/gerirEquipasEvento", state: {evento: this.state.evento } }} />
      // const history = this.state.history
       this.props.history.push("/gerirEquipasEvento", {
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
                        <div className="header">{evento.titulo}</div>
                        <div className="description">{evento.datahora.data}  {evento.datahora.hora} </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {this.renderRedirect()}
                    <button className="ui right floated button" onClick = {() => this.setRedirect(1) }  >
                      Ver Apostas
                    </button>
                    <button className="ui right floated button" onClick = {() => this.setRedirect(2) }  >
                      Gerir Equipas
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