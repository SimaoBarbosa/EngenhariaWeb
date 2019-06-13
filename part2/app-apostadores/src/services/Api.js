const BASE_URL = 'http://localhost:3000';

const generateUrl = (base, path, params = []) => {
  const strParams = Object.entries(params)
    .map(([ key, value ]) => `${key}=${value}`)
    .join('&');

  return [
    `${base}${path}`,
    strParams
  ]
    .filter(value => value)
    .join('?');
};

const jsonFetch = (url, options = {}) => (
  fetch(
    url,
    {
      ...options,
      headers: {
        ...(options.headers || {}),
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: options.body ? JSON.stringify(options.body) : options.body,
    }
  )
    .then(response => response.json())
)

export const login = (body) => (
    jsonFetch(generateUrl(BASE_URL, '/login'), { method: 'post', body })
);

export const register = (body) => (
  jsonFetch(generateUrl(BASE_URL, '/register'), { method: 'post', body })
);

export const getNotificacoes = () => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/notificacoes/user/' + localStorage.getItem('user_id')), { method: 'get' })
);

export const removerNotificacao = (id_notificacao) => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/notificacoes/delete/' + id_notificacao), { method: 'post' })
);

export const getApostasGanhas = () => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/apostas/ganhas/' + localStorage.getItem('user_id')), { method: 'get' })
);

export const getApostasEmAberto = () => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/apostas/abertas/' + localStorage.getItem('user_id')), { method: 'get' })
);

export const getApostasPerdidas = () => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/apostas/perdidas/' + localStorage.getItem('user_id')), { method: 'get' })
);

export const tornarVIP = (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/users/vip_p/' + localStorage.getItem('user_id')), { method: 'post', body })
);

export const getInformacoesUser = () => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/users/' + localStorage.getItem('user_id')), { method: 'get' })
);

export const importarSaldo = (body) => (
	jsonFetch(generateUrl(BASE_URL, '/api_users/users/saldo'), { method: 'post', body })
); 

export const getTodasCompeticoes = () => (
    jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes'), { method: 'get' })
);

export const getTodasEquipas = () => (
    jsonFetch(generateUrl(BASE_URL, '/api_eventos/equipas'), { method: 'get' })
);

export const getHistoricoEquipa = (id_equipa) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/eventos/historico/equipa/' + id_equipa), { method: 'get' })
);

export const getEventosEquipa = (id_equipa) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/eventos/equipa/' + id_equipa), { method: 'get' })
);

export const desportos = () => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes/desportos'),{method:'get'}) 
);

export const regioesFromDesporto = (idDesporto) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes/desporto/regioes/'+idDesporto),{method:'get'}) 
);

export const competicioesFromRegDesp = (idReg,idDesp) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes/regioes/'+idReg+"/"+idDesp),{method:'get'}) 
);

export const getFases = (idComp) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes/fases/'+idComp),{method:'get'}) 
);

export const eventsOfFase = (idFase) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/eventos/fase/'+idFase),{method:'get'}) 
);

export const allEvents= () => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/eventos/info'),{method:'get'}) 
);

export const allEventsDisponiveis= () => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/eventos/disponiveis'),{method:'get'}) 
);

export const apostasOfEvent = (vip,available,id_evento) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/apostasDisponiveis/ofEvento/'+vip+'/'+available+'/'+id_evento),{method:'get'}) 
);

export const criar_aposta_concreta = (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/apostas/create'), { method: 'post', body })
);

export const criar_aposta_concretaVIP = (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/apostas/createVIP'), { method: 'post', body })
);
