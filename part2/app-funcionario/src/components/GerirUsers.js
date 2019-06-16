import React, {Component} from 'react';
import { Button, Header,Popup } from 'semantic-ui-react';
import {allApostadores,removeUser,makeUserVip,makeUserNormal} from '../services/Api'
class GerirUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users:[],
            vips:[],
            normais:[],
            searchtext :""
        };
    }

    componentDidMount(){
        allApostadores()
        .then(users=>{
            const vips = this.state.vips
            const normais = this.state.normais
            users.forEach(user => {
                if(user.group===3)
                    vips.push(user)
                else
                    normais.push(user)
            });
            
            this.setState({
                users : users,
                vips :vips,
                normais :normais
            })
        })
        .catch(err=>console.log("erro a carregar users "+ err))
        
    }
    delete(id){
        removeUser(id)
        .then(res=>{
            console.log(res);
            let filteredUsers = this.state.users.filter(function(el) { return el.oid !== id; });
            let filteredNormais = this.state.normais.filter(function(el) { return el.oid !== id; }); 
            let filteredVips = this.state.vips.filter(function(el) { return el.oid !== id; }); 
            this.setState({
                users:filteredUsers,
                vips:filteredVips,
                normais:filteredNormais
            })
            
        })
        .catch(err=>alert(err))
    }
    makeVip(user){
        makeUserVip(user.oid)
        .then(res=>{
            console.log(res);
            let vips =this.state.vips
            vips.push(user)
            let filteredNormais = this.state.normais.filter(function(el) { return el.oid !== user.oid; }); 
            this.setState({
                vips:vips,
                normais:filteredNormais
            })
        })
        .catch(err=>alert(err))
    }
    makeNormal(user){
        makeUserNormal(user.oid)
        .then(res=>{
            console.log(res);
            let normais =this.state.normais
            normais.push(user)
            let filteredVips = this.state.vips.filter(function(el) { return el.oid !== user.oid; }); 
            this.setState({
                vips:filteredVips,
                normais:normais
            })
        })
        .catch(err=>alert(err))
    }

    changeFilter(value){
        this.setState({searchtext:value})
    }
    render() {
        const vips=[]
        const normais = []
        const filter = this.state.searchtext
        this.state.vips.forEach(user=>{
            if( user.username.toUpperCase().includes(filter.toUpperCase())  ||
                user.email.toUpperCase().includes(filter.toUpperCase()) 
            )
            vips.push(user)
        })
        this.state.normais.forEach(user=>{
            if( user.username.toUpperCase().includes(filter.toUpperCase())  ||
                user.email.toUpperCase().includes(filter.toUpperCase()) 
            )
            normais.push(user)
        })

        return (
            <div>
                <br></br><br></br>
                <div className="ui stackable  container center aligned">
                    <div className="ui icon input">
                        <input 
                            className="prompt"
                            type="text"
                            placeholder="Procurar utilizador ..."
                            value={this.state.searchtext}
                            onChange={({ target: {value}}) => this.changeFilter(value)}
                        />
                        <i className="search icon"></i>
                    </div>
                </div>
                <div className="ui stackable grid container center aligned">
                    <div className="twelve wide column">
                        <Header style={{marginTop: "40px"}} color='orange' size='huge'>Utilizadores Normais</Header>
                        <div className="ui stacked segment left aligned">
                            <div className="ui animated list">
                                    {
                                        normais.map((user) => 
                                            <div key={user.oid} className="item">
                                                <div className="right floated content">
                                                    <Popup content="Apagar utilizador" trigger={
                                                        <Button icon='trash' onClick={() => this.delete(user.oid)}/>}/>
                                                </div>
                                                <div className="right floated content">
                                                    <Popup content="Tornar VIP" trigger={
                                                        <Button icon="star" color="orange" onClick={() => this.makeVip(user)}/>}/>
                                                </div>
                                                <div className="content">
                                                        <Header color='red' as='h5'>{user.username}</Header>
                                                    <div className="description">{user.email}</div>
                                                </div>
                                                <hr></hr>
                                            </div>
                                        ) 
                                    }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui stackable grid container center aligned">
                    <div className="twelve wide column">
                        <Header style={{marginTop: "40px"}} color='orange' size='huge'>Utilizadores VIP</Header>
                        <div className="ui stacked segment left aligned">
                            <div className="ui animated list">
                                    {
                                        vips.map((user) => 
                                            <div key={user.oid} className="item">
                                                <div className="right floated content">
                                                    <Popup content="Apagar utilizador" trigger={
                                                        <Button icon='trash' onClick={() => this.delete(user.oid)}/>}/>
                                                </div>
                                                <div className="right floated content">
                                                    <Popup content="Retirar VIP" trigger={
                                                        <Button icon="star" color="black" onClick={() => this.makeNormal(user)}/>}/>
                                                </div>
                                                <div className="content">
                                                        <Header color='red' as='h5'>{user.username}</Header>
                                                    <div className="description">{user.email}</div>
                                                </div>
                                                <hr></hr>
                                            </div>
                                        ) 
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GerirUsers;