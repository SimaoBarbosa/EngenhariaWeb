import React, {PureComponent} from 'react';
import { Table , TableCell, TableRow,TableBody} from 'semantic-ui-react';
import {desportos, regioesFromDesporto, competicioesFromRegDesp,getFases} from '../services/Api'
import EventosDiv from '../small_components/EventosDiv'
import TreeMenu from 'react-simple-tree-menu'
class Eventos extends PureComponent {

    constructor(props) {
        super(props);
        /*
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let id_fase = params.get('idFase');
        if(!id_fase) id_fase=-1
        */
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
            console.log("ID_FASE Eventos:"+this.state.id_fase);
        }
    }

    render() {
        const sidebar_content=this.state.sidebar_content;
        
        console.log(sidebar_content);
        
        
        return (
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell style={ {maxWidth: "10px"}}   textAlign={'left'} verticalAlign={'top'} >
                        <TreeMenu 
                            data={sidebar_content} 
                            onClickItem={({ key, label, ...props }) => {
                                let splitted =key.split('/')
                                key = splitted[splitted.length-1]
                                this.changeFase(props,key)
                              }}
                        />
                        </TableCell >
                        <TableCell style={ {maxWidth: "90px"}}  textAlign={'center'} verticalAlign={'top'} >
                            <EventosDiv id_fase={this.state.id_fase} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

export default Eventos;