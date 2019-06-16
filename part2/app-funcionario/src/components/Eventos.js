import React, {PureComponent} from 'react';
import {desportos, regioesFromDesporto, competicioesFromRegDesp, getFases} from '../services/Api'
import EventosDiv from '../small_components/EventosDiv'
import FasesDiv from '../small_components/FasesDiv'
import RegioesDiv from '../small_components/RegioesDiv'
import DesportosDiv from '../small_components/DesportosDiv'
import CompsDiv from '../small_components/CompsDiv'
import TreeMenu from 'react-simple-tree-menu'
import {Header} from 'semantic-ui-react';

class Eventos extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            hideEventos : false,
            hideDesportos: true,
            hideRegioes: true,
            hideComps: true,
            hideFases: true,
            sidebar_content:[],
            data:[],
            id_fase: -1,
            id_desporto:-1,
            id_regiao : -1,
            id_competicao : -1,
            update:0
        };
    }
    handleToUpdate = (data) => {
        console.log('We pass data from Child to Parent');
        console.log(data);
        
        this.setState({
            data:data,
            update: this.state.update+1
        })
    }
    treeMenuData(){
        const sidebar=[];
        this.state.data.forEach( desporto =>{
            let regioesBar = []
            if (!desporto.regioes) {
                desporto.regioes = []
                
            }
            desporto.regioes.forEach(regiao=>{
                let CompeticoesBar = []
                if (!regiao.competicoes){
                     regiao.competicoes = []
                }
                regiao.competicoes.forEach(comp=>{
                    let FasesBar = []
                    if (!comp.fases){
                         comp.fases = []
                    }
                    comp.fases.forEach(fase=>{
                        FasesBar.push({
                            key: fase.nome + "/"+fase.id_fase,
                            label: fase.nome,
                            nodes: [],
                        

                        })
                        
                    })
                    if(FasesBar.length>=0){
                        CompeticoesBar.push({
                            key: comp.nome + "/"+comp.id_competicao,
                            label: comp.nome,
                            nodes: FasesBar,
                        })
                    }
                })
                if(CompeticoesBar.length>=0){
                    regioesBar.push({
                        key: regiao.nome + "/"+regiao.id_regiao ,
                        label: regiao.nome,
                        nodes: CompeticoesBar,
                    })
                }
            })
            if(regioesBar.length>=0){
                sidebar.push({
                    key: desporto.nome + "/"+desporto.id_desporto ,
                    label: desporto.nome,
                    nodes: regioesBar,
                })
            }
        } )
        return sidebar
    }
    
    componentDidMount(){
        
        desportos().then(desps =>{
            desps.forEach(d=>{ 
                regioesFromDesporto(d.id_desporto)
                .then(regioes=>{
                    d.regioes=regioes.regioes
                    regioes.regioes.forEach(reg=>{
                        competicioesFromRegDesp(reg.id_regiao,d.id_desporto)
                        .then( competicoes => {
                            reg.competicoes =competicoes.competicoes
                            competicoes.competicoes.forEach(comp=>{
                                getFases(comp.id_competicao)
                                .then(fases=>{
                                    comp.fases = fases.fases
                                    this.setState({data:desps})
                                    let sidebar =this.treeMenuData();
                                    this.setState({sidebar_content:sidebar})
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
        console.log("Key");
        console.log(key);
        
        
        
        
        switch(props.level){
            case 0 :  {
                this.setState({
                    hideEventos :true,
                    hideDesportos: true,
                    hideRegioes: false,
                    hideComps: true,
                    hideFases: true,
                    id_desporto:key,
                });
                break;
            }
            case 1 :  {
                
                this.setState({
                    hideEventos :true,
                    hideDesportos: true,
                    hideRegioes: true,
                    hideComps: false,
                    hideFases: true,
                    id_desporto:key_parent,
                    id_regiao:key
                });
                
                break;
            }
            case 2 :  {
                
                this.setState({
                    hideEventos :true,
                    hideDesportos: true,
                    hideRegioes: true,
                    hideComps: true,
                    hideFases: false,
                    id_competicao:key,
                });
                break;
            }
            case 3 :  {
                
                this.setState({
                    hideEventos :false,
                    hideDesportos: true,
                    hideRegioes: true,
                    hideComps: true,
                    hideFases: true,
                    id_fase:key,
                    id_competicao : key_parent
                });
                break;
            }
            default:{

            }
        }
    }

    render() {
        
        const sidebar_content= this.treeMenuData()

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
                    <div className="ui container center aligned">
                        <button disabled={!this.state.hideDesportos }className="ui black button" 
                        onClick = {() => {
                            this.setState({
                                hideEventos :true,
                                hideDesportos: false,
                                hideRegioes: true,
                                hideComps: true,
                                hideFases: true,
                            })
                        }}>
                            Criar Desporto
                        </button>
                    </div>
                </div>
                    <div className="twelve wide column" >  
                    <div hidden={this.state.hideEventos} >   
                        <EventosDiv id_fase={this.state.id_fase} id_competicao={this.state.id_competicao}  history={this.props.history}/>
                    </div>
                    <div hidden={this.state.hideDesportos} >   
                        <DesportosDiv data={this.state.data} handleToUpdate = {this.handleToUpdate}/>
                    </div>
                    <div hidden={this.state.hideRegioes} >   
                        <RegioesDiv id_desporto={this.state.id_desporto}  data={this.state.data} handleToUpdate = {this.handleToUpdate}/>
                    </div>
                    <div hidden={this.state.hideComps} >    
                        <CompsDiv id_regiao={this.state.id_regiao} id_desporto={this.state.id_desporto} data={this.state.data} handleToUpdate = {this.handleToUpdate}   history={this.props.history}/>
                    </div> 
                    <div hidden={this.state.hideFases} >   
                        <FasesDiv id_competicao={this.state.id_competicao} data={this.state.data} handleToUpdate = {this.handleToUpdate}/>
                    </div> 
                </div>
            </div>
        );
    }
}

export default Eventos;