import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import { getApostasEmAberto, getApostasGanhas, getApostasPerdidas } from './../services/Api';

class Apostas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: [],
            win: [],
            lost: []
        };
    }

    /* 
    Aposta_Concreta:
        id_aposta_concreta
        id_aposta_disponivel
        id_opcao
        nome_aposta_disponivel
        nome_competicao
        nome_evento
        nome_opcao
        odd_fixada
        quantia
        resultado
        user_oid
    */

    componentDidMount(){

        getApostasEmAberto().then(response => {
            this.setState({open: response})
        })

        getApostasGanhas().then(response => {
            this.setState({win: response})
        })
        
        getApostasPerdidas().then(response => {
            this.setState({lost: response})
        })

    }

    render() {
        return (
            <div className="ui stackable grid container center aligned">
                <div className="twelve wide column">
                    <Header color='orange' as='h3' style={{marginTop: "10px"}}>Apostas em aberto</Header>
                    <div className="ui stacked segment left aligned">
                        <div className="ui list">

                            {(this.state.open.length > 0) ?
                                this.state.open.map((a) => 
                                    <div key={a.id_aposta_concreta} className="item">
                                        <div className="right floated content description">
                                            Possíveis ganhos: {a.quantia * a.odd_fixada} ESScoins
                                        </div>
                                        <i className="wait icon orange"></i>
                                        <div className="content">
                                            <Header color='orange' as='h5'>'{a.nome_evento}', aposta em '{a.nome_aposta_disponivel}'</Header>
                                            <div className="description">Valor apostado: {a.quantia} ESScoins, Opção: '{a.nome_opcao}', Odd: {a.odd_fixada}</div>
                                            <div className="description">Competição: '{a.nome_competicao}'</div>
                                        </div>
                                    </div>
                                ) :
                                <Header color='grey' size='h4'>Nada a mostrar</Header>
                            }
                        </div>
                    </div>
                    <Header color='green' as='h3'>Apostas ganhas</Header>
                    <div className="ui stacked segment left aligned">
                        <div className="ui list">

                            {(this.state.win.length > 0) ?
                                this.state.win.map((a) => 
                                    <div key={a.id_aposta_concreta} className="item">
                                        <div className="right floated content description">
                                            Valor ganho: {a.quantia * a.odd_fixada} ESScoins
                                        </div>
                                        <i className="check circle icon green"></i>
                                        <div className="content">
                                            <Header color='green' as='h5'>'{a.nome_evento}', aposta em '{a.nome_aposta_disponivel}'</Header>
                                            <div className="description">Valor apostado: {a.quantia} ESScoins, Opção: '{a.nome_opcao}', Odd: {a.odd_fixada}</div>
                                            <div className="description">Competição: '{a.nome_competicao}'</div>
                                        </div>
                                    </div>
                                ) :
                                <Header color='grey' size='h4'>Nada a mostrar</Header>
                            }

                        </div>
                    </div>
                    <Header color='red' as='h3'>Apostas perdidas</Header>
                    <div className="ui stacked segment left aligned">
                        <div className="ui list">

                            {(this.state.lost.length > 0) ?
                                this.state.lost.map((a) => 
                                    <div key={a.id_aposta_concreta} className="item">
                                        <div className="right floated content description">
                                            Ganhos perdidos: {a.quantia * a.odd_fixada} ESScoins
                                        </div>
                                        <i className="close circle icon red"></i>
                                        <div className="content">
                                            <Header color='red' as='h5'>'{a.nome_evento}', aposta em '{a.nome_aposta_disponivel}'</Header>
                                            <div className="description">Valor apostado: {a.quantia} ESScoins, Opção: '{a.nome_opcao}', Odd: {a.odd_fixada}</div>
                                            <div className="description">Competição: '{a.nome_competicao}'</div>
                                        </div>
                                    </div>
                                ) :
                                <Header color='grey' size='h4'>Nada a mostrar</Header>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Apostas;