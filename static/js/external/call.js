// 视频呼叫 by:jingli
// import v from "@/main.js";
// import ElementUI from "element-ui";
var PhoneCallModule =(function () {
	var SERVER_ADDR = 'http://192.168.7.24:80/api/api.class.php?';
	function onCallStateChanged(e){
        return e
	        // document.getElementById('phoneBox').click();
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
        var callCredential = {
                        displayName: 'ecds05',
                        privateIdentity: '100007',
            			webSocketServerUrl: 'wss://124.192.215.9:10062',
            			sipOutboundProxyUrl: 'udp://172.16.170.47:7766',
            			iceServers:'[]',
            			password: '1234',
            			authToken:result
                    };

		PhoneCall.sipRegister(callCredential);

	};

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

	window.onload = initialize;

		return {
		sipRegister: sipRegister,
		sipAudioCall: audioCall,
		sipVideoCall: videoCall,
		sipAnswer: answerCall,
        sipHangUp: hangUp,
        sipUnRegister: unRegister
	};
} ());

