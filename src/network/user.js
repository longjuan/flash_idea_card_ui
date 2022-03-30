import {request} from "@/network/request";
import qs from "qs";

export function userInfoReq() {
  return request({
    url: "/api/user/info",
    method: "get"
  })
}

export function updateNickname(data){
  return request({
    url: "/api/user/info/nickname",
    method: "put",
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function updatePassword(data){
  return request({
    url: "/api/user/password",
    method: "put",
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}