<template>
  <div>
    <cityPicker title="货源地" v-model="city"></cityPicker>
    <ajaxPicker title="品类" api="api/query/findIronTypes" v-model="iron"></ajaxPicker>
    <ajaxPicker title="材质" api="api/query/findMaterials" v-model="material"></ajaxPicker>
    <ajaxPicker title="表面" api="api/query/findSurFace" v-model="surface"></ajaxPicker>
    <specInput v-model="spec" title="规格" :ironType="iron" :surface="surface"></specInput>
    <ajaxPicker title="产地" multi api="api/query/findProPlaces" v-model="proplace"></ajaxPicker>
    <pbInput title="重量" v-model="item.weights" :unit="item.weightUnit"></pbInput>
    <pbInput title="数量" v-model="item.numbers" :unit="item.numberUnit"></pbInput>
    <pbInput title="公差" v-model="item.tolerance" :disable="iron.name != '不锈钢板' &&  iron.name != '不锈钢卷'"></pbInput>
    <div class="textarea-container">
      <label>备注</label>
      <textarea maxlength="35" v-model="item.remark" placeholder="输入备注"></textarea>
    </div>
  
    <div class="btns">
      <a>保存</a>
      <a class="blue" @click="pub">发布</a>
    </div>
  </div>
</template>

<script>
  import ajaxPicker from '@/components/basic/ajaxPicker.vue'
  import cityPicker from '@/components/basic/cityPicker.vue'
  import pbInput from '@/components/basic/pbInput.vue'
  import specInput from '@/components/basic/specInput.vue'
  export default {
    components: {
      ajaxPicker,
      cityPicker,
      pbInput,
      specInput
    },
    data() {
      return {
        item: {
          locationId: '',
          locationName: '',
          ironTypeId: '',
          ironTypeName: '',
          materialId: '',
          materialName: '',
          surfaceId: '',
          surfaceName: '',
          proPlacesId: '',
          height: '',
          width: '',
          length: '',
          specifications: '',
          tolerance: '',
          numbers: '',
          weights: '',
          numberUnitId: '',
          weightUnitId: '',
          numberUnit: '件',
          weightUnit: '吨',
          remark: '',
          timeLimit: '86400000',
          appFlag: 2
        },
        city: {
          id: '',
          name: ''
        },
        iron: {
          id: '',
          name: ''
        },
        material: {
          id: '',
          name: ''
        },
        surface: {
          id: '',
          name: ''
        },
        spec: {
          width: '',
          height: '',
          length: '',
          specifications: ''
        },
        proplace: []
      };
    },
    watch: {
      iron(val) {
        // 根据选择的品类，查询对应的单位
        this.$http.post('api/query/findIronAndUnitByIronId', {
          ironId: val.id
        }).then(res => {
          if (res.code === 1000) {
            this.item.numberUnit = res.data.numUnitCName;
            this.item.numberUnitId = res.data.numUnitId;
            this.item.weightUnitId = res.data.weightUnitId;
            this.item.weightUnit = res.data.weightUnitCName;
          }
        });
        //如果不是板卷，就清空公差和sepc
        if (this.item.ironTypeName != '不锈钢卷' && this.item.ironTypeName != '不锈钢板') {
          this.item.tolerance = "";
          this.item.specifications = "";
        }
  
        this.item.ironTypeId = val.id;
        this.item.ironTypeName = val.name;
      },
      city(val) {
        this.item.locationId = val.id;
        this.item.locationName = val.name;
      },
      material(val) {
        this.item.materialId = val.id;
        this.item.materialName = val.name;
      },
      surface(val) {
        this.item.surfaceId = val.id;
        this.item.surfaceName = val.name;
      },
      spec(val) {
        this.item.width = val.width;
        this.item.height = val.height;
        this.item.length = val.length;
        this.item.specifications = val.specifications;
      },
      proplace(val) {
        this.item.proPlacesId = val;
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      ckeckItem() {
        let isBJ = this.item.ironTypeName == '不锈钢卷' || this.item.ironTypeName == '不锈钢板';
        let validItem = this.$clearData(this.item);
        delete validItem.numbers;
        delete validItem.weights;
        delete validItem.remark;
        if (isBJ) {
          delete validItem.specifications;
        } else {
          delete validItem.width;
          delete validItem.length;
          delete validItem.height;
          delete validItem.tolerance;
        }
  
        let isOk = true
        Object.keys(validItem).forEach(key => {
          if (validItem[key] === '') {
            isOk = false
            return false
          }
        });
        return isOk
      },
      // 检查单位
      checkUnit() {
        return this.item.numbers != '' || this.item.weights != ''
      }
    },
    methods: {
      save() {
        if (this.ckeckItem && this.checkUnit) {
          let list = wx.getStorageSync('pbList') || [];
          list.push({
            check: false,
            ...this.data.item
          });
          wx.setStorageSync('pbList', list);
          wx.reLaunch({
            url: '/pages/publish/subPages/pbList/index',
          })
        } else {
          wx.showModal({
            content: '请将数据填写完整！',
            showCancel: false
          })
        }
      },
      // 发布
      pub() {
        if (this.ckeckItem && this.checkUnit) {
          this.$http.post('sys/ironBuySubstitute/saleIronBuyInfoSaveList', {
            ironBuyInfos: JSON.stringify([this.item]),
            buserId: this.id
          }).then(res => {
            if (res.code === 1000) {
              this.$MessageBox.confirm('提示', '发布成功,继续发布？').then(action => {
                window.location.reload()
              }).catch(() => {
                this.$router.go(-1);
              });
            } else {
              this.$MessageBox('提示', res.message);
            }
          });
        } else {
          this.$MessageBox('提示', '请将数据填写完整！');
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url('../../style/mixin.less');
  .textarea-container {
    position: relative;
    width: 100%;
    height: .88rem;
    font-size: .14rem;
    line-height: .44rem;
    border: .01rem solid #ddd;
    label {
      position: absolute;
      left: .1rem;
      top: 0;
    }
    textarea {
      width: 100%;
      height: 100%;
      resize: none;
      background: none;
      padding: .1rem .1rem .1rem .5rem;
      font-size: .14rem;
    }
  }
  
  .btns {
    position: fixed;
    width: 100%;
    height: .44rem;
    bottom: .2rem;
    left: 0;
    text-align: center;
    a {
      display: inline-block;
      margin: 0 .1rem;
      width: 1.5rem;
      height: .44rem;
      line-height: .44rem;
      text-align: center;
      font-size: .14rem;
      color: @base_blue;
      border: 2px solid @base_blue;
      &.blue {
        background-color: @base_blue;
        color: #fff;
      }
    }
  }
</style>


