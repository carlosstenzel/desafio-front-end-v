import React from 'react';
import HeaderList from '../components/HeaderList';
import UserList from '../components/UserList';
class Home extends React.Component{
    render(){
      return(
        <HeaderList selecionado={this.state.selecionados} Pesquisa={this.handleChangePesquisa} />
        <UserList retornopesquisa={this.state.retornopesquisa}/>
      )
    }
}

export default Home;
