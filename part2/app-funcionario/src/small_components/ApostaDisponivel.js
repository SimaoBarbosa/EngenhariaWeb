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
            novasOpcoes:{},
            deleted:false
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
            console.log(resp);
            this.props.handleToUpdate(0)
            this.setState({deleted:true})
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
  
    saveNovaOpcao(value,opcao){
        
        let novasOpcoes = this.state.novasOpcoes
        novasOpcoes[opcao.id_opcao] =value
        
        this.setState({
            novasOpcoes: novasOpcoes
        })
    }

   async mudarOdds(){
        if(this.state.action===3){
              let aposta = this.state.aposta
              let novasOpcoes = this.state.novasOpcoes
              console.log(novasOpcoes);
              if(Object.keys(novasOpcoes).length >0){
                  for (var id_opcao in novasOpcoes) {

                      let bodyOpcao = {
                        id_opcao: parseInt(id_opcao) ,
                        odd : novasOpcoes[id_opcao]
                      }
                      try{
                        await updateOdd(bodyOpcao)
                      }
                      catch (err){
                          console.log(err)
                      }
                  
              }
              console.log("aqui:");
              console.log(aposta);
              
              this.state.aposta.opcoes.forEach(opcao=>{
                for (var id_opcao in novasOpcoes) {
                if(opcao.id_opcao.toString()===id_opcao.toString()){
                  opcao.odd =novasOpcoes[id_opcao]
                }
              }
              })
              
              this.setState({
                aposta:aposta,
                novasOpcoes:[],
                action:0
              })
              
          }
      }
    }
    render() {
      
        let color = ""
        
        if (this.state.action===3) {
          this.mudarOdds()
        }

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
          <div className="item" hidden={this.state.deleted}>
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