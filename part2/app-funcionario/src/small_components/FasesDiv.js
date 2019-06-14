import React, {PureComponent} from 'react';
import {Header} from 'semantic-ui-react';
import {createFase} from '../services/Api'
class FasesDiv extends PureComponent {

    constructor(props) {
        super(props);
        console.log("FasesDiv");
        
        console.log(this.props.data)
        this.state = {
            data:this.props.data,
            id_competicao: this.props.id_competicao,
            nome:""
        };
    }
    
    componentWillReceiveProps(props) {
        if(props.data.toString() !== this.props.data.toString() || props.id_competicao.toString() !== this.props.id_competicao.toString())
            this.setState({
                id_competicao : props.id_competicao,
                data:props.data
            })
    }

    componentDidMount(){
    }
    saveNome(value){
        this.setState({nome:value})
    }

    CriarFase(){
        const body= {
            nome : this.state.nome,
            competicao: this.state.id_competicao,
        }
        console.log("BODY");
        console.log(body);
        createFase(body)
        .then(res=>{
            window.location.reload();
        })
        .catch(err=>{
            window.location.reload();
            console.log(err)
        })
    }
    render() {
        const data = this.state.data ?  this.state.data : []
        let regioes = []
        let competicoes = []
        let fases = []
        let nomedesporto = ""
        let nomeregiao = ""
        let nomeCompeticao = ""
        data.forEach( desporto => {
                console.log(desporto);
                regioes = desporto.regioes
                nomedesporto=desporto.nome
                regioes.forEach(reg=>{
                        nomeregiao=reg.nome
                        competicoes=reg.competicoes
                        competicoes.forEach(comp=>{
                            if(comp.id_competicao.toString()===this.state.id_competicao.toString()){
                                nomeCompeticao = comp.nome
                                fases = comp.fases
                            }
                        })
                });
    
        });
        
        let nomeExiste = false
        fases.forEach(fase=>{
            if(fase.nome.toUpperCase()===this.state.nome.toUpperCase()){
                console.log("existe "+fase.nome);
                nomeExiste = true
            }
        })
        
        return (
            <div>
                <div className="ui column stackable center page grid">
                    <div className="seven wide column">
                        <div className="ui container center aligned">
                            <Header style={{marginTop: "15px"}} color='orange' as='h2'>Fases de {nomeCompeticao} de {nomeregiao} de {nomedesporto}</Header>
                        </div>
                        <div className="ui stacked segment center aligned">
                            <div className="ui list">
                                {fases.map(fase => ( 
                                    <div className="item" key={fase.id_fase}>
                                        <div className="content">
                                            <Header color={'olive'}>{fase.nome}</Header>
                                            <div className="description"> </div>
                                        </div>
                                        <hr></hr>
                                    </div>
                                ))}
                                <div>
                                <div className="ui right labeled input" >
                                    <div className="ui basic label center">=></div>
                                    <input type="text" placeholder="Nome da Nova Fase"  onChange={({target: {value}}) => this.saveNome(value) } />
                                </div>
                                <button  disabled={ this.state.nome==="" || nomeExiste} className="ui button" onClick = {() => this.CriarFase() }  >
                                            Adicionar Fase
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FasesDiv;