import React from 'react';
import { List } from 'semantic-ui-react';


const ApostaDisponivel = ({ aposta }) => {
   let vip = aposta.vip ? "VIP" : ""
  return (
    <List.Item>
      <span >
        {aposta.titulo}
        {vip}
      </span>
    </List.Item>
  );
}

export default ApostaDisponivel;