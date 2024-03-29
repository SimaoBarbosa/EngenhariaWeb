import React, {Component} from 'react';
import { Header,Popup,Button } from 'semantic-ui-react';
import { getTodasCompeticoes, getTodasEquipas } from './../services/Api';
import _ from 'lodash';

class Equipas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            competicoes: [],
            competicoes_f: [],
            equipas: [],
            equipas_f: [],
            text_c: '',
            text_e: '',
            redirectE: false,
            redirectH: false,
            equipa: {},
            id_competicao:-1
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

        const eq = _.filter(this.state.equipas, e => {
            return this.contains(e, text);
        });


        this.setState({
            text_e: text,
            equipas_f: eq
        });
    }

    equipasC = (equipas,id_competicao) => {
        this.setState({
            equipas_f: equipas,
            id_competicao: id_competicao
        })
    }

    render() {

        if (this.state.redirectE){
            //return <Redirect to={{ pathname: "/eventos_equipa", state: {equipa: this.state.equipa}}} />
            this.props.history.push( "/eventos_equipa", {equipa: this.state.equipa} )
        }

        if (this.state.redirectH){
            // return <Redirect to={{ pathname: "/historico"}}/>
            this.props.history.push( "/historico", {equipas: [this.state.equipa]})
        }

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
                                    <div key={c.id_competicao} className="item">
                                        <div className="right floated content">

                                            <button
                                                className="ui right labeled icon button"
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
                        <div className="ui animated middle aligned divided list">
                            
                            {(this.state.equipas_f.length > 0) ?
                                this.state.equipas_f.map((e) =>
                                    <div key={e.id_equipa} className="item">
                                        <div className="right floated content">
                                        <Popup content="Ver histórico de resultados" trigger={
                                            <Button 
                                                className="ui icon button"
                                                icon="history"  
                                                disabled={(localStorage.getItem('userType') === 'normal')}
                                                onClick={() => this.setState({
                                                    equipa: e,
                                                    redirectH: true
                                                })}
                                            />
                                        }/>
                                            <button
                                                className="ui orange right labeled icon button"
                                                onClick={() => this.setState({
                                                    equipa: e,
                                                    redirectE: true
                                                })}
                                            >
                                                <i className="angle right icon"></i>
                                                Eventos
                                            </button>

                                        </div>
                                        <div className="content">
                                          <Header as='h3'>{e.nome}</Header>
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