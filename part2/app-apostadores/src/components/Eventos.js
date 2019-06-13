import React, {PureComponent} from 'react';
import {desportos, regioesFromDesporto, competicioesFromRegDesp, getFases} from '../services/Api'
import EventosDiv from '../small_components/EventosDiv'
import TreeMenu from 'react-simple-tree-menu'
import {Header} from 'semantic-ui-react';

class Eventos extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            sidebar_content:[],
            data:[],
            id_fase: "-1"
        };
    }

    treeMenuData(){
        const sidebar=[];
        this.state.data.forEach( desporto =>{
            let regioesBar = []
            if (!desporto.regioes) desporto.regioes = []
            desporto.regioes.forEach(regiao=>{
                let CompeticoesBar = []
                if (!regiao.competicoes) regiao.competicoes = []
                regiao.competicoes.forEach(comp=>{
                    let FasesBar = []
                    if (!comp.fases) comp.fases = []
                    comp.fases.forEach(fase=>{
                        FasesBar.push({
                            key: fase.nome + "/"+fase.id_fase,
                            label: fase.nome,
                            nodes: [],
                        

                        })
                        
                    })
                    if(FasesBar.length>0){
                        CompeticoesBar.push({
                            key: comp.nome,
                            label: comp.nome,
                            nodes: FasesBar,
                        })
                    }
                })
                if(CompeticoesBar.length>0){
                    regioesBar.push({
                        key: regiao.nome,
                        label: regiao.nome,
                        nodes: CompeticoesBar,
                    })
                }
            })
            if(regioesBar.length>0){
                sidebar.push({
                    key: desporto.nome,
                    label: desporto.nome,
                    nodes: regioesBar,
                })
            }
        } )
        this.setState({sidebar_content:sidebar})
    }
    
    componentDidMount(){
        
        desportos().then(desps =>{
            desps.forEach(d=>{ 
                regioesFromDesporto(d.id_desporto)
                .then(regioes=>{
                    regioes.regioes.forEach(reg=>{
                        competicioesFromRegDesp(reg.id_regiao,d.id_desporto)
                        .then( competicoes => {
                            competicoes.competicoes.forEach(comp=>{
                                getFases(comp.id_competicao)
                                .then(fases=>{
                                    comp.fases = fases.fases
                                    reg.competicoes =competicoes.competicoes
                                    d.regioes = regioes.regioes
                                    this.setState({data:desps})
                                    this.treeMenuData();
                                })
                            })
                        })
                    })
                })
            })
        })

        
    }

    changeFase(props,key){
        
        if(props.level===3){
            this.setState({id_fase:key});
            //console.log("ID_FASE Eventos:"+this.state.id_fase);
        }
    }

    render() {
        const sidebar_content=this.state.sidebar_content;
        
        //console.log(sidebar_content);
        
        return (
            <div className="ui grid">
        		<div className="four wide column">
        			<div className="ui container center aligned">
        				<Header style={{marginTop: "15px"}} color='orange' as='h2'>Procurar eventos</Header>
        				<h5>Procurar eventos pela categorização:</h5>
        				<p>Desporto → Região → Competição → Fase</p>
        			</div>
                    <TreeMenu 
                        data={sidebar_content} 
                        onClickItem={({ key, label, ...props }) => {
                            let splitted =key.split('/')
                            key = splitted[splitted.length-1]
                            this.changeFase(props,key)
                        }}
                        hasSearch={false}
                    />
                </div>
                <div className="twelve wide column">        
                    <EventosDiv id_fase={this.state.id_fase} history={this.props.history} />
                </div>
            </div>
        );
    }
}

export default Eventos;