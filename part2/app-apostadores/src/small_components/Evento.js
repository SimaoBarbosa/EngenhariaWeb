import React from 'react';
import { List } from 'semantic-ui-react';
import ApostasDisponiveis from './ApostasDisponiveis'


const Evento = ({ evento }) => {
  return (
    <List.Item>
      <div >
        <b>
          {evento.titulo}
        </b>
        <ApostasDisponiveis id_evento={evento.id_evento} />
      </div>
    </List.Item>
  );
}

export default Evento;