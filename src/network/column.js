import {request} from "@/network/request";
import qs from "qs";

export function addColumnReq(data) {
  return request({
    url: "/api/kanban/column",
    data,
    method: "post"
  })
}

export function deleteColumnReq(data) {
  return request({
    url: "/api/kanban/column?columnId="+data,
    method: "delete"
  })
}

export function moveReq(data){
  return request({
    url: "/api/kanban/column/order",
    method: "put",
    data: qs.stringify(data),
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}

export function updateColumn(data) {
  return request({
    url: "/api/kanban/column",
    method: "put",
    data
  })
}
