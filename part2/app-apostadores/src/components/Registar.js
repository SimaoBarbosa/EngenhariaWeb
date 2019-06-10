import React, {Component} from 'react';
import { Container, Header } from 'semantic-ui-react';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Container text={true} textAlign={'center'}>
                <Header>REGISTAR</Header>
                <Header>{this.props.location.pathname}</Header>
            </Container>
        );
    }
}

export default Login;