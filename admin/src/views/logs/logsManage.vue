<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-select v-model="api" placeholder="筛选接口">
          <el-option
            v-for="(item, index) in apiLists"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="apiType" placeholder="筛选接口类别">
          <el-option
            v-for="(item, index) in apiTypes"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="account" placeholder="筛选操作账号">
          <el-option
            v-for="(item, index) in accounts"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="actionType" placeholder="筛选操作类别">
          <el-option
            v-for="(item, index) in actionTypes"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input
              v-model="search"
              placeholder="请输入搜索相关ID"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-button icon="el-icon-search" circle></el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px" :gutter="20">
      <el-table :data="logs" :height="400" border style="width: 100%">
        <el-table-column prop="time" sortable label="操作时间" width="180">
        </el-table-column>
        <el-table-column prop="account" label="操作账号" width="100">
        </el-table-column>
        <el-table-column prop="api" label="操作接口" width="120">
        </el-table-column>
        <el-table-column prop="idType" label="接口类别" width="100">
        </el-table-column>
        <el-table-column prop="id" label="相关ID" width="180">
        </el-table-column>
        <el-table-column prop="type" label="操作类别" width="50">
        </el-table-column>
        <el-table-column prop="params" label="请求参数" width="180">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.params"
              placement="bottom"
            >
              <p>{{ scope.row.params | filterCutParams }}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="msg" label="说明">
          <template slot-scope="scope">
            <p>{{ scope.row.msg }}</p>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="8" :offset="8">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "logsManage",
  data() {
    return {
      apiLists: ["/user/submit"],
      api: "",
      apiTypes: ["itemId", "orderId"],
      apiType: "",
      accounts: ["admin"],
      account: "",
      actionTypes: ["增", "删", "改", "查"],
      actionType: "",
      search: "",
      logs: [
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          api: "/user/submit",
          idType: "itemId",
          id: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          type: "增",
          params: `{
	"LogisticCode": "780098068058",
	"ShipperCode": "ZTO",
	"Traces": [],
	"State": "0",
	"Success": true,
        "Reason": "暂无轨迹信息",
}`,
          msg: "增加商品类别",
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          api: "/user/submit",
          idType: "itemId",
          id: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          type: "增",
          params: `{
	"LogisticCode": "780098068058",
	"ShipperCode": "ZTO",
	"Traces": [],
	"State": "0",
	"Success": true,
        "Reason": "暂无轨迹信息",
}`,
          msg: "增加商品类别",
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          api: "/user/submit",
          idType: "itemId",
          id: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          type: "增",
          params: `{
	"LogisticCode": "780098068058",
	"ShipperCode": "ZTO",
	"Traces": [],
	"State": "0",
	"Success": true,
        "Reason": "暂无轨迹信息",
}`,
          msg: "增加商品类别",
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          api: "/user/submit",
          idType: "itemId",
          id: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          type: "增",
          params: `{
	"LogisticCode": "780098068058",
	"ShipperCode": "ZTO",
	"Traces": [],
	"State": "0",
	"Success": true,
        "Reason": "暂无轨迹信息",
}`,
          msg: "增加商品类别",
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          api: "/user/submit",
          idType: "itemId",
          id: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          type: "增",
          params: `{
	"LogisticCode": "780098068058",
	"ShipperCode": "ZTO",
	"Traces": [],
	"State": "0",
	"Success": true,
        "Reason": "暂无轨迹信息",
}`,
          msg: "增加商品类别",
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          api: "/user/submit",
          idType: "itemId",
          id: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          type: "增",
          params: `{
	"LogisticCode": "780098068058",
	"ShipperCode": "ZTO",
	"Traces": [],
	"State": "0",
	"Success": true,
        "Reason": "暂无轨迹信息",
}`,
          msg: "增加商品类别",
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          api: "/user/submit",
          idType: "itemId",
          id: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          type: "增",
          params: `{
	"LogisticCode": "780098068058",
	"ShipperCode": "ZTO",
	"Traces": [],
	"State": "0",
	"Success": true,
        "Reason": "暂无轨迹信息",
}`,
          msg: "增加商品类别",
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          api: "/user/submit",
          idType: "itemId",
          id: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          type: "增",
          params: `{
	"LogisticCode": "780098068058",
	"ShipperCode": "ZTO",
	"Traces": [],
	"State": "0",
	"Success": true,
        "Reason": "暂无轨迹信息",
}`,
          msg: "增加商品类别",
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          api: "/user/submit",
          idType: "itemId",
          id: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          type: "增",
          params: `{
	"LogisticCode": "780098068058",
	"ShipperCode": "ZTO",
	"Traces": [],
	"State": "0",
	"Success": true,
        "Reason": "暂无轨迹信息",
}`,
          msg: "增加商品类别",
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          api: "/user/submit",
          idType: "itemId",
          id: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          type: "增",
          params: `{
	"LogisticCode": "780098068058",
	"ShipperCode": "ZTO",
	"Traces": [],
	"State": "0",
	"Success": true,
        "Reason": "暂无轨迹信息",
}`,
          msg: "增加商品类别",
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          api: "/user/submit",
          idType: "itemId",
          id: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          type: "增",
          params: `{
	"LogisticCode": "780098068058",
	"ShipperCode": "ZTO",
	"Traces": [],
	"State": "0",
	"Success": true,
        "Reason": "暂无轨迹信息",
}`,
          msg: "增加商品类别",
        },
        {
          time: "2022-02-23 22:00:00",
          account: "admin",
          api: "/user/submit",
          idType: "itemId",
          id: "0486e593-8e0e-11ec-a092-00163e0c2d78",
          type: "增",
          params: `{
	"LogisticCode": "780098068058",
	"ShipperCode": "ZTO",
	"Traces": [],
	"State": "0",
	"Success": true,
        "Reason": "暂无轨迹信息",
}`,
          msg: "增加商品类别",
        },
      ],
    };
  },
  filters: {
    filterStatus: function (index) {
      let status = ["密码错误", "登录成功", "未知错误"];
      return status[index];
    },
  },
  filters: {
    filterCutParams: function (value) {
      return value.slice(0, 20) + "...";
    },
  },
};
</script>

<style scoped>
</style>
