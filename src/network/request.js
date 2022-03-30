import axios from "axios";
import qs from "qs";
import router from "@/router";
import {ElMessage} from "element-plus";

export function request(config) {
  const instance = axios.create({
    baseURL: '',
    timeout: 5000
  });

  //请求拦截
  instance.interceptors.request.use(config=>{
    //如果认证就统一设置
    let token = window.localStorage.getItem('access_token');
    if(token){
      config.headers.Authorization = 'Bearer '+token;
    }
    return config;
  },error=>{error});

  //响应拦截
  instance.interceptors.response.use(response => {
    console.log(response.data ? response.data : response);
    if (!response.data || response.data.code !== "000"){
      console.log(response)
      if (response.data.code === "A401"){
        token_fail()
        return
      }
      ElMessage({
        message: response.data.msg,
        type: 'error'
      })
      return Promise.reject(response.data ? response.data : response);
    }
    return response.data ? response.data : response;
  },error => {
    if (error.response.status === 401){
      token_fail()
      return
    }
    ElMessage({
      message: error,
      type: 'error'
    })
  });

  return instance(config);
}


export function token_fail(){
  let rftoken = localStorage.getItem("refresh_token");
  if (rftoken){
    let data={
      grant_type: "refresh_token",
      client_id: "fic",
      client_secret: "fic",
      refresh_token: rftoken
    }
    axios.post("/api/oauth/token",qs.stringify(data),{headers: { 'content-type': 'application/x-www-form-urlencoded' }})
      .then(response=>{
        console.log(response);
        if (response.data.code === "000"){
          localStorage.setItem("access_token", response.data.data.access_token)
          localStorage.setItem("refresh_token", response.data.data.refresh_token)
          router.push({path:"/home"})
        }else{
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          router.push({path:"/"})
        }
      },()=>{
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        router.push({path:"/"})
      })
  }
}