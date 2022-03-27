<template>
  <div class="show-item">
    <Item
      v-for="item in showData.items"
      :key="item.url"
      :itemType="!isNotPlay ? item.type : indexToItemType[item.typeId]"
      :num="!isNotPlay ? item.num : item.count"
      :money="item.money"
      :content="item.title"
      :imageUrl="item.url"
    ></Item>
    <el-descriptions border style="margin-top: 20px" :column="1" title="备注">
      <el-descriptions-item v-if="!isNotPlay" label="描述" span="2">
        <p class="msg">
          {{ showData.msg }}
        </p>
      </el-descriptions-item>
      <el-descriptions-item label="总金额">
        <span class="all-money">￥{{ showData.money }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Item from "@/components/Play/Item";
export default {
  name: "ShowItem",
  components: { Item },
  props: {
    isNotPlay: { type: Boolean, default: false },
    isInvite: { type: Boolean, default: false },
    isExpress: { type: Boolean, default: false },
  },
  computed: {
    ...mapState({
      notPlay: (state) => state.play.notPlay,
      itemType: (state) => state.item.itemType,
      invite: (state) => state.order.invite,
      exp: (state) => state.order.exp,
    }),
    showData: function () {
      if (this.isNotPlay) return this.notPlay;
      if (this.isInvite) return this.invite;
      if (this.isExpress) return this.exp;
    },
    indexToItemType() {
      let types = {};
      this.itemType.forEach((element) => {
        types[element.id] = element.title;
      });
      return types;
    },
  },
  mothed: {
    switchTypeId(index) {
      console.log(index);
      return index;
    },
  },
};
</script>

<style scoped>
.show-item {
  padding: 20px;
}
.all-money {
  float: right;
  margin-right: 20px;
  font-size: 30px;
  color: #e6a23c;
}
.msg {
  width: 220px;
}
</style>