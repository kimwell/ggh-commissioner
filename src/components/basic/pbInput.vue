<template>
    <div class='input-warp' :class="{'unit-show': unit != '' }">
        <div class="disable" v-show="disable"></div>
        <label class='label'>{{ title }}</label>
        <input v-model="inValue" :type="inType" :placeholder="placeholderShow ? '请输入' : ''" />
        <div class='unit' v-if="unit != ''">{{ unit }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            disable: {
                type: Boolean,
                default: false
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
            unit: {
                type: String,
                default: ''
            },
            value: {
                type: [String, Number],
                default: ''
            }
        },
        data() {
            return {
                inValue: ''
            }
        },
        watch: {
            inValue(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.inValue = val
            },
            disable(val){
                if(val)
                    this.inValue = ''
            }
        },
        created() {
            this.inValue = this.value
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../style/mixin.less');
    .input-warp {
        position: relative;
        width: 100%;
        height: .48rem;
        border: .01rem solid #ddd;
        padding: .12rem .1rem .12rem .375rem;
        box-sizing: border-box;
        font-size: .14rem;
        color: #333;
        .borderRadius;
        .disable{
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #ccc;
            left: 0;
            top: 0;
        }
    }
    
    .input-warp.unit-show {
        padding: .12rem .3rem .12rem .375rem;
    }
    
    .input-warp .label {
        position: absolute;
        left: .1rem;
        top: .13rem;
        color: #666;
    }
    
    .input-warp input {
        display: block;
        width: 100%;
        height: 100%;
        line-height: .15rem;
        text-align: right;
        background: none;
        font-size: .14rem;
    }
    
    .input-warp .unit {
        position: absolute;
        right: .1rem;
        top: .13rem;
        color: #666;
    }
</style>
