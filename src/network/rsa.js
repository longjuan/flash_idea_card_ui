import {request} from "@/network/request";

export function getCaptcha() {
  return request({
    url: "/api/oauth/captcha",
    method: "get"
  })
}

export function getRsaKey() {
  return request({
    url: "/api/oauth/rsa",
    method: "get"
  })
}