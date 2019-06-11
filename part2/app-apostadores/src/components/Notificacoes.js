import React, {Component} from 'react';

class Notificacoes extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="ui column stackable center page grid">
                <div className="twelve wide column">
                    <div className="ui stacked segment left aligned">
                    <div className="ui list">
                    <div className="item">
                        <i className="bell icon"></i>
                        <div className="content">
                            <div className="header">Floated Icon</div>
                            <div className="description">This text will always have a left margin to make sure it sits alongside your icon</div>
                        </div>
                    </div>
                    <div className="item">
                        <i className="bell icon"></i>
                        <div className="content">
                            <div className="header">Icon Alignment</div>
                            <div className="description">Floated icons are by default top aligned. To have an icon top aligned try this example.</div>
                        </div>
                    </div>
                    <div className="item">
                        <i className="bell icon"></i>
                        <div className="content">
                            <div className="header">Floated Icon</div>
                            <div className="description">This text will always have a left margin to make sure it sits alongside your icon</div>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notificacoes;