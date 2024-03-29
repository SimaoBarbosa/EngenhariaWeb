import React, {PureComponent} from 'react';
import {Header} from 'semantic-ui-react';
import {create_desporto} from '../services/Api'
class DesportosDiv extends PureComponent {

    constructor(props) {
        super(props);
        console.log("DesportoDiv");
        
        console.log(this.props.data)
        this.state = {
            data:this.props.data,
            nome:""
        };
    }
    
    componentWillReceiveProps(props) {
        if(props.data.toString() !== this.props.data.toString())
            this.setState({data:props.data})
    }

    componentDidMount(){
    }
    saveNome(value){
        this.setState({nome:value})
    }

    updateData(body){
        const data = this.state.data ?  this.state.data : []
        data.push(body)
        return data
    }
    
    criarDesporto(){
        const body= {
            nome : this.state.nome
        }
        console.log("BODY");
        console.log(body);
        create_desporto(body)
        .then(res=>{
            let data = this.updateData(res)
            
            console.log("DATA:");
            
            console.log(data);
            
            this.props.handleToUpdate(this.state.data)
            this.setState({
                data:data,
                nome:""
            })
        })
        .catch(err=>alert(err))
    }
    render() {
        
        let nomeExiste = false
        const data = this.state.data ?  this.state.data : []

        data.forEach(desporto=>{
            if(desporto.nome.toUpperCase()===this.state.nome.toUpperCase()){
                console.log("existe "+desporto.nome);
                nomeExiste = true
            }
        })


        return (
            <div>
                <div className="ui column stackable center page grid">
                    <div className="twelve wide column">
                        <div className="ui container center aligned">
                            <Header style={{marginTop: "15px"}} color='orange' as='h2'>Todos os Desportos</Header>
                        </div>
                        <div className="ui stacked segment center aligned">
                            <div className="ui list">
                                {data.map(desporto => ( 
                                    <div className="item" key={desporto.id_desporto}>
                                        <div className="content">
                                            <Header color={'olive'}>{desporto.nome}</Header>
                                            <div className="description"> </div>
                                        </div>
                                        <hr></hr>
                                    </div>
                                ))}
                                <div>
                                <div className="ui right labeled input" >
                                    <div className="ui basic label center">→</div>
                                    <input type="text" placeholder="Nome do Desporto" value={this.state.nome}  onChange={({target: {value}}) => this.saveNome(value) } />
                                </div>
                                <button  disabled={ this.state.nome==="" || nomeExiste} className="ui black button" onClick = {() => this.criarDesporto() }  >
                                            Criar Desporto
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