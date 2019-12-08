import React from "react";
import { Link } from "react-router-dom";
class UserList extends React.Component {
  render() {
    return (
      <>
      <table>
        <thead>
          <tr>
            <th className="opcao">
              <i className="material-icons">check_box_outline_blank</i>
            </th>
            <th className="nome">Name</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {this.props.pesquisa.map(user => (
            <tr key={user.id}>
              <td className="centra">
                <input value={user.id} type="checkbox" onClick={this.props.MonitoraCheck} />
              </td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td className="centra iconslink">
                <Link to={"/show/"+user.id}><i className="material-icons">portrait</i></Link>
                <i onClick={() => this.props.DeleteOne(user.id)} className="material-icons">delete_outline</i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
    );
  }
}

export default UserList;
