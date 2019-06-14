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
            id_desporto:"-1",
            id_regiao:"-1",
            id_competicao:"-1",
            id_fase: "-1",
            action:-1,
            titulo:""
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
                            key: comp.nome + "/"+comp.id_competicao,
                            label: comp.nome,
                            nodes: FasesBar,
                        })
                    }
                })
                if(CompeticoesBar.length>0){
                    regioesBar.push({
                        key: regiao.nome + "/"+regiao.id_regiao ,
                        label: regiao.nome,
                        nodes: CompeticoesBar,
                    })
                }
            })
            if(regioesBar.length>0){
                sidebar.push({
                    key: desporto.nome + "/"+desporto.id_desporto ,
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
        console.log("propsParent:");
        console.log(props.parent);
        let splittedParent =props.parent.split('/')
        let key_parent = splittedParent[splittedParent.length-1]
        console.log("Key Parent:");
        console.log(key_parent);
        
        let splitted =key.split('/')
        key = splitted[splitted.length-1]
        console.log("Key");
        console.log(key);
        console.log(splitted);
        let titulo = ""
        let text = true
        splitted.forEach(elem=>{
            if(text)  titulo+= titulo!=="" ? " → " + elem : elem
            text = !text
        })
            
        console.log(titulo);
        
        switch(props.level){
            case 0 :  {
                this.setState({
                    action:0,
                    id_desporto:key,
                    titulo:titulo
                });
                break;
            }
            case 1 :  {
                
                this.setState({
                    action:1,   
                    id_desporto:key_parent,
                    id_regiao:key,
                    titulo:titulo
                });
                
                break;
            }
            case 2 :  {
                
                this.setState({
                    action:2,
                    id_competicao:key,
                    titulo:titulo
                });
                break;
            }
            case 3 :  {
                
                this.setState({
                    action:3,
                    id_fase:key,
                    id_competicao : key_parent,
                    titulo:titulo
                });
                break;
            }
            default:{

            }
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
                            this.changeFase(props,key)
                        }}
                        hasSearch={false}
                    />
                </div>
                <div className="twelve wide column">        
                    <EventosDiv data={
                        {
                            id_desporto:this.state.id_desporto,
                            id_regiao:this.state.id_regiao,
                            id_competicao:this.state.id_competicao,
                            id_fase: this.state.id_fase,
                            action:this.state.action
                        }
                    } history={this.props.history} titulo={this.state.titulo}  />
                </div>
            </div>
        );
    }
}

export default Eventos;