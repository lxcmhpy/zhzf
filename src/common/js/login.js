
import { mapGetters } from "vuex";
import iLocalStroage from "@/common/js/localStroage";
// 滑动验证
import VueSimpleVerify from 'vue-simple-verify';

import {
    getCurrentUserApi, getHost, resetPasswordApi
} from "@/api/login";
import {
    getDictListDetailByNameApi, hasUsernameLoginApi, updatePassWordApi, appDownloadApi,
} from "@/api/system";
import { encryption, encrypt, decrypt, decryption } from "@/common/js/cryptoAes";
export const loginMethods = {
    data() {
        return {
            formLayout: "vertical",
            captchaId: '',   //验证码id
            captchaImg: '',   //验证码图片src
            loginForm: {
                username: "",
                password: "",
                code: ''
            },
            resetForm: {
                username: "",
                nickName: "",
                enforceNo: ''
            },
            editForm: {
                username: "",
                password: "",
                newPassword: '',
                repetPassword: '',
            },
            rules: {
                username: [
                    { required: true, message: ' ', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: ' ', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请完成验证', trigger: 'blur' }
                ],

            },
            resetRules: {
                username: [
                    { required: true, message: '请输入账号名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: ' ', trigger: 'blur' }
                ],
                nickName: [
                    { required: true, message: '请输入执法人员名称', trigger: 'blur' }
                ],
                enforceNo: [
                    { required: true, message: '请输入执法证件号', trigger: 'blur' }
                ],
            },
            eidtRules: {
                username: [
                    { required: true, message: '请输入账号名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '密码至少八个字符，至少一个字母和一个数字', trigger: 'blur' }
                ],
                // repetPassword: [
                //   { required: true, message: '请重复输入新密码', trigger: 'blur' },
                //   { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '密码至少八个字符，至少一个字母和一个数字', trigger: 'blur' }
                // ],
            },
            hasUserError: false,
            haspasswordError: false,
            showLogin: false,
            errorMessage: '',
            errorPwd: '',
            check: true,
            success: false,
            weChatFlag: false,
            resetFlag: false,
            editFlag: false,
            timeOutFlag: "",
            menuList: null,
            systemTitleLogin: null,
            loginImgSrc: '',
            appDownHref: '',
            isShow: true,//是否有登录滑动验证
            // 滑动验证
            beginClientX: 0,           /*距离屏幕左端距离*/
            mouseMoveStata: false,     /*触发拖动状态  判断*/
            maxwidth: '',               /*拖动最大宽度，依据滑块宽度算出来的*/
            confirmWords: '拖动滑块验证',   /*滑块文字*/
            success: false           /*验证成功判断*/
        };
    },
    inject: ['reload'],
    computed: { ...mapGetters(['systemTitle']) },

    methods: {
        // 切换登录方式
        changeType(type) {
            console.log(type)
            if (type == 1) {
                this.check = true;
            }
            if (type == 2) {
                this.check = false;
            }

        },
        //登录
        submitLogin(formName) {

            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (!_this.isShow) {
                        _this.success = true;
                    }
                    // 验证码
                    if (_this.success) {
                        let values = {
                            username: _this.loginForm.username,
                            password: encrypt(_this.loginForm.password),
                            code: ''
                        }
                        values.captchaId = _this.captchaId;

                        _this.$store.dispatch("loginIn", values).then(
                            res => {
                                // 登录成功
                                // 清除定时器

                                // 重置验证
                                _this.success = false;
                                this.beginClientX = 0
                                // this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
                                //   重置样式
                                // this.$refs.moveDiv.style = 'position: absolute;top: 0px;left: 0px;'
                                // if (type == 1) {
                                // this.$refs.textDiv.removeAttribute("class")
                                // this.$refs.textDiv.setAttribute("className", "drag_text")
                                // document.getElementsByClassName('drag_bg')[0].style.width = 0
                                // this.confirmWords = '拖动滑块验证';
                                // }

                                // document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn);
                                // document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn)
                                _this.getCurrentUser();
                            }
                        );
                    } else {
                        _this.errorMessage = '验证错误,请重试，3秒后自动消失'
                        setTimeout(() => {
                            _this.errorMessage = ""
                        }, 3000)
                    }
                } else {
                    this.errorPwd = '用户名或密码错误，请重新输入，3秒后自动消失'
                    setTimeout(() => {
                        _this.errorPwd = ""
                    }, 3000)
                }
            });
        },
        getMenu() {
            let _this = this
            this.$store.dispatch("getMenu").then(
                res => {
                    _this.menuList = res.data;
                    _this.$store.commit("SET_MENU", _this.menuList);
                    _this.$store.commit("SET_ACTIVE_INDEX_STO", "law_supervise_lawSupervise");
                    _this.$store.commit('set_Head_Active_Nav', "lawSupervise-menu-law_supervise_lawSupervise");
                    _this.$router.push({ name: "law_supervise_lawSupervise" });
                },
                err => {
                    console.log(err);
                }
            )
        },
        //获取当前登录用户的信息
        getCurrentUser() {
            let _this = this;
            // new Promise((resolve, reject) => {
            getCurrentUserApi().then(res => {
                if (res.data.passwordStatus == '0') {
                    // 判断是否修改过密码
                    this.$message({ message: '当前账号首次登录，请重新设置密码', type: 'warning' });
                    this.editFlag = true
                    this.editForm.username = this.loginForm.username
                    this.editForm.password = this.loginForm.password
                } else {
                    // 登录后默认跳转至host.json文件中配置的首页
                    this.$router.push({ name: sessionStorage.getItem('HOME_PAGE_ROUTER_NAME') })

                    res.data.encryptionUserName = encryption(this.loginForm.username)
                    res.data.encryptionPassword = encryption(this.loginForm.password)
                    iLocalStroage.sets('userInfo', res.data);
                }
            }, err => {
                console.log(err);
            })
            // })
        },
        // 忘记密码
        resetChange(flag) {
            this.resetFlag = flag;
        },

        //重置密码
        resetPwd(resetForm) {

            let _this = this
            this.$refs[resetForm].validate((valid) => {
                if (valid) {
                    // 重置密码
                    resetPasswordApi(_this.resetForm).then(
                        res => {
                            if (res.code == 200) {
                                _this.$message({
                                    type: "success",
                                    message: "修改成功，请返回登录"
                                });
                                console.log(res);

                            } else {
                                this.$message({ type: 'error', message: res.message });
                            }
                        },
                        error => {
                            this.$message({ type: 'error', message: '执法人员姓名输入错误' });
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                }
            });
        },
        // 忘记密码
        editChange(flag) {
            this.editFlag = flag;
        },
        // 修改密码
        editPwd(editForm) {
            this.$refs[editForm].validate((valid) => {
                if (valid) {
                    // if (this.editForm.newPassword == this.editForm.repetPassword) {
                    hasUsernameLoginApi(this.editForm.username).then(
                        res => {
                            let data = {
                                id: res.id,
                                newPassword: this.editForm.newPassword,
                                oldPassword: this.editForm.password
                            }
                            updatePassWordApi(data).then(
                                res => {
                                    if (res.code == 200) {
                                        this.$message({
                                            type: "success",
                                            message: res.msg
                                        });
                                        this.editFlag = false;
                                        this.reload();
                                    } else {
                                        this.$message.error(res.msg);
                                    }
                                },
                                error => {
                                    this.$message.error(res.msg);
                                })
                        },
                        error => {

                        })
                    // } else {
                    //   this.$message.error('两次输入密码不一致');
                    // }
                }
            })

        },
        //获取系统标题
        async getSystemData() {
            // let _this = this;

            // console.log('加密',a);
            // let b = decrypt(a);
            // console.log('解密',b);

            // let bb = encrypt(JSON.stringify({'haha':'ni','name':null}));
            // let cc = decrypt(bb);
            // console.log('解密',cc)
            let res = await getDictListDetailByNameApi('系统标题');
            console.log('系统标题', res)
            // console.log('系统标题2', decrypt(res.data))
            this.systemTitleLogin = res.data[0].name;
            this.$store.commit('set_systemTitle', this.systemTitleLogin);
            window.document.title = res.data[0].name;
            //设置省份
            this.$store.commit('setProvince', res.data[2] && res.data[2].name ? res.data[2].name : '');
            //是否需要签章
            this.$store.commit('setShowQZBtn', res.data[1] && res.data[1].name == '是' ? true : false)
            //获取登录背景图片
            let imgRes = '';
           
            imgRes = await getDictListDetailByNameApi('loginBg');
            console.log('loginBg', imgRes)
            if(imgRes.data.length >0){
                this.loginImgSrc = './static/images/img/login/' + imgRes.data[0].name + '.jpg';
            }else{
                this.loginImgSrc = './static/images/img/login/zf_bg.jpg'
            }
               
            
            //是否显示‘综合执法平台’
            let dataRes1 = await getDictListDetailByNameApi('显示综合执法平台');
            if(dataRes1.length >0){
                this.$store.commit('setShowZHZFPT', dataRes.data[0].name)
            }

            //是否显示滑动验证
            let dataRes = await getDictListDetailByNameApi('登录滑动验证');
            console.log('是否显示滑动验证', dataRes);


            // let dataRes2 =JSON.parse(decrypt(dataRes.data));
            // console.log('dataRes2',dataRes2)
            if (dataRes.data.length > 0) {
                // console.log(Number(dataRes2.data[0].name))
                this.isShow = Number(dataRes.data[0].name) ? true : false;
            }

        },
        loadImg() {
            this.$store.dispatch("setLoadingState", { flag: false });
        },
        //获取app下载地址
        getAppDownHref() {
            appDownloadApi().then(res => {
                console.log(res);
                // let host = window.location.host;
                this.appDownHref = res.data;
                console.log(this.appDownHref)
            }).catch(err => {
                throw new Error(err)
            })
        },
        mousedownFn: function (e) {
            if (!this.success) {
                e.preventDefault && e.preventDefault();   //阻止文字选中等 浏览器默认事件
                this.mouseMoveStata = true;
                this.beginClientX = e.clientX;
            }
        },
        successFunction() {
            this.success = true
            this.confirmWords = '验证通过';
            if (window.addEventListener) {
                document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMoveFn);
                document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.moseUpFn);
            } else {
                document.getElementsByTagName('html')[0].removeEventListener('mouseup', () => { });
            }
            document.getElementsByClassName('drag_text')[0].style.color = '#fff'
            document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px';
            document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px';
        },                //验证成功函数
        mouseMoveFn(e) {
            if (this.mouseMoveStata) {
                let width = e.clientX - this.beginClientX;
                if (width > 0 && width <= this.maxwidth) {
                    document.getElementsByClassName('handler')[0].style.left = width + 'px';
                    document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
                } else if (width > this.maxwidth) {
                    this.successFunction();
                }
            }
        },                   //mousemove事件
        moseUpFn(e) {
            this.mouseMoveStata = false;
            var width = e.clientX - this.beginClientX;
            if (width < this.maxwidth) {
                document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
                document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
            }
        },                    //mouseup事件
        close(type) {
            this.mouseMoveStata = false
            this.success = false
            this.beginClientX = 0
            this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
            //   重置样式
            this.$refs.moveDiv.style = 'position: absolute;top: 0px;left: 0px;'
            if (type == 1) {
                this.$refs.textDiv.removeAttribute("class")
                this.$refs.textDiv.setAttribute("className", "drag_text")
                document.getElementsByClassName('drag_bg')[0].style.width = 0
                this.confirmWords = '拖动滑块验证';
            }
            document.removeEventListener('click', el.__vueClickOutside__);
            document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn);
            document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn)
        },
        removeClass(el, className) {
            // 删除样式
            if (!this.hasClass(el, className)) return
            let newClassName = el.className.split(' ')
            let index = newClassName.findIndex(item => {
                return item == className
            })
            newClassName.splice(index, 1)
            el.className = newClassName.join(' ')
        },
        enter() {
            this.weChatFlag = true
        },
        leave() {
            this.weChatFlag = false
        },
    },
    async created() {
        // this.$store.dispatch("setLoadingState", { flag: true, type: 'loadFull' });
        // await getHost();
        await this.getSystemData();
        this.getAppDownHref();
    },
    mounted() {
        this.showLogin = true;
        this.maxwidth = 390;
        document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn);
        document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn)
    },
    components: {
        VueSimpleVerify
    },
    destroyed() {
        clearTimeout(this.timeOutFlag);
    }
}