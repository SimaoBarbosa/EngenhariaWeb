import React from 'react';
import { List } from 'semantic-ui-react';
//import ApostasDisponiveis from './ApostasDisponiveis'


const Evento = ({ evento }) => {
  // <ApostasDisponiveis id_evento={evento.id_evento} />
  return (
    <List.Item>
      <div >
        <b>
          {evento.titulo}
        </b>
      </div>
    </List.Item>
  );
}

export default Evento;