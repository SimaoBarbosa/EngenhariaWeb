import qs from "qs";
const BASE_URL = 'http://localhost:3000';

export const post = (path, token, body) => fetch(
  BASE_URL + path,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'x-access-token': (token) ? token : ''
    },
    body: qs.stringify(body)
})

export const get = (path, token, body) => fetch(
  BASE_URL + path,{
    method: 'GET',
    headers: {
      'x-access-token': token
    },
})

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

export const apostasOfEvent = (vip,available,id_evento) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/apostasDisponiveis/ofEvento/'+vip+'/'+available+'/'+id_evento),{method:'get'}) 
);

export const criar_aposta_concreta = (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/apostas/create'), { method: 'post', body })
);

export const create_desporto = (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes/createDesporto'), { method: 'post', body })
);

export const add_create_regiao = (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes/addOrCreateRegiao'), { method: 'post', body })
);

export const createCompeticao= (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes/create'), { method: 'post', body })
);

export const createFase= (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes/createFase'), { method: 'post', body })
);


export const createEvento= (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/eventos/insert'), { method: 'post', body })
);

export const getEquipasOfComp = (idComp) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes/equipas/'+idComp),{method:'get'}) 
);

export const createApostaDisponivel= (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/apostasDisponiveis/create'), { method: 'post', body })
);

export const createAddOpcao= (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/apostasDisponiveis/createAddOpcao'), { method: 'post', body })
);

export const makeAvailable= (idAposta) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/apostasDisponiveis/makeAvailable/'+idAposta), { method: 'post' })
);

export const endAposta= (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/apostasDisponiveis/end'), { method: 'post' , body})
);

export const updateOdd= (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/apostasDisponiveis/updateOdd'), { method: 'post' , body})
);

export const allApostadores= () => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/users/apostadores'), { method: 'get' })
);

export const removeUser = (id) => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/users/delete/'+id),{method:'post'}) 
);

export const makeUserVip= (id) => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/users/vip/'+id),{method:'post'}) 
);

export const makeUserNormal= (id) => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/users/normal/'+id),{method:'post'}) 
);


export const getTodasCompeticoes = () => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes'), { method: 'get' })
);

export const getTodasEquipas = () => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/equipas'), { method: 'get' })
);

export const addEquipaComp = (id_comp,id_team) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes/addEquipa/'+id_comp+'/'+id_team), { method: 'post' })
);

export const remEquipaComp = (id_comp,id_team) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/competicoes/removeEquipa/'+id_comp+'/'+id_team), { method: 'post' })
);

export const createTeam = (body) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/equipas/insert/'), { method: 'post' ,body})
);
