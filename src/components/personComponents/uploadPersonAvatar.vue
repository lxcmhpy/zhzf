<template>
    <el-dialog title="照片上传" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="532px">
        <div class="select-avatar">
            <span class="select-prompt">选择本地照片，上传编辑自己的头像；支持jpg、png格式的图片</span>
            <el-upload class="upload-person-img" list-type="picture-card" action="" :show-file-list="false"
                :auto-upload="false" :on-change="handleChange">
                <el-button size="cats-common">上传照片</el-button>
            </el-upload>
            <div class="cropper">
                <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType"
                    :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
                    :original="option.original" :autoCrop="option.autoCrop" :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber" :centerBox="option.centerBox" :infoTrue="option.infoTrue"
                    :fixedBox="option.fixedBox"></vueCropper>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submitAvatar">提 交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {
        VueCropper
    } from 'vue-cropper';

    export default {
        name: 'UploadPersonAvatar',
        components: {
            VueCropper
        },
        data() {
            return {
                visible: false,
                option: {
                    img: '', // 裁剪图片的地址
                    info: true, // 裁剪框的大小信息
                    outputSize: 0.8, // 裁剪生成图片的质量
                    outputType: 'png', // 裁剪生成图片的格式
                    canScale: false, // 图片是否允许滚轮缩放
                    autoCrop: true, // 是否默认生成截图框
                    autoCropWidth: 165, // 默认生成截图框宽度
                    autoCropHeight: 250, // 默认生成截图框高度
                    fixedBox: false, // 固定截图框大小 不允许改变
                    fixed: true, // 是否开启截图框宽高固定比例
                    fixedNumber: [3, 4.2], // 截图框的宽高比例
                    full: true, // 是否输出原图比例的截图
                    canMoveBox: true, // 截图框能否拖动
                    original: false, // 上传图片按照原始比例渲染
                    centerBox: false, // 截图框是否被限制在图片里面
                    infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
                },
                picsList: [], //页面显示的数组
                loading: false,
                selectFile: null
            }
        },
        methods: {
            // 打开弹出窗口
            openDialog() {
                this.visible = true;
            },
            // 选择照片
            handleChange(file, fileList) {
                const isGt2M = file.size / 1024 / 1024 > 2
                if (isGt2M) {
                    this.catsMessage({
                        message: '上传文件大小不能超过 2MB!',
                        type: 'warning'
                    });
                    return;
                }
                this.$nextTick(() => {
                    this.selectFile = file;
                    this.option.img = file.url;
                })
            },
            // 提交
            submitAvatar() {
                this.$refs.cropper.getCropData((data) => {
                    this.$emit('showAvatar', data);
                })
                this.$refs.cropper.getCropBlob((data) => {
                    const file = new File([data], this.selectFile.name, {
                        type: this.selectFile.raw.type,
                        lastModified: Date.now()
                    });
                    this.$emit('submitAvatar', file);
                    this.closeDialog();
                });
            },
            closeDialog() {
                this.option.img = '';
                this.visible = false;
            }
        }
    }

</script>
<style lang="scss" scoped>
    @import "@/assets/scss/page/personManage.scss";

    .cropper {
        width: 492px;
        height: 320px;

        >>>.vue-cropper {
            background-image: none;
            background: rgba(216, 216, 216, 1);
        }
    }

</style>
