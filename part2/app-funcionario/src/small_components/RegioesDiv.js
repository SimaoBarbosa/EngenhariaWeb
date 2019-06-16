import React, {PureComponent} from 'react';
import {Header} from 'semantic-ui-react';
import {add_create_regiao} from '../services/Api'
class DesportosDiv extends PureComponent {

    constructor(props) {
        super(props);
        console.log("RegioesDiv");
        
        console.log(this.props.data)
        this.state = {
            data:this.props.data,
            id_desporto: this.props.id_desporto,
            nome:""
        };
    }
    
    componentWillReceiveProps(props) {
        if(props.data.toString() !== this.props.data.toString() || props.id_desporto.toString() !== this.props.id_desporto.toString())
            this.setState({
                id_desporto : props.id_desporto,
                data:props.data
            })
    }

    componentDidMount(){
    }
    saveNome(value){
        this.setState({nome:value})
    }

    updateData(body){
        const data = this.state.data ?  this.state.data : []
        data.forEach( desporto => {
            if(desporto.id_desporto.toString() === this.state.id_desporto.toString()){
                desporto.regioes.push(body)
            }
                
        });
        return data
    }
    criarRegiao(){
        const body= {
            nome : this.state.nome,
            desporto: this.state.id_desporto
        }
        console.log("BODY");
        console.log(body);
        add_create_regiao(body)
        .then(res=>{
            console.log("Request response=>")
            console.log(res);
            
            let data = this.updateData(res)
            
            console.log("DATA:");
            
            console.log(data);
            
            this.props.handleToUpdate(this.state.data)
            this.setState({
                data:data,
                nome:""
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render() {
        const data = this.state.data ?  this.state.data : []
        let regioes = []
        let nomedesporto = ""
        data.forEach( desporto => {
            if(desporto.id_desporto.toString() === this.state.id_desporto.toString()){
                console.log(desporto);
                
                regioes = desporto.regioes
                nomedesporto=desporto.nome
            }
                
        });

        let nomeExiste = false
        regioes.forEach(regiao=>{
            if(regiao.nome.toUpperCase()===this.state.nome.toUpperCase()){
                console.log("existe "+regiao.nome);
                nomeExiste = true
            }
        })
        
        return (
            <div>
                <div className="ui column stackable center page grid">
                    <div className="twelve wide column">
                        <div className="ui container center aligned">
                            <Header style={{marginTop: "15px"}} color='orange' as='h2'>Regiões de {nomedesporto}</Header>
                        </div>
                        <div className="ui stacked segment center aligned">
                            <div className="ui list">
                                {regioes.map(regiao => ( 
                                    <div className="item" key={regiao.id_regiao}>
                                        <div className="content">
                                            <Header color={'olive'}>{regiao.nome}</Header>
                                            <div className="description"> </div>
                                        </div>
                                        <hr></hr>
                                    </div>
                                ))}
                                <div>
                                <div className="ui right labeled input" >
                                    <div className="ui basic label center">→</div>
                                    <input type="text" placeholder="Nome da Região" value={this.state.nome}  onChange={({target: {value}}) => this.saveNome(value) } />
                                </div>
                                <button  disabled={ this.state.nome==="" || nomeExiste} className="ui black button" onClick = {() => this.criarRegiao() }  >
                                            Adicionar Região
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

export default DesportosDiv;