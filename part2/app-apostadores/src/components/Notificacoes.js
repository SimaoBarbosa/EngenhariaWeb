import React, {Component} from 'react';
import {Button, Header} from 'semantic-ui-react';
import { getNotificacoes, removerNotificacao } from './../services/Api';

class Notificacoes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
            error: '',
        };
    }

    componentDidMount(){

        getNotificacoes().then(response => {
            this.setState({notifications: response})
        })

    }

    delete(id_notificacao){
        console.log('ELIMINAR ' + id_notificacao)
        removerNotificacao(id_notificacao).then(response => {
            if (response.success){
                this.setState({
                    notifications: this.state.notifications.filter((n) => n.id_notificacao !== id_notificacao),
                    error: ''
                });
            } else {
                this.setState({
                    error: 'Ocorreu um erro'
                })
            }
        }).catch(err => {
            this.setState({
                error: 'Ocorreu um erro'
            })
        })

    }

    render() {
        return (
            <div className="ui stackable grid container center aligned">
                <div className="twelve wide column">
                    <Header style={{marginTop: "40px"}} color='orange' size='huge'>Notificações de apostas</Header>
                    <Header color='red' as='h4'>{this.state.error}</Header>
                    <div className="ui stacked segment left aligned">
                        <div className="ui list">

                            {(this.state.notifications.length > 0) ?
                                this.state.notifications.map((n) => 
                                    <div key={n.id_notificacao} className="item">
                                        <div className="right floated content">
                                            <Button icon='trash' onClick={() => this.delete(n.id_notificacao)}/>
                                        </div>
                                        <i className="bell icon"></i>
                                        <div className="content">
                                            {n.notificacao.includes("Ganhou") ?
                                                <Header color='green' as='h5'>Aposta ganha</Header> :
                                                <Header color='red' as='h5'>Aposta perdida</Header>
                                            }
                                            <div className="description">{n.notificacao}</div>
                                        </div>
                                    </div>
                                ) :
                                <Header color='grey' as='h2'>Sem notificações</Header>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notificacoes;