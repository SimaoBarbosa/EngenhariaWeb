import React, {PureComponent} from 'react';
import {createEvento,getEquipasOfComp} from '../services/Api'
import {Redirect } from 'react-router-dom';
import {Button, Header,Popup} from 'semantic-ui-react';


class CriarEvento extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            id_fase:props.location.state.id_fase,
            id_competicao:props.location.state.id_competicao,
            redirect:false,
            equipas:[],
            equipasAdded : [],
            hora:"",
            data:"",
            nome:""

        };
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: "/", state: { } }} />
        }
    }
    
    componentWillReceiveProps(props) {
        if(props.id_fase.toString() !== this.props.id_fase.toString() || props.id_competicao.toString() !== this.props.id_competicao.toString() )
            this.setState({
                id_fase:props.id_fase,
                id_competicao : props.id_competicao
            })
    }
    
    componentDidMount(){
        console.log( "comp:"+this.state.id_competicao);
        getEquipasOfComp(this.state.id_competicao)
        .then(equipas=>{
            this.setState({equipas:equipas.equipas})
        })
        .catch( err=>   alert("Erro a carregar equipas de competicação : " + err))
    }

    addEquipa(equipa){
        const newname =  this.state.nome!=="" ?  this.state.nome + " x " +equipa.nome : equipa.nome
        const oldEquipasAdded = this.state.equipasAdded
        oldEquipasAdded.push(equipa)
        let filtered = this.state.equipas.filter(function(el) { return el.id_equipa !== equipa.id_equipa; }); 
        this.setState({
            equipas :  filtered,
            equipasAdded :  oldEquipasAdded ,
            nome : newname
        })
    }
    saveData(value){
        this.setState({
            data:value
        })
    }
    saveHora(value){
        this.setState({
            hora:value
        })
    }
    criarEvento(){
        const eqs = []
        this.state.equipasAdded.forEach(element => {
            eqs.push(element.id_equipa)
        });
        const body= {
            titulo : this.state.nome,
            fase : this.state.id_fase,
            data : this.state.data,
            hora: this.state.hora ,
            equipas:"[" +eqs.toString() +"]"
        }
        console.log("BODY");
        console.log(body);
        createEvento(body)
        .then(res=>{
            this.setState({redirect:true})
        })
        .catch(err=>alert(err))
    }
    render() {
        console.log("Equipas added");
        console.log(this.state.equipasAdded);
        
        
        return (
            <div>
                
                {this.renderRedirect()}
                <div className="ui stackable grid container center aligned">
                    <div className="nine wide column">
                        <Header style={{marginTop: "40px"}} color='orange' size='huge'>Equipas da Competiçao</Header>
                        <Header color='red' as='h4'>{this.state.error}</Header>
                        <div className="ui stacked segment left aligned">
                            <div className="ui list">

                                {this.state.equipas.map((equipa) => 
                                    <div key={equipa.id_equipa} className="item">
                                        <div className="right floated content">
                                        <Popup content="Adicionar equipa ao evento" trigger={
                                            <Button icon='add' color="orange" onClick={() => this.addEquipa(equipa)}/>
                                        }/>
                                        </div>
                                        <div className="content">
                                                <Header color='red' as='h3'>{equipa.nome}</Header>
                                            <div className="description"></div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui stackable grid container center aligned">
                    <div className="nine wide column">
                        <Header style={{marginTop: "40px"}} color='orange' size='huge'>Equipas adicionadas</Header>
                        <Header color='red' as='h4'>{this.state.error}</Header>
                        <div className="ui stacked segment center aligned">
                            <div className="ui list">

                                {this.state.equipasAdded.map((e) => 
                                    <div key={e.id_equipa} className="item">
                                        <div className="content">
                                                <Header color='red' as='h2'>{e.nome}</Header>
                                            <div className="description"></div>
                                        </div>
                                        
                                    <br></br>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="ui column stackable center page grid">
                    <div className="wide column">
                        <div hidden={this.state.id_fase<0}>
                            <div className="ui right labeled input" >
                                    <div className="ui basic label center">Data</div>
                                    <input type="date" placeholder="Data"  onChange={({target: {value}}) => this.saveData(value) } />
                            </div>
                            <div className="ui right labeled input" >
                                    <div className="ui basic label center">Hora</div>
                                    <input type="time" placeholder="Hora"  onChange={({target: {value}}) => this.saveHora(value) } />
                            </div>
                            <button disabled={this.state.nome==="" || this.state.data==="" ||this.state.hora===""||this.state.equipasAdded.length<2}
                                  className="ui black button" onClick = {() => this.criarEvento() }  >
                                        Criar Novo Evento
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CriarEvento;