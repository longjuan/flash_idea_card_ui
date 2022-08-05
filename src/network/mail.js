import {request} from "@/network/request";
import qs from "qs";

export function getVerifyCode(data){
  return request({
    url: "/api/mail/verification-code",
    method: "post",
    data: qs.stringify(data),
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}