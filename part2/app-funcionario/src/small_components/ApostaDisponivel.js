import React, {Component} from 'react';
import { Header,List,Table , TableCell, TableRow,TableBody } from 'semantic-ui-react';
import {endAposta,updateOdd} from '../services/Api'

class ApostaDisponivel extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            evento:this.props.evento,
            aposta:this.props.aposta,
            redirect:false,
            opcao:{},
            action:this.props.action,
            novasOpcoes:{}
        };
    }

    action = (opcao) => {
      if(this.state.action===1){
          const bodyEndBet = {
            id_aposta: this.state.aposta.id_aposta_disponivel ,
            id_opcao : opcao.id_opcao
          }
          endAposta(bodyEndBet)
          .then(resp=>{
            alert("Sucesso");
            window.location.reload()
          })
          .catch(res=>alert(res))
      }
      
    }
    componentWillReceiveProps(props) {
      if(props.action.toString() !== this.props.action.toString() )
          this.setState({
              action:props.action
          })
    }
  

    renderRedirect = () => {
      if (this.state.redirect) {

      }
    }
    saveNovaOpcao(value,opcao){
        let novasOpcoes = this.state.novasOpcoes
        novasOpcoes[opcao.id_opcao] =value
        this.setState({
            novasOpcoes: novasOpcoes
        })
    }

    mudarOdds(){
        if(this.state.action===3){
            const novasOpcoes = this.state.novasOpcoes
            console.log(novasOpcoes);
            if(Object.keys(novasOpcoes).length >0){
                for (var id_opcao in novasOpcoes) {

                    const bodyOpcao = {
                      id_opcao: parseInt(id_opcao) ,
                      odd : parseInt(novasOpcoes[id_opcao])
                    }
                    console.log(bodyOpcao);
                    
                    updateOdd(bodyOpcao)
                    .then(resp=>{
                        console.log("novaopcaoresposta:");
                        console.log(resp)
                    })
                //    .catch(res=>alert(res))
                }
            }
            window.location.reload()
        }
    }
    render() {
      
        let color = ""
        
        switch(this.state.action){
          case 1:{
            color="red"
            break;
          }
          case 2:{
            color="blue"
            break;
          }
          default:{
            color = ""
          }
        }
        const aposta = this.state.aposta;
        let vip = aposta.vip ? "VIP" : "" 
        return (
          <List.Item>
          {this.mudarOdds()}
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
                        <TableCell textAlign={'right'} key={opcao.id_opcao} >
                          
                            <button className={"ui right floated button " +color}
                                      disabled={this.state.action<=0 || this.state.action===3}
                                     key={ opcao } onClick = {() => this.action(opcao) }  
                                     
                                     >
                                      {opcao.opcao} odd: {opcao.odd}
                                      { this.state.action===2 ? <input  type="number" style={ {"width":"60px"} } step="0.01"  placeholder="Odd"  onChange={({target: {value}}) => this.saveNovaOpcao(value,opcao) }  ></input> : <div></div>}
                            </button>
                          
                        
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