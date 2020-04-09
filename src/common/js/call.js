// // import PhoneCall from '../../../static/js/external/PhoneCall.js';
// export var PhoneCallModule = {
// 	// SERVER_ADDR: 'http://192.168.7.24:80/api/api.class.php?',
// 	onCallStateChanged (e){
// 		switch (e.type){
// 			//Failed to make call
// 			case 0:
// 			break;
// 			//call connected
// 			case 1:
// 			break;
// 			//Incoming audio call
// 			case 2:
// 			console.log('语音来电')
// 			/*
// 				setDialogTitle('语音来电');

// 				$('#divCaller').text(e.remoteNum);
// 				$('#tdAudio').show();
// 				$('#tdCallOut').hide();
// 				$('#tdVideo').hide();
// 				$('#tdVideoBtn').hide();
// 				showDialogCall(e.remoteNum);
// 			*/
// 			break;
// 			//Incoming video call
// 			case 3:
// 			console.log('视频来电')
// 			/*
// 				setDialogTitle('视频来电');

// 				$('#divCaller').text(e.remoteNum);
// 				$('#tdAudio').show();
// 				$('#tdCallOut').hide();
// 				$('#tdVideo').show();
// 				$('#tdVideoBtn').show();
// 				//$('#tdVideo').hide();

// 				showDialogCall(e.remoteNum);
// 				*/

// 			break;
// 			case 4:
// 			break;
// 			//Early media started
// 			case 5:
// 			/*
// 				$('#tdAudio').hide();
// 				$('#tdCallOut').hide();
// 				$('#tdVideo').show();
// 				*/
// 			break;
// 			//Remote ringing
// 			case 6:
// 			break;
// 			//Terminating the call...
// 			case 7:
// 			break;
// 			//call hangup
// 			case 8:
// 				//$('#btnCancelCallOut').html('挂断');
// 			break;
// 			//call Terminated
// 			case 9:
// 				//$('#callingDlg').modal('hide');
// 			break;
// 			//answer audio call
// 			case 10:
// 				//$('#btnCancelCallOut').html('挂断');
// 				//$('#tdAudio').hide();
// 				//$('#tdCallOut').show();
// 				//$('#tdVideo').hide();
// 			break;
// 			//answer video call
// 			case 11:
// 				//$('#tdAudio').hide();
// 				//$('#tdCallOut').hide();
// 				//$('#tdVideo').show();
// 				//$('#tdVideoBtn').hide();
// 			break;
// 		}
// 	},
// 	onPhoneCallMsgCB (e) {
// 		switch (e.type){
// 			//dont support WebSocket!
// 			case 1:
// 			break;
// 			//dont support WebRtc!
// 			case 2:
// 			break;
// 			//sip registered
// 			case 3:
// 			break;
// 			//sip unregistered
// 			case 4:
// 			break;
// 			//register failed
// 			case 5:
// 			break;
// 			//Disconnected
// 			case 6:
// 			break;
// 			case 7:
// 			break;
// 		}
// 	},
// 	setDialogTitle(title) {
// 		//$('#hTitle').text(title);
// 	},
// 	showDialogCall() {
// 		//$('#callingDlg').modal({backdrop:'static',keyboard:false});
//     },
//     sipAudioCall (phoneNum, phoneName){
// 		PhoneCall.sipAudioCall(phoneNum, phoneName);
// 		console.log('语音去电')
// 	},
// 	sipVideoCall (phoneNum, phoneName){
// 		PhoneCall.sipVideoCall(phoneNum, phoneName);
// 		console.log('视频去电');

// 		PhoneCallModule.showDialogCall();
//     },
//     sipAnswer (){
// 		PhoneCall.sipAnswer();
//     },
//     sipHangUp (){
// 		PhoneCall.sipHangUp();
//     },
//     sipUnRegister (){
// 		PhoneCall.sipUnRegister();
//     },
//     sipRegister (){
//         var callCredential = {
// 			displayName: 'test3',
// 			privateIdentity: '10002',
// 			webSocketServerUrl: 'wss://124.192.215.9:10062',
// 			sipOutboundProxyUrl: 'udp://172.16.170.47:7766',
// 			iceServers:'[]',
// 			password: '1234',
// 			authToken:result
//         };
//         // debugger;
//         PhoneCall.sipRegister(callCredential);


// 		/*
// 		var paraStr = "data=" + $('#edtExtension').val();

// 		$.post(SERVER_ADDR,paraStr,function(result){
// 			var result = JSON.parse(result);
// 				if (result.success === 'true') {
// 				var callCredential = {
// 					displayName: $('#edtFullName').val(),
// 					privateIdentity: $('#edtExtension').val(),
// 					webSocketServerUrl: $('#edtWebSocketServerAddr').val(),
// 					sipOutboundProxyUrl: $('#edtSIPServerAddr').val(),
// 					iceServers:'[]',
// 					password: $('#edtUsrPwd').val(),
// 					authToken:result;
// 				};
// 				PhoneCall.sipRegister(callCredential);
// 			}
// 		});
// 		*/

//     },
//     initialize (){
// 		//设置控件，回调方法等
// 		var phoneSettings = {
// 			videoLocal: document.getElementById("video_local"),
// 			videoRemote: document.getElementById("video_remote"),
// 			audioRemote: document.getElementById("audio_remote"),
// 			phoneCallMsgCB: onPhoneCallMsgCB,
// 			onCallStateChanged: onCallStateChanged
// 		}

// 		PhoneCall.initPhoneCall(phoneSettings);
//     },
//     onload () {
//         return PhoneCallModule.initialize
//     }
// }

export var PhoneCallModule =(function () {
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
			console.log('语音来电')
			/*
				setDialogTitle('语音来电');

				$('#divCaller').text(e.remoteNum);
				$('#tdAudio').show();
				$('#tdCallOut').hide();
				$('#tdVideo').hide();
				$('#tdVideoBtn').hide();
				showDialogCall(e.remoteNum);
			*/
			break;
			//Incoming video call
			case 3:
			console.log('视频来电')
			/*
				setDialogTitle('视频来电');

				$('#divCaller').text(e.remoteNum);
				$('#tdAudio').show();
				$('#tdCallOut').hide();
				$('#tdVideo').show();
				$('#tdVideoBtn').show();
				//$('#tdVideo').hide();

				showDialogCall(e.remoteNum);
				*/

			break;
			case 4:
			break;
			//Early media started
			case 5:
			/*
				$('#tdAudio').hide();
				$('#tdCallOut').hide();
				$('#tdVideo').show();
				*/
			break;
			//Remote ringing
			case 6:
			break;
			//Terminating the call...
			case 7:
			break;
			//call hangup
			case 8:
				//$('#btnCancelCallOut').html('挂断');
			break;
			//call Terminated
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
		// var callCredential = {
		// 	displayName: $('#displayName').val(),
		// 	privateIdentity: $('#privateIdentity').val(),
		// 	webSocketServerUrl: $('#webSocketServerUrl').val(),
		// 	sipOutboundProxyUrl: $('#sipOutboundProxyUrl').val(),
		// 	iceServers:'[]',
		// 	password: $('#password').val(),
		// 	authToken:result
        // };
        var callCredential = {
            			displayName: 'test3',
            			privateIdentity: '10002',
            			webSocketServerUrl: 'wss://124.192.215.9:10062',
            			sipOutboundProxyUrl: 'udp://172.16.170.47:7766',
            			iceServers:'[]',
            			password: '1234',
            			authToken:result
                    };

		PhoneCall.sipRegister(callCredential);

		/*
		var paraStr = "data=" + $('#edtExtension').val();

		$.post(SERVER_ADDR,paraStr,function(result){
			var result = JSON.parse(result);
				if (result.success === 'true') {
				var callCredential = {
					displayName: $('#edtFullName').val(),
					privateIdentity: $('#edtExtension').val(),
					webSocketServerUrl: $('#edtWebSocketServerAddr').val(),
					sipOutboundProxyUrl: $('#edtSIPServerAddr').val(),
					iceServers:'[]',
					password: $('#edtUsrPwd').val(),
					authToken:result;
				};
				PhoneCall.sipRegister(callCredential);
			}
		});
		*/

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
