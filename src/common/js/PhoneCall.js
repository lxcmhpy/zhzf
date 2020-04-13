
var PhoneCall=function() {
    var f,h,b,l,x,y,z,q,A,B,k,C=!1,r,t,D,m="",E="",F="",G="",H="",I="",u="",J="[]",d=function(a) {r&&r(a)},g=function(a) {t&&t(a)},v=function(a) {
        tsk_utils_log_info("==session event = "+a.type); switch(a.type) {
            case "connecting": case "connected": var c="connected"==a.type; if(a.session==h) g({type: 3,msg: "registered."}); else if(a.session==b) {
                var e=b.o_session.media.e_type.s_name; "audio/video"===e&&(e="video"); "connecting"===a.type&&d({
                    type: 1,msg: "call connecting.",callType: e,remoteNum: b.o_session.o_uri_to.s_user_name,
                    remoteName: D
                }); "connected"===a.type&&("audio"===b.o_session.media.e_type.s_name? d({type: 10,msg: "audio call connected."}):"audio/video"===b.o_session.media.e_type.s_name&&d({type: 11,msg: "video call connected."})); c&&(n(),p(),q&&(q.cancel(),q=null)); SIPml.isWebRtc4AllSupported()
            } break; case "terminating": case "terminated": a.session==h? (h=b=null,g({type: 4,msg: "unregistered."})):a.session==b&&(b=null,n(),p(),d({type: 9,msg: "call Terminated."})); break; case "i_ect_new_call": l=a.session; break; case "i_ao_request": if(a.session==
                b&&(a=a.getSipResponseCode(),180==a||183==a)) {try {ringbacktone.play()} catch(K) {} d({type: 6,msg: "Remote ringing..."})} break; case "m_early_media": a.session==b&&(n(),p(),"audio/video"===b.o_session.media.e_type.s_name&&d({type: 5,msg: "Early media started"})); break; case "m_local_hold_ok": a.session==b&&(b.bTransfering&&(b.bTransfering=!1),b.bHeld=!0); break; case "m_local_hold_nok": a.session==b&&(b.bTransfering=!1); break; case "m_local_resume_ok": a.session==b&&(b.bTransfering=!1,b.bHeld=!1,SIPml.isWebRtc4AllSupported());
                break; case "m_local_resume_nok": a.session==b&&(b.bTransfering=!1); break; case "o_ect_completed": case "i_ect_completed": a.session==b&&(btnTransfer.disabled=!1,l&&(b=l),l=null); break; case "o_ect_notify": case "i_ect_notify": a.session==b&&300<=a.getSipResponseCode()&&b.bHeld&&b.resume(); break; case "i_ect_requested": a.session==b&&(a="Do you accept call transfer to ["+a.getTransferDestinationFriendlyName()+"]?",confirm(a)? b.acceptTransfer():b.rejectTransfer())
        }
    },L=function(a) {
        tsk_utils_log_info("==stack event = "+
            a.type); switch(a.type) {
                case "started": try {h=this.newSession("register",{expires: 200,events_listener: {events: "*",listener: v},sip_caps: [{name: "+g.oma.sip-im",value: null},{name: "+audio",value: null},{name: "language",value: '"en,fr"'}]}),h.register()} catch(K) {g({type: 5,msg: "register failed."})} break; case "stopping": case "stopped": case "failed_to_start": case "failed_to_stop": b=h=f=null; n(); p(); C=!1; g({type: 6,msg: "Disconnected."}); break; case "i_new_call": if(b) a.newSession.hangup(); else {
                    b=a.newSession; b.setConfiguration(k);
                    try {ringtone.play()} catch(K) {} var c=b.getRemoteFriendlyName()||"unknown",e=""; a.o_event&&a.o_event.o_message&&a.o_event.o_message.o_hdr_From&&(e=a.o_event.o_message.o_hdr_From.s_display_name); "audio"===b.o_session.media.e_type.s_name? d({type: 2,remoteNum: c,remoteName: e,callType: "audio",msg: "Incoming audio call"}):"audio/video"===b.o_session.media.e_type.s_name&&d({type: 3,remoteNum: c,remoteName: e,callType: "video",msg: "Incoming video call"})
                }
            }
    },w=function(a,c,e) {
        D=e; !f||b||tsk_string_is_null_or_empty(c)?
            b&&b.accept(k):(window.localStorage&&(k.bandwidth=tsk_string_to_object(window.localStorage.getItem("org.doubango.expert.bandwidth")),k.video_size=tsk_string_to_object(window.localStorage.getItem("org.doubango.expert.video_size"))),b=f.newSession(a,k),0!=b.call(c)? (b=null,d({type: 0,msg: "Failed to make call."})):b.o_session.o_uri_to.s_display_name=c)
    },M=function() {
        SIPml.isWebRtcSupported()||(console.log("dont support WebRTC!"),g({type: 2,msg: "dont support WebRtc!"})); SIPml.isWebSocketSupported()? (A=
            y,B=x,SIPml.isWebRtcSupported()||(console.log("dont support WebRtc!"),g({type: 2,msg: "dont support WebRtc!"})),document.body.style.cursor="default",k={audio_remote: z,video_local: A,video_remote: B,screencast_window_id: 0,bandwidth: {audio: void 0,video: void 0},video_size: {minWidth: void 0,minHeight: void 0,maxWidth: void 0,maxHeight: void 0},events_listener: {events: "*",listener: v},sip_caps: [{name: "+g.oma.sip-im"},{name: "language",value: '"en,fr"'}]}):(console.log("dont support WebSocket!"),g({type: 1,msg: "dont support WebSocket!"}))
    },
        p=function() {try {ringtone.pause()} catch(a) {} },n=function() {try {ringbacktone.pause()} catch(a) {} }; return {
            initPhoneCall: function(a) {y=a.videoLocal; x=a.videoRemote; z=a.audioRemote; r=a.onCallStateChanged; t=a.phoneCallMsgCB; SIPml.init(M)},sipRegister: function(a) {
                m=a.privateIdentity; I=a.webSocketServerUrl; u=a.sipOutboundProxyUrl; J="[]"; var b=u.replace(/udp:\/\//,""); E="sip:"+m+"@"+b; F=a.password; G=a.authToken; H=b; f=new SIPml.Stack({
                    realm: H,impi: m,impu: E,password: F,display_name: m,websocket_proxy_url: I,outbound_proxy_url: u,
                    ice_servers: J,enable_rtcweb_breaker: !0,events_listener: {events: "*",listener: L},enable_early_ims: !0,enable_media_stream_cache: !1,bandwidth: window.localStorage? tsk_string_to_object(window.localStorage.getItem("org.doubango.expert.bandwidth")):null,video_size: window.localStorage? tsk_string_to_object(window.localStorage.getItem("org.doubango.expert.video_size")):null,sip_headers: [{name: "User-Agent",value: "IM-client/OMA1.0 sipML5-v1.2016.03.04"},{name: "Organization",value: "Doubango Telecom"},{
                        name: "AuthToken",
                        value: G
                    }]
                }); 0==f.start()&&(this.isRegistered=!0)
            },sipAudioCall: function(a,b) {w("call-audio",a,b)},sipVideoCall: function(a,b) {w("call-audiovideo",a,b)},sipAnswer: function() {w("call-audiovideo")},sipHangUp: function() {b&&(d({type: 7,msg: "Terminating the call..."}),b.hangup({events_listener: {events: "*",listener: v}}))},sipToggleMute: function(a) {if(b) {var c=!b.bMute; if(0==b.mute(a||"audio",c)) return b.bMute=c} },isRegistered: C,sipUnRegister: function() {f&&f.stop()}
        }
}();


