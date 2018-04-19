<template>
    <div class="picker-container">
        <div class='picker-warp' @click="togglePicker">
            <div class='label'>{{ title }}</div>
            <div class='placeholder' v-show="multi ? multiValue == '' : active == null ">请选择</div>
            <div class='value' v-if=" multi ? multiValue != '' : active != null">{{ multi ? multiValue : list[active].name }}</div>
        </div>
    
        <div class="mask-cover" v-show="show">
            <div class="mask" @click="close"></div>
            <div class="pick-items">
                <div class='title'>
                    <p class='su'></p> {{ title }}{{ multi ? '（多选）' : '' }}
                    <a class='ok-btn' @click="pickOk" v-if="multi">确定</a>
                </div>
                <div class='item-content'>
                    <div class="picker-item" :class="multi ? item.selected ? 'active' : '' : active == index ? 'active' : ''" v-for="(item,index) in list" :key="index" @click="picke(index)">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            title: {
                type: String,
                default: '标题'
            },
            api: {
                type: String,
                default: ''
            },
            multi: {
                type: Boolean,
                default: false
            },
            value: {
                type: [Object, Array],
                default: function() {
                    return this.multi ? [] : {
                        id: '',
                        name: ''
                    }
                }
            }
        },
        data() {
            return {
                show: false,
                list: [],
                active: null,
                multiValue: '',
                resoutList: [],
                resout: {
                    id: '',
                    name: ''
                }
            }
        },
        watch: {
            resout(val){
                this.$emit('input',val)
                this.$emit('onchange',val)
            },
            resoutList(val){
                this.$emit('input',val)
                this.$emit('onchange',val)
            },
            value(val){
                if(this.multi){
                    this.resoutList = val
                }else{
                    this.resout = val
                }
            }
        },
        methods: {
            togglePicker() {
                if (!this.show && this.list.length == 0)
                    this.getList();
                this.show = !this.show;
            },
            close() {
                if (this.multi) return
                this.togglePicker();
            },
            getList() {
                if (this.api == '') return
                this.$http.post(this.api).then(res => {
                    if (res.code === 1000) {
                        let list = res.data;
                        if (this.multi)
                            list = list.map(item => {
                                item.selected = false;
                                return item
                            })
                        this.list = list
                    }
                })
            },
            picke(index) {
                if (this.multi) {
                    // 如果是不限、选中的时候把其他的都取消
                    if (this.list[index].name == '不限' && !this.list[index].selected) {
                        this.list.forEach(item => {
                            item.selected = false;
                        });
                    } else {
                        let bxIndex = this.list.findIndex(item => item.name == '不限');
                        if (bxIndex >= 0)
                            this.list[bxIndex].selected = false
                    }
                    this.list[index].selected = !this.list[index].selected
                } else {
                    this.active = index
                    let item = this.$clearData({
                        id: this.list[index].id,
                        name: this.list[index].name
                    });
                    this.resout = item;
                    this.togglePicker();
                }
            },
            pickOk() {
                let str = '',
                    selectList = [];
                this.list.map(item => {
                    if (item.selected) {
                        str += item.name + ';';
                        selectList.push(item);
                    }
                });
                this.resoutList = selectList;
                this.multiValue =str;
                this.togglePicker();
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../style/mixin.less');
    .picker-container {
        width: 100%;
        height: .44rem;
        .borderRadius;
        .picker-warp {
            position: relative;
            width: 100%;
            height: 100%;
            line-height: .44rem;
            color: #333;
            border: .01rem solid #ddd;
            padding: 0 .1rem;
            font-size: .14rem;
            .label {
                position: absolute;
                color: #666;
                left: .1rem;
            }
            .placeholder {
                position: absolute;
                right: .1rem;
                color: #999;
            }
            .value {
                display: block;
                right: .1rem;
                width: 100%;
                padding-left: 1rem;
                text-align: right;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .mask-cover {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1000;
            overflow-x: hidden;
            overflow-y: auto;
            .mask {
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background-color: #000;
                .opacity(.6);
            }
            .pick-items {
                position: relative;
                width: 3.3rem;
                min-height: 3rem;
                margin: .55rem auto;
                background-color: #fff;
                z-index: 1001;
                .borderRadius;
                padding: .2rem 0 .2rem .15rem;
                .title {
                    position: relative;
                    color: #000;
                    font-weight: bold;
                    margin-bottom: .15rem;
                    font-size: .14rem;
                    .su {
                        display: inline-block;
                        width: .04rem;
                        height: .2rem;
                        background: linear-gradient(-135.3deg, rgba(82, 122, 254, 1), rgba(67, 162, 254, 1));
                        margin-right: .1rem;
                        vertical-align: middle;
                    }
                    .ok-btn {
                        position: absolute;
                        right: .15rem;
                        color: #1875f0;
                        font-weight: normal;
                    }
                }
                .item-content {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .picker-item {
                        display: block;
                        width: .9rem;
                        height: .32rem;
                        line-height: .32rem;
                        color: #666;
                        border: .01rem solid #979797;
                        .borderRadius;
                        text-align: center;
                        font-size: .14rem;
                        margin-right: .15rem;
                        margin-bottom: .1rem;
                        &.active {
                            color: #1875f0;
                            border-color: #1875f0;
                        }
                    }
                }
            }
        }
    }
</style>
