import store from "@/store";

let needLoadingRequestCount = 0

export function showFullScreenLoading() {
 if (needLoadingRequestCount === 0) {
  startLoading()
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
 function startLoading() {
  store.dispatch("setLoadingState", true);
 }
 function endLoading() {
  store.dispatch("setLoadingState", false);
 }
