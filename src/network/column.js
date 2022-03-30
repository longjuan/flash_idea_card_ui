import {request} from "@/network/request";

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

