<!-- 推荐评查专家 -->
<template>
    <div class="cats-layout-page-content">
        <div class="searchAndpageBox toggleBox">
            <div class="handlePart" style="margin-left: 0px;">
                <div class="search">
                    <el-form :inline="true" :model="form" ref="form">
                        <div v-if="form.state==='0'">
                            <el-form-item>
                                <el-button type="primary" size="cats-common" @click="sumbmit">确认上报</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
            <div>
                <el-form ref="form1" :model="form1" :resizable="false" :border="false" :rules="rules"
                    label-position="top" label-width="80px" size="small">
                    <el-table v-if="form.state==='0'" :data="form1.list" border style="width: 100%;">
                        <el-table-column prop="name" label="专家姓名">
                            <template slot-scope="scope">
                                <el-form-item label-width="0" :prop="'list.' + scope.$index + '.name'"
                                    :rules="rules.name">
                                    <el-input v-model.trim="scope.row.name" :disabled="isread"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="unit" label="单位">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    <el-input v-model="scope.row.unit" :disabled="isread"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="certType" label="现持执法证类型">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    <el-select v-model="scope.row.certType" clearable placeholder="请选择"
                                        :disabled="isread">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="certNo" label="现持执法证号">
                            <template slot-scope="scope">
                                <el-form-item v-if="scope.row.certType==='省发执法证'" label-width="0" :prop="'list.' + scope.$index + '.certNo'">
                                    <el-input v-model="scope.row.certNo" :disabled="isread"></el-input>
                                </el-form-item>
                                <el-form-item v-else label-width="0" :prop="'list.' + scope.$index + '.certNo'"
                                    :rules="scope.row.certType==='海事执法证'?rules.maritimeNo:rules.ministerialNo">
                                    <el-input v-model="scope.row.certNo" :disabled="isread"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="specializedFields" label="擅长从事的执法门类" width="150">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                      <el-input v-model="scope.row.specializedFields" :disabled="isread"></el-input>
                                  </el-form-item>
                                <!-- <el-select v-model="scope.row.specializedFields" clearable placeholder="请选择"
                                    :disabled="isread">
                                    <el-option v-for="item in optionsFields" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="hasLawCert" label="是否持有法律职业资格证" width="180">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    <el-radio v-model="scope.row.hasLawCert" label="1" :disabled="isread">是</el-radio>
                                    <el-radio v-model="scope.row.hasLawCert" label="0" :disabled="isread">否</el-radio>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="contactNumber" label="联系电话">
                            <template slot-scope="scope">
                                <el-form-item label-width="0" :prop="'list.' + scope.$index + '.contactNumber'"
                                    :rules="rules.contactNumber">
                                    <el-input v-model="scope.row.contactNumber" :disabled="isread"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="form.state==='0'" label="操作" width="50">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    <el-tooltip v-if="!isread" class="item" effect="dark" content="保存"
                                        placement="bottom">
                                        <el-button type="text" @click="save(scope.row)"><i style="font-size:20px"
                                                class="el-icon-check"></i></el-button>
                                    </el-tooltip>
                                    <el-tooltip v-if="isread" class="item" effect="dark" content="编辑"
                                        placement="bottom">
                                        <el-button type="text" @click="edit(scope.row)"><i style="font-size:20px"
                                                class="el-icon-edit"></i></el-button>
                                    </el-tooltip>
                                </el-form-item>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-table v-if="form.state==='1'" :data="form1.list" border style="width: 100%;">
                        <el-table-column prop="name" label="专家姓名">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    {{scope.row.name}}
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="unit" label="单位">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    {{scope.row.unit}}
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="certType" label="现持执法证类型">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    {{scope.row.certType}}
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="certNo" label="现持执法证号">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    {{scope.row.certNo}}
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="specializedFields" label="擅长从事的执法门类" width="150">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    {{scope.row.specializedFields}}
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="hasLawCert" label="是否持有法律职业资格证" width="180">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    <span v-if="scope.row.hasLawCert==='1'">是</span>
                                    <span v-if="scope.row.hasLawCert==='0'">否</span>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="contactNumber" label="联系电话">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    {{scope.row.contactNumber}}
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="form.state==='1'" label="状态" width="80">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    <span v-if="scope.row.state==='1'">已上报</span>
                                </el-form-item>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        getExpertByOid,
        addOrUpdateExperts
    } from '@/api/pykh/appraisalExam.js'
    import iLocalStroage from '@/common/js/localStroage'
    import {
        isSpecialChar,
        isInteger_8_10,
        isInteger_10,
        validatePhone
    } from '@/common/js/validator'
    import _ from 'lodash'
    export default {
        data() {
            return {
                form: {
                    organId: '',
                    name: '',
                    unit: '',
                    certType: '',
                    certNo: '',
                    specializedFields: '',
                    hasLawCert: '',
                    contactNumber: '',
                    state: '0'
                },
                rules: {
                    name: [{
                            required: true,
                            message: '请输入姓名',
                            trigger: 'blur'
                        },
                        {
                            validator: isSpecialChar,
                            trigger: 'blur'
                        }
                    ],
                    ministerialNo: [{
                        validator: isInteger_8_10,
                        trigger: 'blur'
                    }],
                    maritimeNo: [{
                        validator: isInteger_10,
                        trigger: 'blur'
                    }],
                    contactNumber: [{
                            required: true,
                            message: '请输入联系电话',
                            trigger: 'blur'
                        },
                        {
                            validator: validatePhone,
                            trigger: 'blur'
                        }
                    ]
                },
                form1: {
                    list: []
                },
                options: [{
                        value: '部发执法证',
                        label: '部发执法证'
                    },
                    {
                        value: '海事执法证',
                        label: '海事执法证'
                    },
                    {
                        value: '省发执法证',
                        label: '省发执法证'
                    }
                ],
                optionsFields: [{
                        value: '公路路政',
                        label: '公路路政'
                    },
                    {
                        value: '道路运政',
                        label: '道路运政'
                    },
                    {
                        value: '水路运政',
                        label: '水路运政'
                    },
                    {
                        value: '航道行政',
                        label: '航道行政'
                    },
                    {
                        value: '港口行政',
                        label: '港口行政'
                    },
                    {
                        value: '地方海事行政',
                        label: '地方海事行政'
                    },
                    {
                        value: '工程质量监督管理',
                        label: '工程质量监督管理'
                    }
                ],
                isread: false
            }
        },
        methods: {
            sumbmit() {
                //   var re = /^[0-9]([0-9])*$/;
                // let validata = this.form.pykhScoreDetailsVos.find(value=>value.twoSore===null || !re.test(value.twoSore))
                // if(validata){
                //     this.catsMessage({type: "warning",message: "全部评分之后才能提交"});
                //     return
                // }
                this.form = this.form1.list[0]
                this.form.state = '1'
                this.saveOrUpdate(this.form)
            },
            save(data) {
                this.saveOrUpdate(data)
            },
            edit(data) {
                this.isread = false
            },
            saveOrUpdate(data) {
                let _this = this
                this.$refs['form1'].validate(valid => {
                    if (valid) {
                        addOrUpdateExperts(data).then(
                            res => {
                                if (res.code == 200) {
                                    _this.catsMessage({
                                        type: 'success',
                                        message: '提交成功!'
                                    })
                                } else if (res.code == 502) {
                                    _this.catsMessage({
                                        type: 'warning',
                                        message: res.msg
                                    })
                                }
                                _this.loadData()
                            },
                            err => {
                                console.log(err)
                            }
                        )
                    } else {
                        return false
                    }
                })
            },
            async loadData() {
                let res = await getExpertByOid(this.form.organId)
                if (res.data) {
                    this.$set(this.form1.list, 0, res.data)
                    this.form = this.form1.list[0]
                    this.isread = true
                } else {
                    this.isread = false
                }
            }
        },
        mounted() {
            let userInfo = iLocalStroage.gets('userInfo')
            this.form.organId = userInfo.organId
            this.form1.list.push(this.form)
            this.loadData()
        }
    }

</script>
