<template>
    <div class="material_content_layout">
        <div class="content_left">
            <template>
                <div class="top-prompt-wrap">
                    <span>
                        <font class="top-prompt">限制提示：单张照片2M以内，格式为jpg或png</font>
                    </span>
                </div>
            </template>
            <template>
                <!-- 身份证材料 -->
                <materialIdNo :params="params" :idPic="materialInfo.idPic"
                    @saveIdImgSuccess="idImgSucess"></materialIdNo>
            </template>
            <template>
                <!-- 学历证明材料 -->
                <materialUpload :params="params" :savePic="materialInfo.eduPic" materialType="eduPic"
                    uploadTitle="学历证明" @saveMaterialSuccess="cacheImage"></materialUpload>
            </template>
            <template>
                <!-- 编制证明材料 -->
                <materialUpload :params="params" :savePic="materialInfo.organPic"
                    materialType="organPic" uploadTitle="编制证明" @saveMaterialSuccess="cacheImage"></materialUpload>
            </template>
            <template>
                <!-- 其他证明材料 -->
                <materialUpload :params="params" :savePic="materialInfo.otherPic"
                    materialType="otherPic" uploadTitle="其他证明" @saveMaterialSuccess="cacheImage"></materialUpload>
            </template>
        </div>
        <!-- <div class="content_right">
        <div style="margin-top:500px;">
        <el-button type="primary" round >修改</el-button>
        </div>
    </div> -->
        <!-- <div class="float-btns">
      <el-button class="edit_btn" type="primary">
        <i class="iconfont law-save" /><br />保存
      </el-button>
    </div> -->
    </div>
</template>
<script>
    import materialIdNo from './materialIdNo';
    import materialUpload from './materialUpload';
    export default {
        name: 'material', //证明材料
        props: {
            params: {
                type: Object,
                default: () => {
                    return {
                        type: 'add',
                        id: ''
                    }
                },
                required: true
            },
            materialInfo: {
                type: Object,
                default: () => {
                    return {
                        idPic: {
                            idcardFront: '',
                            idcardBack: ''
                        },
                        eduPic: '',
                        organPic: '',
                        otherPic: ''
                    }
                },
                required: true
            }
        },
        data() {
            return {}
        },
        computed: {},
        components: {
            materialIdNo,
            materialUpload
        },
        methods: {
            // 图片上传成功后缓存到人员信息中
            cacheImage(data) {
                this.$emit('uploadMaterial', data);
            },
            // 身份证照片缓存
            idImgSucess(data) {
                this.$emit('uploadPhototImg', data);
            }
        }
    }

</script>
<style lang="scss" scoped>
    .material_content_layout {
        background: #fff;

        .content_left {
            width: 100%;
            height: 100%;
            border-right: 1px solid #DDDDDD;
            float: left;
        }

        .content_right {
            margin-left: 1501px;
            width: calc(100%-1501px);
            text-align: center;
            height: 100%;
        }

        .top-prompt-wrap {
            margin: 12px 0 0 35px;

            .top-prompt {
                font-size: 14px;
                color: #7B7B7B;
            }
        }

        .float-btns {
            width: 48px;
            // height: 100px;
            position: fixed;
            right: 70px;
            bottom: 70px;

            &.float-btns .el-button {
                border-radius: 1px;
                width: 48px;
                height: 48px;
                padding: 0;
                text-align: center;
            }

            .iconfont {
                display: inline-block;
                margin-bottom: 8px;
            }
        }

        >>>.upload-material {
            >>>.el-upload--picture-card {
                box-sizing: border-box;
                border: none;
                width: 136px;
                height: 32px;
                line-height: 32px;
                margin: 18px auto;

                .el-button {
                    width: 100%;
                    background: linear-gradient(180deg, rgba(248, 248, 248, 1) 0%, rgba(238, 238, 238, 1) 100%);
                    border: 1px solid rgba(221, 221, 221, 1);
                    color: #000;

                    &:hover {
                        background: rgba(238, 238, 238, 1);
                    }
                }
            }
        }
    }

</style>
