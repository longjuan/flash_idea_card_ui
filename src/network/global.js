import {request} from "@/network/request";
import store from "@/store";

export function testToken(){
  return request({
    url: "/api/user/currentUser",
    method: "get"
  }).then(response=>{
    if (response.code === "000"){
      store.dispatch("modifyRoles",response.data.roles);
    }
  },error=>{
    return Promise.reject(error);
  })
}