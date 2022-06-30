import {request} from "@/network/request";
import qs from 'qs';
import {getRsaKey} from "@/network/rsa";
import JSEncrypt from "jsencrypt";

export function loginReq(data) {
  data.grant_type = "password"
  data.client_id = "fic"
  data.client_secret = "fic"
  return getRsaKey().then(response => {
    let encryptor = new JSEncrypt()
    encryptor.setPublicKey("-----BEGIN PUBLIC KEY-----" + response.data.publicKey + "-----END PUBLIC KEY-----")
    data.password = encryptor.encrypt(data.password)
    data.rsa_uuid = response.data.uuid

    return request({
      url: "/api/oauth/token",
      method: "post",
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: qs.stringify(data)
    })
  })
}

export function registerReq(data) {
  return getRsaKey().then(response => {
    let encryptor = new JSEncrypt()
    encryptor.setPublicKey("-----BEGIN PUBLIC KEY-----" + response.data.publicKey + "-----END PUBLIC KEY-----")
    data.password = encryptor.encrypt(data.password)
    data.rsaUuid = response.data.uuid

    return request({
      url: "/api/user/register",
      method: "post",
      data
    })
  })
}

export function evaluationReq(data) {
  return request({
    url: "/api/user/evaluation",
    method: "post",
    data: qs.stringify(data)
  })
}