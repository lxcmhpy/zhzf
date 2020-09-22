import Mock from "mockjs";

// 图表数据
let List = [];
export default {
  getStatisticalData: () => {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          vue: Mock.Random.integer(1, 30)
        })
      );
    }
    return {
      code: 200,
      data: {
        // 柱状图
        afqs: [
          {
            date: "1月",
            new: Mock.Random.integer(1, 10),
            active: Mock.Random.integer(2, 20)
          },
          {
            date: "2月",
            new: Mock.Random.integer(1, 20),
            active: Mock.Random.integer(2, 10)
          },
          {
            date: "3月",
            new: Mock.Random.integer(1, 10),
            active: Mock.Random.integer(2, 10)
          },
          {
            date: "4月",
            new: Mock.Random.integer(1, 20),
            active: Mock.Random.integer(2, 10)
          },
          {
            date: "5月",
            new: Mock.Random.integer(1, 10),
            active: Mock.Random.integer(2, 10)
          },
          {
            date: "6月",
            new: Mock.Random.integer(1, 10),
            active: Mock.Random.integer(2, 10)
          },
          {
            date: "7月",
            new: Mock.Random.integer(1, 20),
            active: Mock.Random.integer(2, 10)
          },
          {
            date: "8月",
            new: Mock.Random.integer(1, 10),
            active: Mock.Random.integer(2, 10)
          },
          {
            date: "9月",
            new: Mock.Random.integer(1, 10),
            active: Mock.Random.integer(2, 10)
          },
          {
            date: "10月",
            new: Mock.Random.integer(1, 10),
            active: Mock.Random.integer(2, 10)
          },
          {
            date: "11月",
            new: Mock.Random.integer(1, 20),
            active: Mock.Random.integer(2, 10)
          },
          {
            date: "12月",
            new: Mock.Random.integer(1, 10),
            active: Mock.Random.integer(2, 10)
          },
        ],
        afd: [
          {
            name: "银川市",
            value: Mock.Random.integer(1, 20),
            value1: Mock.Random.integer(1, 20)
          },
          {
            name: "石嘴山市",
            value: Mock.Random.integer(1, 20),
            value1: Mock.Random.integer(1, 20)
          },
          {
            name: "吴忠市",
            value: Mock.Random.integer(1, 20),
            value1: Mock.Random.integer(1, 20)
          },
          {
            name: "中卫市",
            value: Mock.Random.integer(1, 20),
            value1: Mock.Random.integer(1, 20)
          },
          {
            name: "固原市",
            value: Mock.Random.integer(1, 20),
            value1: Mock.Random.integer(1, 20)
          }
        ],
        cars: {
          names: ["拦截数量"],
          date: [
            "湖南省",
            "福建省",
            "云南省",
            "山东省",
            "山西省"
          ],
          data: [12,32,40,11,20]
        },
        tableData: [
          {
            name: "ES6",
            unit: "Kbps",
            todayBuy: Mock.Random.float(100, 1000, 0, 2)
          }
        ]
      }
    };
  }
};
