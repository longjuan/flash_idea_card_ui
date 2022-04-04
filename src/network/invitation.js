import {request} from "@/network/request";
import qs from "qs";

export function inviteReq(data){
  return request({
    url: "/api/invitation",
    method: "post",
    data: qs.stringify(data),
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}

export function getInvitationReq(){
  return request({
    url: "/api/invitation",
    method: "get"
  })
}

export function acceptInvitation(data){
  return request({
    url: "/api/invitation",
    method: "put",
    data: qs.stringify(data),
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}