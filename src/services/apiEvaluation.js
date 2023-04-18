import axios from "axios";

const apiURL = "http://localhost:5000/evaluations";

export async function getEvaluations(config) {
  return await axios.get(apiURL,config);
}
export async function getEvaluation(username,config) {
  return await axios.get(`${apiURL}/${username}`,config);
}

// Ajoute de l'expérience pour un utilisateur spécifié
export async function addXP(username, xp, config) {
  return await axios.post(`${apiURL}/${username}/addxp/${xp}`,config);
}

// Réduit l'expérience pour un utilisateur spécifié
export async function reduceXP(username, xp, config) {
  return await axios.post(`${apiURL}/${username}/reducexp/${xp}`, config);
}
/*
export async function getUserAuth(id,config) {
  return await axios.get(`${apiURL}/getUser`,config);
}

export async function addUser(formData, config) {
  return await axios.post(apiURL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'foo': 'bar'
    },
    ...config
  });
}

export async function updateUser(id, User) {
  return await axios.put(`${apiURL}/${id}`, User);
}

export async function deleteUser(id,config) {
  return await axios.delete(`${apiURL}/${id}`,config);
}

export async function LoginUser(User) {
  return await axios.post(`${apiURL}/login`, User);
}

export async function register(formData) {
  return await axios.post(`${apiURL}/register`, formData ,{
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function forgotpwd(User) {
  return await axios.post(`${apiURL}/forgotpwd`, User.email);
}
*/