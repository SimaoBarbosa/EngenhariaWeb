import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import { getHistoricoEquipa } from '../services/Api';

class Historico extends Component {

    constructor(props) {
        super(props);

        this.state = {
            equipas: this.props.location.state.equipas,
        	data: []
        };
    }

    async componentDidMount(){
        await this.state.equipas.forEach(equipa => {
            getHistoricoEquipa(equipa.id_equipa).then(eventos => {
                eventos.forEach(evento => {
                	this.setState({
                		data: this.state.data.concat(evento)
                	})
                })
            })
        })
    }

    render() {
    	let titulo = "Histórico de "
    	this.state.equipas.forEach(equipa => {
    		titulo += equipa.nome + ', '
    	})
    	titulo = titulo.substring(0, titulo.length - 2);

    	// remove possible duplicates
    	const uniqueArray = this.state.data.filter((thing,index) => {
		  return index === this.state.data.findIndex(obj => {
		    return JSON.stringify(obj) === JSON.stringify(thing);
		  });
		});

        return (
            <div className="ui stackable grid container center aligned">
                <div className="twelve wide column">
                	<Header style={{marginTop: "40px"}} color='orange' size='huge'>{titulo}</Header>
	                <div className="ui stacked segment left aligned">
	                	<div className="ui list">
	                		{(uniqueArray.length > 0) ?
			                	uniqueArray.map(evento =>
			                		<div key={evento.id_evento} className="item">
				                		<Header color='orange' as='h3'>{evento.titulo}</Header>
				                		<Header color='grey' as='h4'>{evento.fase.competicao.nome}, {evento.fase.nome}</Header>
				                		<div key={evento.id_evento} className="item">
				                		<div className="right floated content">
	                                        <Header style={{marginTop: "-10px"}} color='grey' as='h5'>{evento.datahora.data} {evento.datahora.hora}</Header>
	                                    </div>
				                		<ul>
				                			{evento.apostas_disponiveis.map(aposta =>
				                				<div key={aposta.id_aposta_disponivel}>
				                				<li><b>{aposta.titulo}</b></li>
				                				{aposta.opcoes.map(opcao => 
				                					(opcao.id_opcao === aposta.resultado_final) &&
				                					<p key={opcao.id_opcao}>{opcao.opcao}</p>
				                				)}

				                				</div>
				                			)}
				                		</ul>
				                		</div>
				                	</div>
			                	) : <Header color='grey' as='h2'>Sem histórico</Header>
			                }
		                </div>
	                </div>
                </div>
            </div>
        );
    }
}

export default Historico;
