import React, {Component} from 'react';
import { Container, Header } from 'semantic-ui-react';

class Eventos extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Container text={true} textAlign={'center'}>
                <Header>EVENTOS</Header>
                <Header>{this.props.location.pathname}</Header>
            </Container>
        );
    }
}

export default Eventos;