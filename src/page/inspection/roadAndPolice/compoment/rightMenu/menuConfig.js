let vm = () => {};

const menuArr = [
  {
    name: "文书填报",
    label:'doc',
    type: "primary",
    disabled: false
  },
  {
    name: "照片证据",
    label:'photo',
    type: "primary",
    disabled: false
  },
  {
    name: "操作记录",
    label:'record',
    type: "primary",
    disabled: false
  },
  {
    name: "卷宗目录",
    label:'dir',
    type: "primary",
    disabled: false
  }
];
export const setMenuFn = vm => {
  vm = vm;
  vm.menuArr = menuArr;
  return vm.menuArr;
};
