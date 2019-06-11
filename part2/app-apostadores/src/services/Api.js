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

export const getNotificacoes = (user_id, token) => (
  jsonFetch(generateUrl(BASE_URL, '/api_users/notificacoes/user/' + user_id), { method: 'get' })

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
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/eventos'),{method:'get'}) 
);

export const apostasOfEvent = (vip,available,id_evento) => (
  jsonFetch(generateUrl(BASE_URL, '/api_eventos/apostasDisponiveis/ofEvento/'+vip+'/'+available+'/'+id_evento),{method:'get'}) 
);

