import {request} from "@/network/request";

export function searchReq(data) {
  return request({
    url: "/api/search?key=" + data,
    method: "get"
  })
}