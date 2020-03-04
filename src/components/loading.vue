
// 使用方法：
// 1.接口调用前：this.$store.dispatch('setLoadingState', true)
// 2.接口成功调用后： this.$store.dispatch('setLoadingState', false)

<template>
    <div class="loading">
        <div class="mask"></div>
            <!-- <img  class="load" src="../../static/images/gif/loading1.gif"> -->
			<div class="load">
				<!-- <img src="../assets/image/main/logo.png" class="rotate"/> -->
				<!-- <p>loading...</p> -->
			</div>

    </div>
</template>

<style lang="scss">

.loading {
  position: fixed;
  z-index: 99999999;
  width: 100%;
  height: 100%;
  .load {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 152px;
    height: 90px;
    // background: url(../../static/images/gif/loading1.gif) !important;
    opacity: 1;
    z-index: 1003;
    border-radius: 10px;
    /*设置关键帧的播放时间*/
    animation:turns2 0.8s infinite linear;

    img {
      width: 100px;
      position: absolute;
      top: 50px;
      left: 50%;
      margin-left: -50px;
      animation: spin1 1s linear infinite ;
      transform-origin: center;
    }
    img.rotate {
      animation: spin1 1s linear infinite;
      // transform-origin: 50px 50px;
      // transform-origin: center;
    }
    p {
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 25px;
      color: #111;
      font-size: 14px;
    }
  }
  @keyframes spin1 {
    from {
      transform: rotate(0);
    }
    70%{
      transform: rotate(360deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }

  .mask {
    position: fixed;
    width: 100%;
    margin: 0 auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1001;
    // background: rgba(0, 0, 0, 0.7);
    background: rgba(234, 237, 244, 1);
  }
    @keyframes turns2{
    from { background:url(../../static/images/gif/1.png)}
    50% { background:url(../../static/images/gif/2.png)}
    100% { background:url(../../static/images/gif/3.png) }
    }
}
</style>
