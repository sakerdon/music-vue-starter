import axios from "axios";
console.log("baseURL", process.env.VUE_APP_BASE_API);

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers["X-Token"] = 'test';
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    // const data = response.data
    return response;
  },
  error => {
    console.log("err", error.response); // for debug
    alert(error.response.data ? error.response.data.message || 'Error' : 'Error')
    return Promise.reject(error);
  }
);




export function fetchList({ path, query }) {
    return service({
      url: path,
      method: "get",
      params: query
    });
  }
  
