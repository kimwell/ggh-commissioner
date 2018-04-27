<template>
    <div class="city-container">
        <div class='picker-warp' @click='openPicker'>
            <p class='label'>{{ title }}</p>
            <div class='placeholder' v-if="level > 1 ? tabs[2].active == null : tabs[1].active == null">请选择</div>
            <div class='value' v-if="level > 1 ? tabs[2].active != null : tabs[1].active != null">{{ level > 1 ? tabs[2].list[tabs[2].active].shortName : tabs[1].list[tabs[1].active].shortName }}</div>
        </div>
    
        <div class='mask-cover' v-if="show">
            <div class='mask' @click="close"></div>
            <div class='picker-container zd'>
                <div class='header'>
                    <div class='tab'>
                        <span v-for="(item,index) in tabs" v-if="item.list.length>0" :class="activeTab == index ?'active':''" :key="index" @click="switchTab(index)">{{ item.label }}</span>
                    </div>
                    <div class='close' @click="close">关闭</div>
                </div>
    
                <div class="pick-items" :class="'show-' + activeTab">
                    <div class="pick-item" v-for="(tab,i) in tabs" :key="i" v-if="tab.list.length > 0">
                        <div class='item-list'>
                            <div v-for="(item,index) in tab.list" :key="item.id" @click="pick(index)" class="item" :class="index == tab.active ?'active':''">
                                {{ item.shortName }}
                                <a class='iconfont icon-duihao' v-if="index == tab.active"></a>
                            </div>
                        </div>
                    </div>
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
                default: ''
            },
            level: {
                type: Number,
                default: 1
            },
            value: {
                type: Object,
                default: function() {
                    return {
                        id: '',
                        name: ''
                    }
                }
            }
        },
        data() {
            return {
                show: false,
                tabs: [{
                    label: '请选择',
                    active: null,
                    api: '/api/query/findProvince',
                    list: []
                }, {
                    label: '请选择',
                    active: null,
                    api: '/api/query/findCity',
                    list: []
                }, {
                    label: '请选择',
                    active: null,
                    api: '/api/query/findDistrict',
                    list: []
                }],
                activeTab: 0,
                resout: {
                    id: '',
                    name: ''
                }
            }
        },
        watch: {
            resout(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.resout = val
            }
        },
        methods: {
            openPicker() {
                this.show = true;
                if (this.tabs[0].list.length == 0 && this.show)
                    this.getList()
            },
            // 切换tab
            switchTab(index) {
                if (this.activeTab == index) return
                this.activeTab = index
            },
            // 获取列表，根据activeTab
            getList() {
                let apiMethod = this.tabs[this.activeTab].api;
                let pId = "";
                if (this.activeTab > 0) {
                    let parent = this.tabs[this.activeTab - 1];
                    pId = parent.list[parent.active].id || '';
                }
    
                this.$http.post(apiMethod, {
                    id: pId
                }).then(res => {
                    if (res.code === 1000) {
                        this.tabs[this.activeTab].list = res.data
                    }
                })
            },
            // 选择省市
            pick(index) {
                // 当前操作的list
                let activeList = this.tabs[this.activeTab];
                // 当前选中的数据
                let pickItem = activeList.list[index];
    
    
                // 判断是否选中完毕？activeTab是否等于level
                if (this.activeTab < this.level) {
                    // 跳转下一级操作
                    let updateTabIndex = this.activeTab + 1;
                    this.tabs[this.activeTab].active = index;
                    this.tabs[this.activeTab].label = pickItem.shortName;
                    this.tabs[updateTabIndex].active = null;
                    this.tabs[updateTabIndex].label = '请选择';
                    this.activeTab = updateTabIndex;
                    this.getList();
                } else {
                    // 完成选择操作
                    this.tabs[this.activeTab].active = index;
                    this.tabs[this.activeTab].label = pickItem.shortName;
    
                    let pickArr = [];
                    this.tabs.forEach((item, i) => {
                        if (item.active != null) {
                            pickArr.push({
                                id: item.list[item.active].id,
                                name: item.list[item.active].name
                            })
                        }
                    })
                    this.resout = {
                        id: pickItem.id,
                        name: pickItem.shortName
                    }
                    this.$emit('pick-arr', pickArr);
                    this.close();
                }
            },
            close() {
                this.show = false;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../style/mixin.less');
    .picker-warp {
        position: relative;
        width: 100%;
        height: .48rem;
        line-height: .24rem;
        background-color: #fafafa;
        border: .01rem solid #ddd;
        padding: .12rem .1rem;
        box-sizing: border-box;
        font-size: .14rem;
        color: #333;
        .borderRadius;
    }
    
    .picker-warp .label {
        position: absolute;
        color: #666;
        left: .1rem;
    }
    
    .picker-warp .placeholder {
        position: absolute;
        right: .1rem;
        color: #999;
    }
    
    .picker-warp .value {
        display: block;
        right: .1rem;
        width: 100%;
        padding-left: .5rem;
        box-sizing: border-box;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
    }
    
    .mask-cover .mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #000;
        .opacity(.6);
    }
    
    .zd {
        z-index: 200000;
    }
    
    .picker-mask {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #000;
        opacity: .6;
    }
    
    .picker-container {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 3rem;
        background-color: #fff;
    }
    
    .header {
        position: relative;
        width: 100%;
        height: .5rem;
        line-height: .5rem;
        border-bottom: .01rem solid #ccc;
    }
    
    .tab {
        display: inline-block;
        margin-left: .1rem;
    }
    
    .tab span {
        color: #666;
        font-size: .15rem;
        margin-right: .32rem;
    }
    
    .tab span.active {
        position: relative;
        color: #3389FF;
    }
    
    .tab span.active::after {
        position: absolute;
        content: "";
        width: 100%;
        height: .02rem;
        background-color: #3389FF;
        border-radius: .15rem;
        bottom: -.15rem;
        left: 0;
    }
    
    .close {
        position: absolute;
        right: .1rem;
        color: #3389FF;
        font-size: .15rem;
        top: 0;
    }
    
    .pick-items {
        width: 100%;
        height: 2.5rem;
        font-size: .14rem;
        color: #333;
        white-space: nowrap;
    }
    
    .pick-item {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        left: 0;
        box-sizing: border-box;
        padding: .2rem .1rem .05rem;
        .transition;
        vertical-align: top;
    }
    
    .show-0 .pick-item {
        left: 0;
    }
    
    .show-1 .pick-item {
        left: -100%;
    }
    
    .show-2 .pick-item {
        left: -200%;
    }
    
    .item-list {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }
    
    .item-list .item {
        height: .38rem;
    }
    
    .item-list .item.active {
        color: #3389FF;
    }
</style>


