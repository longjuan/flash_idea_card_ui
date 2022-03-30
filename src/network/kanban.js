import {request} from "@/network/request";
import qs from "qs";

export function allKanban() {
  return request({
    url: "/api/kanban",
    method: "get"
  })
}

export function updateKanban(data){
  return request({
    url: "/api/kanban",
    data,
    method: "put"
  })
}

export function addKanban(data){
  return request({
    url: "/api/kanban",
    data,
    method: "post"
  })
}

export function deleteKanbanReq(data){
  return request({
    url: "/api/kanban?kanbanId="+data,
    method: "delete"
  })
}

export function collectReq(data){
  return request({
    url: "/api/kanban/collect",
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: "post",
    data: qs.stringify(data)
  })
}

export function kanbanContent(data){
  return request({
    url: "/api/kanban/content?kanbanId="+data,
    method: "get"
  })
}