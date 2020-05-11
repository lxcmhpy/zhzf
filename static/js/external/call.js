// 视频呼叫 by:jingli
// import v from "@/main.js";
// import ElementUI from "element-ui";

var PhoneCallModule =(function () {
    var SERVER_ADDR = 'http://192.168.7.24:80/api/api.class.php?';
	function onCallStateChanged(e){
        switch (e.type){
			//Failed to make call
			case 0:
			break;
			//call connected
			case 1:
			break;
			//Incoming audio call
			case 2:
                document.getElementById('btnPhone1').click();
                // _this.$message({
                //     iconClass: 'iconfont law-success',
                //     customClass: 'successMsg',
                //     dangerouslyUseHTMLString: true,
                //     message: `语音来电：<a href="javascript:void(0)" style="color:red" onclick="document.getElementById('btnPhone1').click()">点击接听</a>`
                // });
                // alert(1)
			break;
			//Incoming video call
			case 3:
                // alert(2)
                document.getElementById('btnPhone2').click();

			break;
			case 4:
			break;
			//Early media started
			case 5:
                // alert(3)
			/*
				$('#tdAudio').hide();
				$('#tdCallOut').hide();
				$('#tdVideo').show();
				*/
			break;
			case 6:
                // alert(4)
                // v.$message({
                //     iconClass: 'iconfont law-error',
                //     customClass: 'errorMsg',
                //     dangerouslyUseHTMLString: true,
                //     message: `请求已终止`
                // });

			break;
			//Terminating the call...
			case 7:
			break;
			//call hangup
			case 8:
				// v.$message({
                //     iconClass: 'iconfont law-error',
                //     customClass: 'errorMsg',
                //     dangerouslyUseHTMLString: true,
                //     message: `已挂断`
                // });

			break;

			case 9:
				//$('#callingDlg').modal('hide');
			break;
			//answer audio call
			case 10:
				//$('#btnCancelCallOut').html('挂断');
				//$('#tdAudio').hide();
				//$('#tdCallOut').show();
				//$('#tdVideo').hide();
			break;
			//answer video call
			case 11:
				//$('#tdAudio').hide();
				//$('#tdCallOut').hide();
				//$('#tdVideo').show();
				//$('#tdVideoBtn').hide();
			break;
        }
	};

	function onPhoneCallMsgCB(e){
        return e;
		switch (e.type){
			//dont support WebSocket!
			case 1:
			break;
			//dont support WebRtc!
			case 2:
			break;
			//sip registered
			case 3:
			break;
			//sip unregistered
			case 4:
			break;
			//register failed
			case 5:
			break;
			//Disconnected
			case 6:
			break;
			case 7:
			break;
		}
	};

	function setDialogTitle(title) {
		//$('#hTitle').text(title);
	}

	function showDialogCall() {
		//$('#callingDlg').modal({backdrop:'static',keyboard:false});
	};

	var audioCall = function(phoneNum, phoneName){
        // debugger;
		PhoneCall.sipAudioCall(phoneNum, phoneName);
		console.log('语音去电')
		//setDialogTitle('语音去电');
		//$('#btnCancelCallOut').html('取消');
		//$('#tdVideo').hide();
		//$('#tdAudio').hide();
		//$('#tdCallOut').show();
		//$('#divCallee').text(phoneName+'('+phoneNum+')');
		//$('#hTitle').text('语音去电');
		//showDialogCall();
	};

	var videoCall = function(phoneNum, phoneName){
        // debugger;
		PhoneCall.sipVideoCall(phoneNum, phoneName);
		console.log('视频去电')
		//setDialogTitle('视频去电');
		//$('#tdVideo').hide();
		//$('#tdAudio').hide();
		//$('#tdCallOut').show();
		//$('#divCallee').text(phoneName+'('+phoneNum+')');

		showDialogCall();
	};

	var answerCall = function(){
		PhoneCall.sipAnswer();
	};

	var hangUp = function(){
        PhoneCall.sipHangUp();

	};

	var unRegister = function(){
		PhoneCall.sipUnRegister();
	};

	var sipRegister = function(){
        // debugger;
        var urlObj = JSON.parse(localStorage.getItem('CURRENT_BASE_URL'));
        var callCredential = {
                        displayName: 'ecds05',
                        privateIdentity: '100007',
                        webSocketServerUrl: urlObj.VIDEO_HOST,
                        // webSocketServerUrl: 'wss://172.16.170.47:10062',
            			// webSocketServerUrl: 'wss://124.192.215.9:10062',
            			sipOutboundProxyUrl: 'udp://172.16.170.47:7766',
            			iceServers:'[]',
            			password: '1234',
            			authToken:result
                    };

		PhoneCall.sipRegister(callCredential);

	};
    var isRegistered = function () {
        return PhoneCall.isRegistered;
    }
	var initialize = function(){
		//设置控件，回调方法等
		var phoneSettings = {
			videoLocal: document.getElementById("video_local"),
			videoRemote: document.getElementById("video_remote"),
			audioRemote: document.getElementById("audio_remote"),
			phoneCallMsgCB: onPhoneCallMsgCB,
			onCallStateChanged: onCallStateChanged
		}

        PhoneCall.initPhoneCall(phoneSettings);
        // debugger;
	};

    // window.onload = initialize;

		return {
        initialize:initialize,
		sipRegister: sipRegister,
		sipAudioCall: audioCall,
		sipVideoCall: videoCall,
		sipAnswer: answerCall,
        sipHangUp: hangUp,
        sipUnRegister: unRegister,
        getRegistered: isRegistered
	};
} ());


