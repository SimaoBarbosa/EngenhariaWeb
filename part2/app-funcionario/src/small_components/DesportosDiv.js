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

    criarDesporto(){
        const body= {
            nome : this.state.nome
        }
        console.log("BODY");
        console.log(body);
        create_desporto(body)
        .then(res=>{
            window.location.reload();
        })
        .catch(err=>alert(err))
    }
    render() {
        const data = this.state.data ?  this.state.data : []
        
        return (
            <div>
                <div className="ui column stackable center page grid">
                    <div className="seven wide column">
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
                                    <div className="ui basic label center">=></div>
                                    <input type="text" placeholder="Nome do Desporto"  onChange={({target: {value}}) => this.saveNome(value) } />
                                </div>
                                <button  disabled={ this.state.nome===""} className="ui button" onClick = {() => this.criarDesporto() }  >
                                            Criar Desporto
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ui right labeled input" >
                        <div className="ui basic label center">=></div>
                        <input type="text" placeholder="Nome do Evento"  onChange={({target: {value}}) => this.saveNome(value) } />
                    </div>
                    <button  disabled={ this.state.nome===""} className="ui button" onClick = {() => this.CriarEvento() }  >
                                Criar Novo Evento
                </button>
                </div>
                
            </div>
        );
    }
}

export default DesportosDiv;