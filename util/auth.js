import axios from 'axios';

export async function register(email, password, name) {
  const url = `http://localhost:8000/${mode}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    name: name
  });

  const message = response.data.message;
  return message;
}

export async function login(email, password) {
  const url = `http://localhost:8000/${mode}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
  });

  const token = response.data.access_token;
  return token;
}

export async function logout() {
  const token = "";
  const url = `http://localhost:8000/${mode}`;
  const response = await axios.post(url, { headers: {"Authorization" : `Bearer ${token}`} });

  const message = response.data.message;
  return message;
}