<template>
    <div class="spec-container">
        <pbInput :title="title" v-if="!sepcType" v-model="specifications"></pbInput>
        <div class='spec-warp' v-else  @click="showPicke">
            <div class='item' style='width:180rpx'>
                厚
                <div class='value'>{{ params.height }}</div>
            </div>
            <div class='item'>
                宽
                <div class='value'>{{ params.width }}</div>
            </div>
            <div class='item no-mr'>
                长
                <div class='value'>{{ params.length }}</div>
            </div>
        </div>
    
    
        <div class='spec-picker' v-if="specPickshow">
            <div class='from-group'>
                <div class='group-item'>
                    <label class='label'>厚</label>
                    <input class='input' v-model="params.height" placeholder="请输入" />
                </div>
                <div class='group-item'>
                    <label class='label'>宽</label>
                    <input class='input' v-model="params.width" placeholder="请输入" />
                </div>
                <div class='group-item'>
                    <label class='label'>长</label>
                    <input class='input' v-model="params.length" placeholder="请输入" />
                </div>
            </div>
    
    
            <div class='rd-contnet'>
                <div class='tit'>推荐规格</div>
                <div v-for="(item,index) in rdList" :key="item.id">
                    <a class='rd-item' @click="fillData(index)">{{ item.height ? item.height + '*' : '' }}{{ item.width }}*{{ item.length }}</a>
                </div>
            </div>
            <div class="btn-save" @click="save">保存</div>
            <div class="btn-cancel" @click="close">返回</div>
        </div>
    </div>
</template>

<script>
    import pbInput from '@/components/basic/pbInput.vue'
    export default {
        props: {
            ironType: {
                type: Object,
                default: function() {
                    return {
                        id: '',
                        name: ''
                    }
                }
            },
            surface: {
                type: Object,
                default: function() {
                    return {
                        id: '',
                        name: ''
                    }
                }
            },
            title: {
                type: String,
                default: ''
            },
            placeholderShow: {
                type: Boolean,
                default: true
            },
            inType: {
                type: String,
                default: 'text'
            },
            spec: {
                type: String,
                default: '***'
            },
            value: {
                type: Object,
                default: function() {
                    return {
                        width: '',
                        height: '',
                        length: '',
                        specifications: ''
                    }
                }
            }
        },
        watch: {
            ironType(val) {
                if (this.sepcType) {
                    this.specifications = '';
                } else {
                    this.params.width = '';
                    this.params.length = '';
                    this.params.height = '';
                }
                this.emitData();
            },
            spec(val) {
                let spec = val.split("*");
                this.params.height = spec[0];
                this.params.width = spec[1];
                this.params.length = spec[2];
            },
            specifications(val) {
                this.params.width = '';
                this.params.length = '';
                this.params.height = '';
                this.emitData();
            }
        },
        components: {
            pbInput
        },
        data() {
            return {
                specPickshow: false,
                rdList: [],
                specifications: '',
                params: {
                    ironType: '',
                    surface: '',
                    width: '',
                    length: '',
                    height: ''
                }
            }
        },
        computed: {
            sepcType() {
                return this.ironType.name == '不锈钢板' || this.ironType.name == '不锈钢卷'
            }
        },
        methods: {
            getBy5() {
                this.$http.post('/api/query/findIronAndSurfaceAndSpecificationlist', this.params).then(res => {
                    if (res.code === 1000) {
                        this.rdList = res.data
                    }
                })
            },
            getBy2() {
                this.$http.post('/api/query/findIronAndSurfaceAndSpecificationHeightAndLength', {
                    surface: this.params.surface,
                    ironType: this.params.ironType
                }).then(res => {
                    if (res.code === 1000) {
                        this.rdList = res.data
                    }
                })
            },
            showPicke() {
                this.specPickshow = true;
                this.params.ironType = this.ironType.id;
                this.params.surface = this.surface.id
                this.getBy5();
            },
            close() {
                this.specPickshow = false
            },
            // 根据多想参数获取推荐
            fillData(index) {
                let data = this.$clearData(this.rdList[index]);
                if (data.height) {
                    this.params = {
                        width: data.width,
                        length: data.length,
                        height: data.height,
                        specifications: ''
                    }
                } else {
                    this.params = {
                        width: data.width,
                        length: data.length,
                        specifications: ''
                    }
                }
            },
            emitData() {
                this.$emit('input', {
                    width: this.params.width,
                    height: this.params.height,
                    length: this.params.length,
                    specifications: this.specifications
                })
            },
            save() {
                this.close();
                this.specifications = '';
                this.emitData();
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../style/mixin.less');
    .spec-container {
        .spec-warp {
            width: 100%;
            font-size: .14rem;
            color: #333;
            display: flex;
            flex-wrap: wrap;
        }
        .spec-warp .item {
            position: relative;
            width: 100%/3;
            height: .44rem;
            line-height: .44rem;
            border-right: .01rem solid #ddd;
            padding: 0 .1rem;
            box-sizing: border-box;
            text-align: left;
            color: #666;
        }
        .item.no-mr {
            margin-right: 0;
        }
        .item .value {
            position: absolute;
            right: .12rem;
            top: 0;
            color: #333;
        }
        .spec-picker {
            width: 100%;
            height: 100%;
            position: fixed;
            background-color: #F4F5F5;
            left: 0;
            top: 0;
            z-index: 1001;
        }
        .spec-picker .from-group {
            width: 100%;
            box-sizing: border-box;
            background-color: #fff;
            padding-left: .1rem;
            margin-top: .12rem;
        }
        .spec-picker .from-group.pd20 {
            padding: .1rem;
        }
        .spec-picker .from-group .group-item {
            position: relative;
            display: block;
            width: 100%;
            min-height: .48rem;
            line-height: .48rem;
            border-bottom: .01rem solid #ddd;
            color: #333;
        }
        .spec-picker .from-group .group-item:last-child {
            border-bottom: 0;
        }
        .group-item .label {
            font-size: .16rem;
        }
        .group-item .value {
            position: absolute;
            width: 3rem;
            text-align: right;
            right: .2rem;
            top: 0;
            font-size: .15rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .group-item .input {
            position: absolute;
            display: inline-block;
            width: 2.5rem;
            height: .48rem;
            line-height: .48rem;
            right: .1rem;
            top: 0;
            font-size: .15rem;
            text-align: right;
        }
        .rd-contnet {
            width: 100%;
            box-sizing: border-box;
            padding: 0 .1rem;
        }
        .rd-contnet .tit {
            display: block;
            color: #333;
            font-size: .14rem;
            margin-top: .15rem;
        }
        .rd-contnet .rd-item {
            display: inline-block;
            background-color: #3389ff;
            color: #fff;
            font-size: .14rem;
            box-sizing: border-box;
            padding: .05rem .15rem;
            border-radius: .5rem;
            margin: .1rem 0 0 .1rem;
        }
        .btn-save {
            position: fixed;
            width: 3.45rem;
            height: .44rem;
            bottom: .6rem;
            left: .15rem;
            background-color: #1875F0;
            text-align: center;
            line-height: .44rem;
            color: #fff;
            .borderRadius;
        }
        .btn-cancel {
            position: fixed;
            width: 3.45rem;
            height: .44rem;
            bottom: .1rem;
            left: .15rem;
            background: #fff;
            color: #1875F0;
            border: .02rem solid #1875F0;
            text-align: center;
            line-height: .44rem;
            .borderRadius;
        }
    }
</style>
