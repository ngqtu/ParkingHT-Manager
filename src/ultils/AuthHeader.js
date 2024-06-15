import { jwtDecode } from "jwt-decode";

const getAccessToken = () => {
  let localStorageData = localStorage.getItem('persist:root/user');
  localStorageData = JSON.parse(localStorageData);
  const accessToken = JSON.parse(localStorageData?.token);
  return accessToken;
}

const getTokenInfo = () => {
  const accessToken = getAccessToken();
  const tokenInfo = jwtDecode(accessToken);
  if (tokenInfo) {
    return {
      id: tokenInfo.id,
      role: tokenInfo.role
    };
  } else {
    return {};
  }
}

const authHeader = token => ({Authorization: `Bearer ${token}`});

export {authHeader, getAccessToken, getTokenInfo};
