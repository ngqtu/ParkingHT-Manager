import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL
});
// // Thêm một bộ đón chặn request
instance.interceptors.request.use(function (config) {
  let localStorageData = localStorage.getItem('persist:root/user');
  if(localStorageData && typeof localStorageData === 'string'){
    localStorageData = JSON.parse(localStorageData);
    const accessToken = JSON.parse(localStorageData?.token);
    if(accessToken !== null){
      config.headers = {
        Authorization: `Bearer ${accessToken}`
      }
      return config;
    }
    return config;
  } else return config; 
}, function (error) {
  // Làm gì đó với lỗi request
  return Promise.reject(error);
});

// Thêm một bộ đón chặn response
instance.interceptors.response.use(function (response) {
  // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
  // Làm gì đó với dữ liệu response
  return response.data;
}, function (error) {
  // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
  // Làm gì đó với lỗi response
  return Promise.reject(error);
});


export default instance;