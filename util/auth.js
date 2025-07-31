import axios from 'axios';
import { BASE_URL } from '../constants/box';

export async function register(email, password, name) {
  const url = `${BASE_URL}/auth/register`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    name: name
  });

  const message = response.data.message;
  return message;
}

export async function login(email, password) {
  const url = `${BASE_URL}/auth/login`;
  const response = await axios.post(url, {
    email: email,
    password: password,
  });

  const token = response.data.access_token;
  return token;
}

export async function logout(token) {
  try {
    const url = `${BASE_URL}/auth/logout`;
    const response = await axios.post(
      url, 
      null, // Body vacío
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    // Verificar si la respuesta es exitosa (códigos 2xx)
    if (response.status >= 200 && response.status < 300) {
      return response.status;
    } else {
      // Lanzar error para respuestas no exitosas
      throw new Error(`Logout failed with status: ${response.status}`);
    }
  } catch (error) {
    // Convertir error de Axios en un error más manejable
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      throw new Error(`Server responded with status: ${error.response.status}`);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      throw new Error('No response received from server');
    } else {
      // Error al configurar la solicitud
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
}