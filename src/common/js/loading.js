import store from "@/store";

let needLoadingRequestCount = 0

export function showFullScreenLoading(type) {
 if (needLoadingRequestCount === 0) {
  startLoading(type)
 }
 needLoadingRequestCount++
}

export function tryHideFullScreenLoading() { 
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
   endLoading()
  }
 }
 function startLoading(type) {
   let data = {
     flag:true,
     type:type
   }
  store.dispatch("setLoadingState", data);
 }
 function endLoading() {
  let data = {
    flag:true,
  }
  store.dispatch("setLoadingState", data);
 }
