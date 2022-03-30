import {request} from "@/network/request";
import qs from 'qs';

export function loginReq(data){
  data.grant_type = "password"
  data.client_id = "fic"
  data.client_secret = "fic"
  return request({
    url: "/api/oauth/token",
    method: "post",
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export function registerReq(data) {
  return request({
    url: "/api/user/register",
    method: "post",
    data
  })
}