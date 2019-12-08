import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const ShowUser = Api => {
  const [usuario, setUsuario] = useState({
    id: 1,
    firstName: ".",
    lastName: ".",
    age: 0,
    description: "."
  });

  const [usu, setUsu] = useState({
    firstName: ".",
    lastName: "."
  });

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
   
    const id = Api.pega.match.params.id;

    const busca = () => Api.dados.find(t => t.id === parseInt(id));

    setUsuario(busca);
    setUsu(busca);
  }, [Api]);

  function Salvar() {
    Api.Altera(usu);
  }

  function ConfirmaCancelar() {
    setUsu({
      firstName: usuario.firstName,
      lastName: usuario.lastName
    });
    closeModal();
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal">
          <h2>Cancelar</h2>
          <hr />
          <p>Tem certeza que deseja cancelar a alteração ?</p>
          <button className="botao-cancelar" onClick={closeModal}>
            Não
          </button>
          <button className="botao-salvar" onClick={ConfirmaCancelar}>
            Sim
          </button>
        </div>
      </Modal>
      <div className="headershow">
        <Link to="/">
          <button className="botao">Voltar</button>
        </Link>
      </div>
      <div className="formshow">
        <h2>Detalhes do usuário</h2>
      </div>

      <div className="show-form">
        <div>
          <label>
            Nome:
            <input
              type="text"
              name="firstName"
              value={usu.firstName}
              onChange={e => setUsu({ id: usu.id, firstName: e.target.value, lastName: usu.lastName, age: usu.age,
                description: usu.description })}
            />
          </label>
        </div>
        <div>
          <label>
            Sobrenome :
            <input
              type="text"
              name="lastName"
              value={usu.lastName}
              onChange={e => setUsu({ id: usu.id, firstName: usu.firstName, lastName: e.target.value, age: usu.age,
                description: usu.description})}
            />
          </label>
        </div>
      </div>
      <div className="detalhes">
        <p>Idade: {usuario.age}</p>
        <p>Detalhes: {usuario.description}</p>
      </div>

      <div>
        <button className="botao-cancelar" onClick={openModal}>
          Cancelar
        </button>
        <button className="botao-salvar" onClick={Salvar}>
          Salvar
        </button>
      </div>
    </>
  );
};

export default ShowUser;
