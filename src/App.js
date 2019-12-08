import React from "react";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import HeaderList from "./components/HeaderList";
import UserList from "./components/UserList";
import ShowUser from "./components/ShowUser";

import "./App.css";

class App extends React.Component {
  state = {
    users: [],
    selecionados: 0,
    pesquisa: null,
    retornopesquisa: [],
    checkbox: []
  };

  async componentDidMount() {
    await Axios.get(
      "https://raw.githubusercontent.com/cinqtechnologies/front-end-react-test/master/users.json"
    ).then(res => {
      this.setState({ users: res.data });
      this.setState({ retornopesquisa: res.data });
    });
  }

  // Executado sempre que houver alterações nas props ou estado
  componentDidUpdate(prevProps, prevState) {}

  handleChangePesquisa = e => {
    this.setState({ pesquisa: e.target.value });
    if (this.state.pesquisa !== null) {
      const filtra = this.state.users.filter(function(user) {
        return user.firstName.indexOf(e.target.value) !== -1;
      });

      this.setState({ retornopesquisa: filtra });
    } else {
      this.setState({ retornopesquisa: this.state.users });
    }
  };

  handleMonitoraCheck = e => {
    //e.target.value

    if (e.target.checked) {
      this.setState({
        checkbox: [...this.state.checkbox, parseInt(e.target.value, 10)]
      });

      this.setState(state => {
        return {
          selecionados: state.selecionados + 1
        };
      });
    } else {
      this.setState({
        checkbox: this.state.checkbox.filter(
          t => t !== parseInt(e.target.value, 10)
        )
      });
      this.setState(state => {
        return {
          selecionados: state.selecionados - 1
        };
      });
    }
  };

  Deleta = () => {
    const usuarios = this.state.users.filter(user => {
      return this.state.checkbox.indexOf(user.id) === -1;
    });
    this.setState({ users: usuarios });
    this.setState({ retornopesquisa: usuarios });
  };

  DeletaOne = id => {
    const usuarios = this.state.users.filter(t => t.id !== parseInt(id));
    this.setState({ users: usuarios });
    this.setState({ retornopesquisa: usuarios });
  };

  Download = async () => {
    const usuarios = this.state.users.filter(user => {
      return this.state.checkbox.indexOf(user.id) > -1;
    });

    const json = JSON.stringify(usuarios);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "usuarios.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  Altera = dados => {
    const usuarios = this.state.users.filter(t => t.id !== parseInt(dados.id));

    this.setState({
      users: [...usuarios, dados]
    });
    this.setState({
      retornopesquisa: [...usuarios, dados]
    });
    window.history.back();
  };

  render() {
    return (
      <Router>
        <Header />

        <div className="content">
          <div className="box">
            <Switch>
              <Route path="/" exact>
                <HeaderList
                  selecionado={this.state.selecionados}
                  Pesquisa={this.handleChangePesquisa}
                  Deleta={this.Deleta}
                  Download={this.Download}
                />
                <UserList
                  pesquisa={this.state.retornopesquisa}
                  MonitoraCheck={this.handleMonitoraCheck}
                  DeleteOne={this.DeletaOne}
                />
              </Route>
              <Route
                path="/show/:id"
                render={matchProps => (
                  <ShowUser
                    pega={matchProps}
                    dados={this.state.users}
                    Altera={this.Altera}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
