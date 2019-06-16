import React, {Component} from 'react';
import { Header ,Popup,Button} from 'semantic-ui-react';
import { getTodasCompeticoes, getTodasEquipas,addEquipaComp ,createTeam,remEquipaComp} from './../services/Api';
import _ from 'lodash';

//id_comp id_team
class Equipas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            competicoes: [],
            competicoes_f: [],
            equipas: [],
            equipas_f: [],
            equipas_not_c:[],
            equipas_in_c: [],
            text_c: '',
            text_e: '',
            equipa: {},
            adicionar :false,
            verEquipas:false,
            id_competicao:-1,
            nome_equipa : ""
        }
    }

    // equipas
    // id_competicao
    // nome

    // id_equipa
    // nome

    componentDidMount(){
        getTodasCompeticoes().then(result => {
            this.setState({
                competicoes: result,
                competicoes_f: result
            })
        })
        getTodasEquipas().then(result => {
            this.setState({
                equipas: result,
                equipas_f: result
            })
        })
    }

    contains = ({nome}, text) => {

        // case insensitive
        return nome.toUpperCase().includes(text.toUpperCase());
    };

    changeFilterC = (text) => {

        const comp = _.filter(this.state.competicoes, comp => {
            return this.contains(comp, text);
        });


        this.setState({
            text_c: text,
            competicoes_f: comp
        });
    }

    changeFilterE = (text) => {
        
        let equipas = this.state.equipas
        if (this.state.adicionar)
            equipas=this.state.equipas_not_c
        else if (this.state.verEquipas)
            equipas=this.state.equipas_in_c
        const eq = _.filter(equipas, e => {
            return this.contains(e, text);
        });


        this.setState({
            text_e: text,
            equipas_f: eq
        });
    }

    equipasC = (equipas,id_competicao) => {
        if(!equipas) equipas = []
        this.setState({
            equipas_in_c: equipas,
            equipas_f:equipas,
            adicionar:false,
            verEquipas:true,
            id_competicao:id_competicao
        })
    }
    equipasNotC = (equipasC,id_competicao)=>{
        if(!equipasC) equipasC=[]
        let equipas_not_c=[]
        this.state.equipas.forEach(equipa=>{
            let contains=false

            equipasC.forEach(eqC=>{
                if(equipa.id_equipa===eqC.id_equipa){
                    contains=true
                }
            })
            if(!contains) equipas_not_c.push(equipa)
        })
        this.setState({
            equipas_not_c:equipas_not_c,
            equipas_f:equipas_not_c,
            adicionar:true,
            verEquipas:false,
            id_competicao:id_competicao
        })
    }
    removeEquipa(equipa,id_competicao){
        remEquipaComp(id_competicao,equipa.id_equipa)
        .then(res=>console.log("Sucess: "+res))
        .catch(err=>console.log("ERRO:"+err))
        let allComps = this.state.competicoes
        allComps.forEach(comp=>{
            if(comp.id_competicao===id_competicao)
            if(!comp.equipas) comp.equipas = []
            var filteredEquipasComp = comp.equipas.filter(function(el) { return el.id_equipa !== equipa.id_equipa; }); 
            comp.equipas = filteredEquipasComp
        })
        let equipas_f = this.state.equipas_f
        let filteredInF = equipas_f.filter(function(el) { return el.id_equipa !== equipa.id_equipa; }); 
        if (!filteredInF ) filteredInF = []
        let filteredIn = this.state.equipas_in_c.filter(function(el) { return el.id_equipa !== equipa.id_equipa; }); 
        if (!filteredIn ) filteredIn = []
        this.setState({
            competicoes:allComps,
            equipas_f : filteredInF,
            equipas_in_c:filteredIn
        })
    }


    addEquipa(equipa,id_competicao){
        addEquipaComp(id_competicao,equipa.id_equipa)
        .then(res=>console.log("Sucess :"+res))
        .catch(err=>console.log("ERRO:"+err))
        let allComps = this.state.competicoes
        allComps.forEach(comp=>{
            if(!comp.equipas) comp.equipas = []
            if(comp.id_competicao===id_competicao)
                comp.equipas.push(equipa)
        })
        let equipas_f = this.state.equipas_f
        let filteredNot = this.state.equipas_not_c.filter(function(el) { return el.id_equipa !== equipa.id_equipa; });
        let filteredNotF = equipas_f.filter(function(el) { return el.id_equipa !== equipa.id_equipa; }); 
        if (!filteredNot ) filteredNot = []
        if (!filteredNotF ) filteredNotF = []
        this.setState({
            competicoes:allComps,
            equipas_f : filteredNotF,
            equipas_not_c:filteredNot
        })
    }

    criarEquipa(){
        const body={
            equipa:this.state.nome_equipa,
            competicoes:"[]"
        }
        createTeam(body)
        .then(newteam=>{
            let equipas = this.state.equipas
            equipas.push(newteam)
            this.setState({
                equipas:equipas,
                adicionar:false,
                verEquipas:false,
                nome_equipa:""
            })
            
        })
        .catch(err=>console.log("erro:"+err))

    }

    render() {
        let equipaNomeExiste = false
        
        const equipa = this.state.nome_equipa
        const allEquipas = this.state.equipas
        allEquipas.forEach(eq=>{
            if(eq.nome.toUpperCase()===equipa.toUpperCase()){
                console.log("existe "+eq.nome);
                equipaNomeExiste = true
            }
        })

        return (
            <div className="ui stackable grid container center aligned">
                <div className="eight wide column">
                    <Header style={{marginTop: "20px"}} color='orange' as='h3'>Procurar competição</Header>
                    <div className="ui icon input">
                        <input 
                            className="prompt"
                            type="text"
                            placeholder="Procurar competição..."
                            value={this.state.text_c}
                            onChange={({ target: {value}}) => this.changeFilterC(value)}
                        />
                        <i className="search icon"></i>
                    </div>
                    <div className="ui stacked segment left aligned">
                        <div className="ui animated middle aligned divided list">
                            
                            {(this.state.competicoes_f.length > 0) ?
                                this.state.competicoes_f.map((c) =>
                                    <div key={c.id_competicao} className="ui  item " >
                                        <div className="right floated content">
                                            <button
                                                className="ui right labeled icon orange button"
                                                onClick={() => this.equipasNotC(c.equipas,c.id_competicao)}
                                            >
                                                <i className="add icon"></i>
                                                Adicionar
                                            </button>
                                            <button
                                                className="ui right labeled icon black button"
                                                onClick={() => this.equipasC(c.equipas,c.id_competicao)}
                                            >
                                                <i className="angle right icon"></i>
                                                Ver equipas
                                            </button>
                                            
                                        </div>
                                        { this.state.id_competicao===c.id_competicao ?
                                        <div className="content">
                                          <Header as='h2' color="black">{c.nome}</Header>
                                        </div>
                                        :
                                        <div className="content">
                                          <Header as='h4' color="grey">{c.nome}</Header>
                                        </div>
                                        }
                                    </div>
                                ) :
                                <Header color='grey' as='h3'>Sem competições</Header>
                            }

                        </div>

                    </div>
                </div>
                <div className="eight wide column">
                    <Header style={{marginTop: "20px"}} color='orange' as='h3'>Procurar equipa</Header>
                    <div className="ui icon input">
                        <input 
                            className="prompt"
                            type="text" 
                            placeholder="Procurar equipa..."
                            value={this.state.text_e}
                            onChange={({ target: {value}}) => this.changeFilterE(value)}
                        />
                        <i className="search icon"></i>
                    </div>
                    <div className="ui stacked segment left aligned">
                    <div>
                        <div className="ui right labeled input" >
                            <div className="ui basic label orange center">→</div>
                            <input type="text" placeholder="Nome da Equipa" onChange={({target: {value}}) => this.setState({ nome_equipa:value}) } />
                        </div>
                        <Popup content="Criar Equipa sem competições" trigger={
                        <Button  disabled={ this.state.nome_equipa==="" || equipaNomeExiste} className="ui orange button" onClick = {() => this.criarEquipa() }  >
                                    Criar Equipa
                        </Button>
                        }/>
                    </div>
                        <div className="ui animated middle aligned divided list">
                            
                            {(this.state.equipas_f.length > 0) ?
                                this.state.equipas_f.map((e) =>
                                    <div key={e.id_equipa} className="item">
                                        <div className="right floated content">
                                        {(!this.state.verEquipas) ?
                                            <Popup content="Adicionar equipa à competição" trigger={
                                                <Button
                                                    disabled={!this.state.verEquipas && !this.state.adicionar}
                                                    icon="add"
                                                    className="ui orange add icon button"
                                                    onClick={() => this.addEquipa(
                                                        e,
                                                        this.state.id_competicao
                                                    )}
                                                />
                                            }/>
                                            :
                                            <button
                                                disabled={!this.state.verEquipas && !this.state.adicionar}
                                                className="ui red add icon button"
                                                onClick={() => this.removeEquipa(
                                                    e,
                                                    this.state.id_competicao
                                                )}
                                            >
                                                <i className="remove icon"></i> 
                                            </button>
                                        }
                                        </div>
                                        <div className="content">
                                          <Header as='h4'>{e.nome}</Header>
                                        </div>
                                    </div>
                                ) :
                                <Header color='grey' as='h3'>Sem equipas</Header>
                            }

                        </div>

                    </div>
                </div>
                
            </div>
        );
    }
}

export default Equipas;