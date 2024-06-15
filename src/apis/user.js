import axios from "customize-axios";
import { authHeader } from "ultils/AuthHeader";

export const apiLogin = async (credentials) => {
  try {
    const response = await axios.post('/auth/generateToken', credentials);
    return response;
  } catch (error) {
    throw error.response.data;
  }
}

export const apiGetUserById = async (userid, token) => {
  return await axios.get('/user/get-by-id/' + userid,
    {
      headers: authHeader(token),
    },
  );
}

export const apiGetUser = async () => {
  return await axios.get('/user/get-all');
}

export const apiDeleteUser = async (uid) => {
  return await axios.put('/user/delete/' + uid, {});
}

export const apiChangePassUser = async (id, pass) => {
  return await axios.put('/user/change-password/' + id, pass);
}

export const apiUpdateUser = async (id, useinfo) => {
  return await axios.put('/user/update/' + id, useinfo);
}

export const apiUpdateRoleUser = async (id, useinfo) => {
  return await axios.put('/user/change-role/' + id, useinfo);
}

