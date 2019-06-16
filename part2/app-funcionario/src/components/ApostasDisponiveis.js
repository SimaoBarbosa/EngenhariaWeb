import React, {Component} from 'react';
import {apostasOfEvent,createApostaDisponivel,createAddOpcao,makeAvailable} from '../services/Api'
import { Container, Header ,Checkbox} from 'semantic-ui-react';
import ApostaDisponivel from '../small_components/ApostaDisponivel'
import { List,Table , TableCell, TableRow,TableBody } from 'semantic-ui-react';


class ApostasDisponiveis extends Component {

    constructor(props) {
        super(props);
        
        let evento ={}
        if(this.props.location.state.evento) evento=this.props.location.state.evento;
        this.state = {
            evento:evento,
            apostas:[],
            nome:"",
            vip: false,
            odd:"",
            opcao:"",
            opcoes : [],
            action : 0
        };
    }
    saveNovaOpcao(value){
        this.setState({opcao:value})
    }
    saveNovaOdd(value){
        this.setState({odd:value})
    }
    saveTitulo(value){
        this.setState({nome:value})
    }
    saveVIP(){
        this.setState({vip:(!this.state.vip)})
    }
    addOpcao(){
        let opcoes = this.state.opcoes
        opcoes.push({
            odd: this.state.odd,
            opcao: this.state.opcao,
            id_opcao : -1
        })
        this.setState({
            opcoes:opcoes,
            opcao:"",
            odd:"",
            action:0
        })
    }
    async criarAposta(){
        const aposta= {
            titulo: this.state.nome,
            vip:this.state.vip,
            id_evento:this.state.evento.id_evento
        }
        let novaAposta = await createApostaDisponivel(aposta)
        this.state.opcoes.forEach(async opcao => {
            const bodyOpcao={
                opcao:opcao.opcao,
                odd:opcao.odd,
                aposta:novaAposta.id_aposta_disponivel
            }
            novaAposta.opcoes=[]
            let novaopcao = await createAddOpcao(bodyOpcao)
            novaAposta.opcoes.push(novaopcao)
        })
        try {
            await makeAvailable(novaAposta.id_aposta_disponivel);
        } catch (error) {
            this.setState({
                vip:false,
                nome:"",
                opcoes:[]
            })
            alert("Erro :"+ error)
            console.log(error);
            return;
             
        }
        let apostas = this.state.apostas
        apostas.push(novaAposta)
        this.setState({
            apostas:apostas,
            vip:false,
            nome:"",
            opcoes:[]
        })

    }
    componentDidMount(){    
        console.log("evento:");
        
        console.log(this.state.evento);
        
        const id_evento = this.state.evento.id_evento
        if(id_evento>0){
            apostasOfEvent(2,1,id_evento)
            .then(apts=>{
                this.setState({apostas:apts }) ;
            })
            .catch(err=>console.log(err))
          }
        
    }

    previewNovaAposta(){
        let vip = this.state.vip ? "VIP" : "" 
        if(this.state.nome!=="" || this.state.opcoes.length>0 )
        return (
            <div>
                
            <hr></hr><br></br>
            <div className="ui grid center aligned">
            <List.Item textAlign={'center'}>
                <Header as="h3"><b>Preview da nova aposta</b></Header>
            </List.Item>
            </div>
            <br></br>  
            <List.Item>
            <div className="item">
              <Table color={"black" } inverted >
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="content" width={'1'}>
                          <p> <b> {this.state.nome}  </b> </p>
                      </div>
                    </TableCell>
                    <TableCell textAlign={'left'} width={'5'}>
                        <Header as="h1" color='orange' >{vip}</Header>
                    </TableCell>
                    {this.state.opcoes.map(opcao => ( 
                          <TableCell textAlign={'right'} key={opcao.id_opcao}  width={'2'}>
                              <button className="ui right floated button disabled" key={ opcao }   >
                                {opcao.opcao} odd: {opcao.odd}
                              </button>
                          
                          </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </List.Item>
          </div>
        );
    }
    async reload(){
            sleep(20).then(()=>{
                console.log("donesleep");
                this.setState({action:0})
            //    window.location.reload()
            })
    }
    handleToUpdateAction = (state) => {
        console.log('We pass argument from Child to Parent: ' + state);
        this.setState({action:state})
    }   

    
    render() {
        const apostas = this.state.apostas;
        const evento = this.state.evento;
       // const blackbutton = this.state.action===1 ? "Confirmar" : "Cancelar"
        console.log(this.state.opcoes);
        
        return (
            <div >
                <Container  textAlign={'center'}>
                    <Header style={{marginTop: "40px"}} color='orange' size='huge'>
                        {evento.titulo}
                    </Header>
                    <Header as='h4'>
                        Data: {evento.datahora.data}, Hora: {evento.datahora.hora}
                    </Header>
                    <button onClick = {() => this.setState({action:1})  }
                            disabled={this.state.action!==0}
                            className="ui button red" >
                        Terminar Aposta
                    </button>
                    <button onClick = {() => this.setState({action:2})}
                            disabled={this.state.action!==0}
                            className="ui button blue">
                        Mudar Odds
                    </button>
                    
                    <button className="ui button green" 
                            onClick = {() =>{ this.setState({action:3}) ; this.reload() } }
                            disabled={this.state.action!==2}>
                        Confirmar Odds
                    </button>
                    <button className="ui button black" 
                            onClick = {() => this.setState({action:0}) }
                            disabled={this.state.action===0}>
                        Cancelar
                    </button>
                </Container>
                <br></br>
                <br></br>
                <Container className="" width={'2'}>
                <div className="twelve wide column">
                    <div className="ui stacked segment left aligned">
                    
                    <div className="ui list">
                    { apostas.length>0 ?
                        <div>
                        {apostas.map(aposta => ( 
                            <ApostaDisponivel aposta={aposta}
                                              evento={evento}
                                              key={aposta.id_aposta_disponivel}
                                              history={this.props.history}
                                              action={this.state.action}
                                              handleToUpdate = {this.handleToUpdateAction} />
                        ))}
                        </div>
                        :
                    <div>
                        <Header>Sem Apostas disponíveis!</Header>
                    </div>
                    }
                        {this.previewNovaAposta()}
                    </div>
                    
                    </div>
                    <div style={{marginTop: "20px"}} className="ui column stackable center aligned page grid">
                    <div className="wide column">
                        <div>
                            <div className="ui right labeled input" >
                                    <div className="ui basic label center">Título</div>
                                    <input type="text" placeholder="Nova Aposta"  onChange={({target: {value}}) => this.saveTitulo(value) } />
                            </div>
                            <div className="ui right labeled input" >
                                    <div className="ui basic label center">VIP</div>
                                    <div className="ui basic label center">
                                        <Checkbox checked={this.state.vip} onChange={() => this.saveVIP() } />
                                    </div>
                            </div>
                            <button disabled={this.state.nome==="" || this.state.opcoes.length<2 }
                                  className="ui orange button" onClick = {() => this.criarAposta() }  >
                                        Criar Nova Aposta
                            </button>
                        </div>
                    </div>
                    
                </div>

                <div className="ui column stackable center aligned page grid">
                    <div className="wide column">
                        <div>
                            <div className="ui right labeled input" >
                                    <div className="ui basic label center">Opção</div>
                                    <input type="text" placeholder="Nova Opção" value={this.state.opcao}  onChange={({target: {value}}) => this.saveNovaOpcao(value) } />
                            </div>
                            <div className="ui right labeled input" >
                                    <div className="ui basic label center">Odd</div>
                                    <input type="number" step="0.01"  placeholder="Odd" value={this.state.odd} onChange={({target: {value}}) => this.saveNovaOdd(value) } />
                                    
                            </div>
                            <button disabled={this.state.opcao==="" || this.state.odd==="" || this.state.odd<=0  } className="ui black button" onClick={() => this.addOpcao() }  >
                                        Adicionar Opção
                            </button>
                        </div>
                    </div>
                    
                </div>
                </div>
                </Container>
            </div>
          );
    }
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default ApostasDisponiveis;