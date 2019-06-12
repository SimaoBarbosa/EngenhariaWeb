import React, {Component} from 'react';
import {criar_aposta_concreta} from '../services/Api'
import {Redirect } from 'react-router-dom';
import {getInformacoesUser} from '../services/Api'
import {Grid,Header, TableHeader,Table , TableCell, TableRow,TableBody, TableHeaderCell } from 'semantic-ui-react';

class Apostar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            redirect: false,
            evento:this.props.location.state.evento,
            aposta: this.props.location.state.aposta  ,
            opcao:  this.props.location.state.opcao ,
            possiveisGanhos : 0,
            quantia:0,
            saldo : 0
        };
    }

    apostar = () => {
        const userType = localStorage.getItem('userType');      
        if( (this.state.aposta.vip && userType==='normal')){
          alert("VIP ONLY")
          return ;
        }
        const body={
            quantia: this.state.quantia,
            odd_fixada : this.state.opcao.odd,
            id_aposta_disponivel : this.state.aposta.id_aposta_disponivel,
            id_opcao :  this.state.opcao.id_opcao,
            user_oid : localStorage.getItem('user_id'),
            nome_opcao : this.state.opcao.opcao,
            nome_aposta_disponivel : this.state.aposta.titulo ,
            nome_evento : this.state.evento.titulo,
            nome_competicao : this.state.evento.fase.competicao.nome
        }
        console.log("body:");
        console.log(body);

        debugger;
        criar_aposta_concreta(body)
        .then(res=>{
            console.log(res);
            this.setState({
                redirect: true
              })            
        })
        .catch(err=>alert(err))

    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: "/apostas" }} />
        }
    }
    
    saveQuantia(quantia){
        console.log("quantia:");
        console.log(quantia);
        this.setState({
            quantia : quantia,
            possiveisGanhos : quantia * this.state.opcao.odd
        })
    }
    
    componentDidMount(){ 
        getInformacoesUser().then(user=>{
            console.log(user);
            this.setState({saldo:user.saldo})
        })
    }

    render() {
        const aposta = this.state.aposta;
        const evento = this.state.evento;
        const opcao = this.state.opcao;
        console.log(opcao);
        console.log(evento);
        console.log(aposta);
        
        return (
            <div className="ui container center aligned">
                <br></br><br></br>
                <div className="ui stackable grid container center aligned">
                    <Table textAlign={'center'}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>
                                    Evento
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    Aposta
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    Opção escolhida
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    Odd
                                </TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    {this.state.evento.titulo}
                                </TableCell>
                                <TableCell>
                                    {this.state.aposta.titulo}
                                </TableCell>
                                <TableCell>
                                    {this.state.opcao.opcao}
                                </TableCell>
                                <TableCell>
                                    {this.state.opcao.odd}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <br></br>
                <br></br>
                <div className="ui grid center aligned">
                    <div className="six wide column">
        			    <div className="ui container center aligned">
                            <Table textAlign={'center'}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderCell >
                                        <Grid columns={2}>
                                            <Grid.Column  textAlign={'left'} >
                                                Saldo atual
                                            </Grid.Column>
                                            <Grid.Column textAlign={'right'} >
                                                <Header as={'h5'} color="yellow">
                                                    $
                                                </Header>
                                            </Grid.Column>
                                        </Grid>
                                        </TableHeaderCell>
                                        <TableHeaderCell>
                                            <Grid columns={2} >
                                                <Grid.Column  textAlign={'left'}>
                                                    Possiveis Ganhos
                                                </Grid.Column>
                                                <Grid.Column  textAlign={'right'}>
                                                    <Header as={'h5'} color="yellow">
                                                        $
                                                    </Header>
                                                </Grid.Column>
                                                
                                            </Grid>
                                        </TableHeaderCell>
                                        
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            {this.state.saldo}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.possiveisGanhos}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                {this.renderRedirect()}
                <div className="ui stackable grid container center aligned">
                    <div className="ui right labeled input" >
                        <div className="ui basic label center">$</div>
                            <input type="number" placeholder="Quantia a apostar"  onChange={({target: {value}}) => this.saveQuantia(value) } />
                    </div>
                    <button  disabled={this.state.saldo<this.state.quantia || this.state.quantia===0} className="ui button" onClick = {() => this.apostar() }  >
                                Apostar
                    </button>
                </div>
            </div>
          );
    }
}

export default Apostar;