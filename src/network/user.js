import {request} from "@/network/request";
import qs from "qs";
import {getRsaKey} from "@/network/rsa";
import JSEncrypt from "jsencrypt";

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
  return getRsaKey().then(response => {
    let encryptor = new JSEncrypt()
    encryptor.setPublicKey("-----BEGIN PUBLIC KEY-----" + response.data.publicKey + "-----END PUBLIC KEY-----")
    data.newpw = encryptor.encrypt(data.newpw)

    data.oldpw = encryptor.encrypt(data.oldpw)
    data.rsaUuid = response.data.uuid

    return request({
      url: "/api/user/password",
      method: "put",
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: qs.stringify(data)
    })
  })
}

export function updateEmail(data){
  return request({
    url: "/api/user/email",
    method: "put",
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}