import React from "react";

function HabilitaSelecionado({ numero, Deleta }) {
  if (numero > 0) {
    return <button onClick={Deleta}>Delete {numero}</button>;
  } else {
    return <button disabled>Delete {numero}</button>;
  }
}

function HabilitaDow({ numero, Download }) {
  if (numero > 0) {
    return <button onClick={Download}>Download</button>;
  } else {
    return <button disabled>Download</button>;
  }
}

function HeaderList({ selecionado = 0, Pesquisa, Deleta, Download }) {
  return (
    <div className="header-list">
      <div className="search">
        <input type="text" onChange={Pesquisa} placeholder="Pesquisar" />
        <i className="material-icons">search</i>
      </div>
      <div>
        <HabilitaSelecionado numero={selecionado} Deleta={Deleta} />
      </div>
      <div>
        <HabilitaDow numero={selecionado} Download={Download}/>
      </div>
    </div>
  );
}

export default HeaderList;
