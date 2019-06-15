import React, {PureComponent} from 'react';
import {Header} from 'semantic-ui-react';
import {createCompeticao} from '../services/Api'
class CompsDiv extends PureComponent {

    constructor(props) {
        super(props);
        console.log("CompsDiv");
        
        console.log(this.props.data)
        this.state = {
            data:this.props.data,
            id_desporto: this.props.id_desporto,
            id_regiao :  this.props.id_regiao,
            nome:""
        };
    }
    
    componentWillReceiveProps(props) {
        if(props.data.toString() !== this.props.data.toString() || props.id_desporto.toString() !== this.props.id_desporto.toString() || props.id_regiao.toString() !== this.props.id_regiao.toString())
            this.setState({
                id_desporto : props.id_desporto,
                id_regiao : props.id_regiao,
                data:props.data
            })
    }

    componentDidMount(){
    }
    saveNome(value){
        this.setState({nome:value})
    }

    criarCompeticao(){
        const body= {
            nome : this.state.nome,
            desporto: this.state.id_desporto,
            regiao: this.state.id_regiao
        }
        console.log("BODY");
        console.log(body);
        createCompeticao(body)
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
        let nomedesporto = ""
        let nomeregiao = ""
        data.forEach( desporto => {
            if(desporto.id_desporto.toString() === this.state.id_desporto.toString()){
                console.log(desporto);
                regioes = desporto.regioes
                nomedesporto=desporto.nome
                regioes.forEach(reg=>{
                    if(reg.id_regiao.toString() === this.state.id_regiao.toString()){
                        nomeregiao=reg.nome
                        competicoes=reg.competicoes
                    }
                })
            }
                
        });

        let nomeExiste = false
        competicoes.forEach(comp=>{
            if(comp.nome.toUpperCase()===this.state.nome.toUpperCase()){
                console.log("existe "+comp.nome);
                nomeExiste = true
            }
        })
        
        return (
            <div>
                <div className="ui column stackable center page grid">
                    <div className="seven wide column">
                        <div className="ui container center aligned">
                            <Header style={{marginTop: "15px"}} color='orange' as='h2'>Competições de {nomeregiao} de {nomedesporto}</Header>
                        </div>
                        <div className="ui stacked segment center aligned">
                            <div className="ui list">
                                {competicoes.map(comp => ( 
                                    <div className="item" key={comp.id_competicao}>
                                        <div className="content">
                                            <Header color={'olive'}>{comp.nome}</Header>
                                            <div className="description"> </div>
                                        </div>
                                        <hr></hr>
                                    </div>
                                ))}
                                <div>
                                <div className="ui right labeled input" >
                                    <div className="ui basic label center">→</div>
                                    <input type="text" placeholder="Nome da Competição"  onChange={({target: {value}}) => this.saveNome(value) } />
                                </div>
                                <button  disabled={ this.state.nome==="" || nomeExiste} className="ui black button" onClick = {() => this.criarCompeticao() }  >
                                            Adicionar Competição
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

export default CompsDiv;