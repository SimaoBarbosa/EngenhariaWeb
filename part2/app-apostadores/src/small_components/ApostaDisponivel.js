import React, {Component} from 'react';

import { Header,List,Table , TableCell, TableRow,TableBody } from 'semantic-ui-react';
import {Redirect } from 'react-router-dom';

class ApostaDisponivel extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            evento:this.props.evento,
            aposta:this.props.aposta,
            redirect:false,
            opcao:{}
        };
    }
    
    
    componentDidMount(){   
        
    }

    apostar = (opcao) => {
      const userType = localStorage.getItem('userType');      
      
      if( (this.state.aposta.vip && userType==='normal')){
        alert("VIP ONLY")
        return ;
      }
      this.setState({
        opcao:opcao,
        redirect: true
      })
    }
    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to={{ pathname: "/apostar", state: {
            opcao: this.state.opcao , 
            aposta: this.state.aposta ,
            evento: this.state.evento
        } }} />
      }
    }


    render() {
        const userType = localStorage.getItem('userType');
        const aposta = this.state.aposta;
        let vip = aposta.vip ? "VIP" : "" 
        return (
          <List.Item>
          <div className="item">
          {this.renderRedirect()}
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="content" width={'1'}>
                        <p> <b> {aposta.titulo}  </b> </p>
                    </div>
                  </TableCell>
                  <TableCell textAlign={'left'} width={'5'}>
                      <Header as="h1" color='orange' >{vip}</Header>
                  </TableCell>
                  {aposta.opcoes.map(opcao => ( 
                        <TableCell textAlign={'right'} key={opcao.id_opcao}  width={'2'}>
                          
                          {(aposta.vip && userType=='normal') ? 
                            (<button className="ui right floated button disabled" key={ opcao } onClick = {() => this.apostar(opcao) }  >
                              {opcao.opcao} odd: {opcao.odd}
                            </button>) :
                            (<button className="ui right floated button" key={ opcao } onClick = {() => this.apostar(opcao) }  >
                              {opcao.opcao} odd: {opcao.odd}
                            </button>)
                          }
                        
                        </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </List.Item>
      );
    }
}

export default ApostaDisponivel;