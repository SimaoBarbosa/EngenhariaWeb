import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import { tornarVIP } from './../services/Api';
import Authentication from "./Authentication";

class Vip extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            error: ''
        };
    }

    vip(){

        tornarVIP().then(async response => {
            console.log(response)
            if (response.success){
                this.setState({message: 'Já é um apostador VIP! A ser redirecionado...', error: ''})
                await Authentication.logout()
                sleep(3000).then(() => {
                    window.location.reload();
                    //this.props.history.push('/home');w
                })
            } else {
                this.setState({message: '', error: response.message})
            }
        })
    }

    render() {
        return (
            <div>
                <div className="ui stackable grid container center aligned">
                    <div className="twelve wide column">
                        <Header style={{marginTop: "40px"}} color='orange' as='h1'>Apostador VIP</Header>
                        <img 
                            className="ui small centered image"
                            src={require("../images/star.png")}
                            style={{marginBottom: "20px"}}
                            alt={"logo"}
                        />
                        <Header color='grey' as='h2'>Pode tornar-se VIP por apenas 50 ESScoins, para usufruir das seguintes ofertas:</Header>
                        <Header color='black' as='h3'>- Apostas exclusivas para apostadores VIP's</Header>
                        <Header color='black' as='h3'>- Consulta de históricos de apostas das equipas envolvidas num evento</Header>
                    </div>
                </div>
                <div className="ui stackable grid container center aligned">
                    <div className="five wide column">
                        <button
                            className="ui fluid button"
                            color="orange"
                            onClick={this.vip.bind(this)}
                        >TORNAR-ME VIP</button>
                        <Header color='green' as='h4'>{this.state.message}</Header>
                        <Header color='red' as='h4'>{this.state.error}</Header>
                    </div>
                </div>
            </div>

        );
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default Vip;