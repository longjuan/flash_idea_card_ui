import {request} from "@/network/request";
import qs from "qs";

export function addCardReq(data) {
  return request({
    url: "/api/kanban/card",
    data,
    method: "post"
  })
}

export function moveCardReq(data){
  return request({
    url: "/api/kanban/card/order",
    data: qs.stringify(data),
    method: "put",
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}

export function deleteCardReq(data){
  return request({
    url: "/api/kanban/card?cardId="+data,
    method: "delete"
  })
}

export function deleteTagReq(data){
  return request({
    url: "/api/kanban/tag?tagId="+data,
    method: "delete"
  })
}

export function addTagReq(data){
  return request({
    url: "/api/kanban/tag",
    method: "post",
    data
  })
}

export function updateCardReq(data){
  return request({
    url: "/api/kanban/card",
    data,
    method: "put"
  })
}

export function cardTransfer(data){
  return request({
    url: "/api/kanban/card/transfer",
    method: "put",
    data: qs.stringify(data),
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}