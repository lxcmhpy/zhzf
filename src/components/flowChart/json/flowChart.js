import {BASIC_DATA_SYS} from '@/common/js/BASIC_DATA.js';
import {flowGraphData} from './flowChartData.js';


// svg矢量图形path
const svgData = {
  lct_01:'path://M237.227641 0.004267h603.301891a90.452617 90.452617 0 0 1 91.305944 91.305943v347.730581H90.882133V146.349775A146.772171 146.772171 0 0 1 237.227641 0.004267z" fill="#0074F5" opacity=".2" /><path d="M645.544409 0.004267H182.188077A90.452617 90.452617 0 0 0 90.882133 91.31021v841.380006A90.452617 90.452617 0 0 0 182.188077 1023.99616h654.928149a90.452617 90.452617 0 0 0 91.305943-91.305944V281.602037z" fill="#0074F5" /><path d="M650.237705 0.004267v213.331644a69.546116 69.546116 0 0 0 69.546116 68.266126h213.331645z" fill="#135FD8" /><path d="M237.227641 402.347748a55.039564 55.039564 0 0 0 109.652466 0 55.039564 55.039564 0 1 0-109.652466 0zM493.225615 365.654705h219.30493a34.559726 34.559726 0 0 1 36.693043 36.693043 34.559726 34.559726 0 0 1-36.693043 36.693043H493.225615a34.559726 34.559726 0 0 1-36.693043-36.693043 34.559726 34.559726 0 0 1 36.693043-36.693043z m0 183.038551h219.30493a36.693043 36.693043 0 1 1 0 72.959423H493.225615a36.693043 36.693043 0 1 1 0-72.959423z m0 182.611888h219.30493a36.693043 36.693043 0 0 1 0 73.386086H493.225615a36.693043 36.693043 0 0 1 0-73.386086zM237.227641 584.959636a55.039564 55.039564 0 1 0 54.612901-54.612901 54.612901 54.612901 0 0 0-54.612901 54.612901zM237.227641 767.998187a55.039564 55.039564 0 1 0 54.612901-55.039565A54.612901 54.612901 0 0 0 237.227641 767.998187z',
  lct_02:'path://M999.041908 264.483956a65.537436 65.537436 0 0 0-28.728739-30.524286L542.524285 7.720849a65.986323 65.986323 0 0 0-61.946344 0L53.237945 232.613011a64.639663 64.639663 0 0 0-17.506576 15.711029 58.804138 58.804138 0 0 0-11.222163 14.36437A65.08855 65.08855 0 0 0 17.327021 291.866035v439.459934a68.230756 68.230756 0 0 0 36.808697 59.253025l426.89111 224.443275a72.270735 72.270735 0 0 0 30.524285 8.528844h4.937753a63.74189 63.74189 0 0 0 26.035419-6.733298l427.339997-224.443275a67.781869 67.781869 0 0 0 35.013151-59.253025V291.866035a65.986323 65.986323 0 0 0-5.835525-27.382079zM511.102227 505.98492v427.339997L103.962125 718.308259V282.888304l407.588988 224.443276h4.937753z',
  lct_03:'path://M142.114885 365.376939H77.712369a4.293501 4.293501 0 0 0-4.293501 4.293501V944.570231a77.712369 77.712369 0 0 0 77.283019 77.712369h575.75849a4.722851 4.722851 0 0 0 4.293501-4.722852v-63.543815a4.722851 4.722851 0 0 0-4.293501-4.722851H205.22935a58.391614 58.391614 0 0 1-58.820964-58.391614V369.67044a3.864151 3.864151 0 0 0-4.293501-4.293501z"  /><path fill="#d81e06" d="M876.732914 0H292.387421a73.418868 73.418868 0 0 0-72.989517 72.989518v729.895178a72.989518 72.989518 0 0 0 72.989517 72.989518h584.345493a72.989518 72.989518 0 0 0 72.989518-72.989518v-729.895178a73.418868 73.418868 0 0 0-72.989518-72.989518zM786.140042 439.225157a262.762264 262.762264 0 0 1-118.071279 192.778197 188.484696 188.484696 0 0 1-83.29392 25.331656 187.196646 187.196646 0 0 1-82.00587-25.331656 263.191614 263.191614 0 0 1-118.500629-192.778197 1175.560587 1175.560587 0 0 1-18.891405-157.571488 313.425577 313.425577 0 0 0 122.79413-13.309853 257.610063 257.610063 0 0 0 96.603774-48.945912 252.457862 252.457862 0 0 0 96.174423 48.945912 313.425577 313.425577 0 0 0 122.36478 13.309853 1090.549266 1090.549266 0 0 1-17.174004 157.571488z',
  lct_04:'path://M447.411177 363.576998a128.319784 128.319784 0 1 0 128.319784 128.319783 128.319784 128.319784 0 0 0-128.319784-128.319783z"  /><path fill="#d81e06" d="M651.011901 0.004277v3.849594L647.59004 0.004277H183.072423A90.679314 90.679314 0 0 0 91.537644 91.539056V932.461371a90.679314 90.679314 0 0 0 91.534779 91.534779h654.430896a90.679314 90.679314 0 0 0 91.534779-91.534779V281.452336h3.421861zM447.411177 705.763087a213.866306 213.866306 0 1 1 213.866306-213.866306 213.866306 213.866306 0 0 1-213.866306 213.866306z m365.711384 119.337399c-12.404246 16.253839-68.437218-5.988257-124.897923-50.044716s-92.390244-90.679314-79.985999-108.216351 68.437218 6.415989 124.897923 50.044716 92.390244 91.962512 79.985999 108.216351z',
  lct_05:'path://M651.046903 0.004292H184.542655A90.554183 90.554183 0 0 0 93.130139 91.416808v841.166814a90.554183 90.554183 0 0 0 91.412516 91.412515h654.908448a90.554183 90.554183 0 0 0 91.412516-91.412515V281.537674z m60.083344 763.487633H307.71351V729.587753h403.416737z m33.904173-66.950011H273.380171v-98.279184a15.450003 15.450003 0 0 1 15.450002-15.450003h159.220862a69.095845 69.095845 0 0 0 21.458337-49.783342 63.945845 63.945845 0 0 0-19.312504-45.491675 56.220843 56.220843 0 0 0-13.733335-10.729168 105.145852 105.145852 0 0 1-35.191673-78.537514 108.579186 108.579186 0 0 1 216.729204 0 103.858352 103.858352 0 0 1-35.620839 78.537514 79.395847 79.395847 0 0 0-13.733336 10.729168 64.375011 64.375011 0 0 0-19.74167 45.491675 69.095845 69.095845 0 0 0 21.458337 49.783342h159.220861a16.308336 16.308336 0 0 1 15.87917 15.450003z',
  lct_06:'path://M1102.451892 850.721413L662.630068 71.477417c-54.022148-95.303223-142.19037-95.303223-196.212517 0L23.028226 850.721413c-54.022148 95.303223-9.683215 173.278587 98.36108 173.278587h883.211149c107.534652 0 151.873585-77.975364 97.851437-173.278587z m-404.146821-263.995023l-260.937166 313.430385 87.148936-220.675376H427.175047l97.341794-260.937166H713.594358l-123.333582 168.182157z',
  lct_07:'path://M389.852625 656.047423v-94.456904a24.902275 24.902275 0 0 0-24.902275-24.472925H177.75394a24.902275 24.902275 0 0 1-24.902275-24.902275v-69.12528a24.902275 24.902275 0 0 1 24.902275-24.472925h187.19641a25.331624 25.331624 0 0 0 24.902275-24.472926V300.545983l161.864786 161.864786a25.331624 25.331624 0 0 1 0 34.347965z"  /><path fill="#d81e06" d="M926.96893 990.940084a32.201217 32.201217 0 0 1-9.44569 22.755526 33.489266 33.489266 0 0 1-22.755527 9.016341h-249.452097a36.494713 36.494713 0 0 1-36.065363-36.494713v-53.239346a38.212111 38.212111 0 0 1 10.304389-25.760974 36.924063 36.924063 0 0 1 25.760974-10.733739h115.924382a36.494713 36.494713 0 0 0 36.494713-36.065363V423.339959a36.494713 36.494713 0 0 0-36.494713-36.924063h-185.479012a31.771868 31.771868 0 0 1-22.755526-9.016341 30.05447 30.05447 0 0 1-9.016341-22.755526V166.15957a35.206664 35.206664 0 0 0-10.733739-25.331625 36.924063 36.924063 0 0 0-25.760974-12.021788H262.335804a36.065363 36.065363 0 0 0-25.760974 10.73374 35.206664 35.206664 0 0 0-11.163088 26.619673v115.924382a36.494713 36.494713 0 0 1-36.494713 36.494713H133.101585A36.494713 36.494713 0 0 1 96.606872 282.083952V70.414617A69.554629 69.554629 0 0 1 166.590851 0.001288h425.485419a38.212111 38.212111 0 0 1 26.619673 10.733739l297.539248 298.397948a36.065363 36.065363 0 0 1 10.733739 26.619673z"  /><path fill="#d81e06" d="M476.151887 836.37424h-171.739825a31.342518 31.342518 0 0 0-23.184877 9.445691 32.201217 32.201217 0 0 0-9.44569 22.755527v85.869913L115.498253 799.450178a32.201217 32.201217 0 0 1 0-45.511054l156.283242-156.283242v85.869913a32.201217 32.201217 0 0 0 9.44569 22.755527 30.913169 30.913169 0 0 0 23.184877 9.016341h171.739825a32.201217 32.201217 0 0 1 22.755527 9.44569 33.918616 33.918616 0 0 1 9.445691 23.184877v54.956744a32.201217 32.201217 0 0 1-32.201218 32.201218z',
  lct_08:'path://M647.889156 0.004267H184.532824A90.452617 90.452617 0 0 0 93.22688 91.31021v841.380006A90.452617 90.452617 0 0 0 184.532824 1023.99616h654.928148a90.452617 90.452617 0 0 0 91.305944-91.305944V281.602037zM294.185289 823.037751A55.039564 55.039564 0 1 1 349.224853 767.998187a54.612901 54.612901 0 0 1-55.039564 55.039564z m0-183.038551A55.039564 55.039564 0 1 1 349.224853 584.959636 54.612901 54.612901 0 0 1 294.185289 639.9992z m0-183.038551a55.039564 55.039564 0 0 1 0-109.652465 55.039564 55.039564 0 1 1 0 109.652465z m420.690003 347.730581H495.570361a36.693043 36.693043 0 0 1 0-73.386086h219.304931a36.693043 36.693043 0 0 1 0 73.386086z m0-183.038551H495.570361a36.693043 36.693043 0 1 1 0-72.959423h219.304931a36.693043 36.693043 0 1 1 0 72.959423z m0-182.611888H495.570361a34.559726 34.559726 0 0 1-36.693042-36.693043 34.559726 34.559726 0 0 1 36.693042-36.693043h219.304931a34.559726 34.559726 0 0 1 36.693043 36.693043 34.559726 34.559726 0 0 1-36.693043 36.693043z',
  lct_09:'path://M350.541196 862.541196A161.458804 161.458804 0 1 0 512 701.082392a161.458804 161.458804 0 0 0-161.458804 161.458804z"  /><path fill="#d81e06" d="M869.179423 699.797574v-342.618151a357.179423 357.179423 0 0 0-714.358846 0v342.618151H40.900042v188.868256h942.199916v-188.868256z',
  lct_10:'path://M836.994992 0.049064H182.949057A90.448622 90.448622 0 0 0 91.647146 91.350975v840.062914A90.448622 90.448622 0 0 0 182.949057 1023.995734H646.284925l284.99849-281.15869V91.350975A91.301911 91.301911 0 0 0 836.994992 0.049064z m-597.302224 255.986667a34.5582 34.5582 0 0 1 36.691423-36.264777h144.205822a34.131556 34.131556 0 0 1 36.264778 36.264777v182.603823a34.5582 34.5582 0 0 1-36.264778 36.691423H274.250968a34.5582 34.5582 0 0 1-36.691422-36.691423z m511.973335 401.899068H274.250968a36.691422 36.691422 0 1 1 0-72.9562h474.855268a36.691422 36.691422 0 1 1 0 72.9562z m0-182.603822h-185.163689a36.691422 36.691422 0 1 1 0-72.956201h182.603822a36.691422 36.691422 0 1 1 0 72.956201z m0-182.603823h-185.163689a34.5582 34.5582 0 0 1-36.691423-36.691423 34.5582 34.5582 0 0 1 36.691423-36.264777h182.603822a34.5582 34.5582 0 0 1 36.691423 36.264777 34.5582 34.5582 0 0 1-36.691423 36.691423',
  lct_11:'path://M988.840785 325.69356l-12.318791-31.536105-108.405362 110.86912 3.449262 12.318791a369.563732 369.563732 0 1 1-261.651122-261.651122l12.318791 3.449261L733.102682 50.738144l-31.536105-14.289798A511.968957 511.968957 0 1 0 988.840785 325.69356z"  /><path fill="#d81e06" d="M382.953365 522.597117L874.571679 30.978803l124.41979 124.370515-491.667589 491.618313zM313.771035 716.445613l154.724015-31.043353-123.680662-123.680663-31.043353 154.724016z',
  lct_12:'path://M839.405094 474.881999A272.519401 272.519401 0 0 1 722.474703 529.767692a449.108154 449.108154 0 0 1 161.79348 346.973037v14.795274a524.993591 524.993591 0 0 0 129.816597-65.385565 362.722845 362.722845 0 0 0 0-45.340356 352.70024 352.70024 0 0 0-174.679686-305.928083zM745.383515 251.998356a306.882618 306.882618 0 0 1-97.839715 244.360653h15.272541a238.633451 238.633451 0 0 0 0-481.085036 262.974063 262.974063 0 0 0-43.431288 4.772669 306.882618 306.882618 0 0 1 125.998462 231.951714zM602.680711 514.495151a306.882618 306.882618 0 0 1-126.475729 61.567431l-22.908811 62.521964 26.24968 163.702547-69.680968 84.476241-73.021836-84.476241 30.545082-163.22528L340.661182 577.971649a312.132553 312.132553 0 0 1-134.589266-63.476498A398.040596 398.040596 0 0 0 6.574352 859.559121a392.313393 392.313393 0 0 0 2.863601 47.72669 673.900865 673.900865 0 0 0 397.563329 116.453124 676.764466 676.764466 0 0 0 392.313393-112.157722 360.33651 360.33651 0 0 0 3.340868-52.022092 397.563329 397.563329 0 0 0-199.974832-345.06397z"  /><path fill="#d81e06" d="M404.13768 541.222098A270.610333 270.610333 0 1 0 135.436415 270.134498a269.178532 269.178532 0 0 0 268.701265 271.0876z',
  lct_13:'path://M105.388633 783.336406h46.140297l90.183308-165.685612h-46.140297l256.393241-436.759857L346.576549 0 0 617.650794l105.388633 165.685612z"  /><path fill="#d81e06" d="M1189.685612 632.331797L828.428059 0h-180.890937L629.185868 31.459293l102.242703 175.647722 16.77829-32.507937 264.258065 457.732719h-109.058884L557.353815 0H346.576549l369.646697 632.331797H529.564772l-90.183308 151.004609h364.927804l52.956477 90.183307H328.225294l226.506913-392.716846-90.183308-165.685611-314.068612 558.402457 90.707629 150.480287h707.30978l-1.572965-2.621608 88.610343-147.858679-49.286226-90.183307h113.253456l90.183308-151.004609z',
  lct_14:'path://M474.740276 72.806357A75.375993 75.375993 0 0 0 407.073191 0H167.668758A74.947721 74.947721 0 0 0 100.001673 72.806357v878.387286a74.947721 74.947721 0 0 0 66.810539 72.806357h240.260979a75.375993 75.375993 0 0 0 67.238812-72.806357V274.094521 85.654538v-3.854454zM687.591803 167.026349h101.500627v379.877875h-101.500627zM760.39816 770.890841a47.109996 47.109996 0 1 0 17.130907 64.669176 47.109996 47.109996 0 0 0-17.130907-64.669176z"  /><path fill="#d81e06" d="M923.998327 270.66834V72.806357A74.519448 74.519448 0 0 0 856.331242 0h-239.404433a74.519448 74.519448 0 0 0-66.81054 72.806357v878.387286a74.519448 74.519448 0 0 0 66.81054 72.806357h239.404433a74.519448 74.519448 0 0 0 66.81054-72.806357V270.66834zM643.479716 124.19908H828.065245v471.099958h-184.585529z m143.899623 777.314931A101.9289 101.9289 0 0 1 634.914262 813.71811a101.072355 101.072355 0 0 1 50.96445-85.654538 101.500627 101.500627 0 1 1 101.500627 176.020075z',
  lct_15:'path://M874.130887 910.552492a13.375907 13.375907 0 0 1-8.421867-11.889696v-19.320754a33.68747 33.68747 0 0 0-33.192066-33.192066H176.602102a33.68747 33.68747 0 0 0-33.192066 33.192066V891.727141a11.889695 11.889695 0 0 1-10.403484 11.889695 120.383164 120.383164 0 0 0-99.080793 118.401548h919.965167A118.896952 118.896952 0 0 0 874.130887 910.552492zM973.211681 726.262216L626.428904 401.277213l125.832607-125.832607a28.73343 28.73343 0 0 0 41.613934 0 30.219642 30.219642 0 0 0 0-42.109337L568.46664 8.421867a30.219642 30.219642 0 0 0-42.109338 0 29.724238 29.724238 0 0 0-8.917271 20.806967 29.724238 29.724238 0 0 0 9.908079 20.311563L212.766591 364.61732a29.228834 29.228834 0 0 0-42.109337 0 29.228834 29.228834 0 0 0 0 42.109337l222.931785 224.913401a29.724238 29.724238 0 0 0 41.613933 0 29.724238 29.724238 0 0 0 0-41.613933l126.823416-127.31882 325.480406 349.259797a57.46686 57.46686 0 0 0 43.100146 19.320755 59.94388 59.94388 0 0 0 61.430091-61.430092 58.457668 58.457668 0 0 0-18.82535-43.595549z m-646.997581-297.24238l-41.11853-42.604742 272.967586-272.967586 40.623126 40.623126z'
}
const imgList = {
    lct_01:'icon_fc_1',
    lct_02:'icon_fc_2',
    lct_03:'icon_fc_3',
    lct_04:'icon_fc_4',
    lct_05:'icon_fc_1',
    lct_06:'icon_fc_5',
    lct_07:'icon_fc_6',
    lct_08:'icon_fc_7',
    lct_09:'icon_fc_8',
    lct_10:'icon_fc_9',
    lct_11:'icon_fc_10',
    lct_12:'icon_fc_11',
    lct_13:'icon_fc_12',
    lct_14:'icon_fc_13',
    // lct_15:'icon_fc_1'
  }
// 页面状态的颜色
// const stateColor = {
//   complete: '#0174f5',//已完成
//   doing: '#f2a010',// 进行中
//   unLock: '#52c2b6',// 已解锁
//   lock: '#B8BBC2' //未解锁
// }
const stateColor = {
    complete: 'white',//已完成
    doing: '#20232B',// 进行中
    unLock: '#20232B',// 已解锁
    lock: '#B8BBC2' //未解锁
  }
  const legend = [{
        name: '已解锁',
        itemStyleColor: 'unLock',
        // 强制设置图形为圆。
        icon: 'circle',
        // 设置文本为红色
        textStyle: {
            color: '#0074F5'
        }
    }, {
        name: '进行中',
        // 强制设置图形为圆。
        itemStyleColor: 'doing',
        icon: 'circle',
        // 设置文本为红色
        textStyle: {
            color: '#F0AE11'
        }
    }, {
        name: '已完成',
        // 强制设置图形为圆。
        itemStyleColor: 'complete',
        icon: 'circle',
        // 设置文本为红色
        textStyle: {
            color: '#00B93B'
        }
    }, {
        name: '未解锁',
        // 强制设置图形为圆。
        itemStyleColor: 'lock',
        icon: 'circle',
        // 设置文本为红色
        textStyle: {
            color: '#B2B2B2'
        }
    }]
// 线条颜色
const lineStyle = {
  complete: {
        normal: {
            color: '#00B93B',
            width: 3,
            opacity:1
        }
  },
  doing: {
    normal: {
      color: '#f2a010',
      width: 3,
      opacity:1
    }
  },
  unLock: {
      normal: {
          color: '#0074F5',
          width: 1,
          opacity:1,
          type: 'dotted'
      }
  },
  lock: {
    normal: {
        color: '#b2b2b2',
        width: 2,
        opacity:2
    }
  }
}// 页面布局x轴平均分布数，以及每列平均宽度和高度设置
const layoutCharts = {
  xMargin: 120,
  yMargin: 120,
  splitNumber: 8
}

// 页面大环节文字以及颜色设置
const mainLinkData = [{
      value: ' 立案',
      name: '0',
      // backgroundColor: 'red',
      textStyle: {
          align: 'right',
          verticalAlign: 'top',
          backgroundColor: '#b2b2b2',
          lineHeight: 26,
          // 上宽，左宽，下宽，宽
          padding:[10,20,10,22],
          // 右边的宽度
          shadowOffsetX: 22,
          shadowColor: '#b2b2b2',
          textShadowOffsetX: 0,
          color: 'white',
          fontSize: 16,
      },
  },
  {
    value: '调查 ',
    name: '1',
    textStyle: {
        align: 'right',
        verticalAlign: 'top',
        backgroundColor: '#b2b2b2',
        lineHeight: 26,
        padding:[10, 10,10,102],
        color: 'white',
        shadowBlur: '#b2b2b2',
        fontSize: 16,
        // 右边的宽度
        shadowOffsetX: 68,
        shadowColor: '#b2b2b2',
    }
  },
  {
    value: '决定',
    name: '2',
    textStyle: {
        align: 'center',
        verticalAlign: 'top',
        backgroundColor: '#b2b2b2',
        lineHeight: 26,
        // 上 右，*，*
        padding:[10,50,10,123],
        color: 'white',
        // 据左边的宽度（不考虑负号）
        shadowOffsetX: 123,
        // 文字的偏移量
        textShadowOffsetX: -300,
        shadowColor: '#b2b2b2',
        fontSize: 16,
    }
  },
  {
    value: '执行',
    name: "3",
    textStyle: {
        align: 'right',
        verticalAlign: 'top',
        backgroundColor: '#b2b2b2',
        lineHeight: 26,
        // 上  右 下左 为前一节点的位置
        padding:[10,35,10, 34],
        color: '#b2b2b2',
        // 左边宽 当前节点的位置
        shadowOffsetX: 157,
        // 文字的偏移量
        textShadowOffsetX: 160,
        textShadowColor: 'white',
        shadowColor: '#b2b2b2',
        fontSize: 16,
    }
  },
  {
    value: '结案',
    name: "4",
    textStyle: {
        align: 'left',
        verticalAlign: 'top',
        backgroundColor: '#b2b2b2',
        lineHeight: 26,
        padding:[10,29,10, 29],
        // 左边宽偏移量
        shadowOffsetX: -12,
        // 文字的偏移量
        textShadowOffsetX: -50,
        color: 'white',
        shadowColor: '#b2b2b2',
        fontSize: 16,
    }
}]
// const graphData={
//   compensationGraphData:{},
//   commonGraphData:{}
// }
const graphData = flowGraphData;
// 初始化节点位置
// graphData.compensationGraphData = {
//   nodes:[
//     {id:"1",source: '1',target:"2",linkID: BASIC_DATA_SYS.establish_caseLinktypeId,name:"立案登记",position:{x: 1, y: 1}, itemStyleColor: "", attributes:{modularity_class:'lct_01'}},
//     {id:"2",source: "2",target:"3",linkID: BASIC_DATA_SYS.compensationCaseDoc_caseLinktypeId,name:"调查类\n文书",position:{x: 1, y: 2},itemStyleColor: "",attributes:{modularity_class:'lct_03'}},
//     {id:"3",source: "3",target:"4",linkID: BASIC_DATA_SYS.compensationNote_caseDoctypeId,name:"赔补偿\n通知",position:{x: 1, y: 3},itemStyleColor: "",attributes:{modularity_class:'lct_03'}},
//     {id:"4",source: '4',target:"5",linkID: BASIC_DATA_SYS.compensationPartyRights_caseLinktypeId,name:"当事人\n权利",position:{x: 1, y: 4},itemStyleColor: "",attributes:{modularity_class:'lct_10'}},
//     {id:"5",source: '5',target:"6",linkID: BASIC_DATA_SYS.takeOverCompensation_caseDoctypeId,name:"收缴赔\n补偿款",position:{x: 1, y: 5},itemStyleColor: "",attributes:{modularity_class:'lct_11'}},
//     {id:"6",source: "6",target:"6",linkID: BASIC_DATA_SYS.finishCaseReport_caseLinktypeId,name:"结案登记",position:{x: 1, y: 6},itemStyleColor: "",attributes:{modularity_class:'lct_14'}}
//   ],
//   links:[]
// }

// 初始化节点位置
// graphData.commonGraphData = {
//   nodes:[
//     {id:"1",source: '1',target:"2_1",linkID: BASIC_DATA_SYS.establish_caseLinktypeId,name:"立案登记",position:{x: 1, y: 1}, itemStyleColor: "", attributes:{modularity_class:'lct_01'}},
//     {id:"temp1_1",source: '1',target:"temp1_1",linkID: 'temp1_1',name:"",position:{x: 1, y: 1.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"temp1_2",source: 'temp1_1',target:"temp1_2",linkID: 'temp1_2',name:"",position:{x: 2, y: 1.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"temp1_2_1",source: 'temp1_2',target:"2_2",linkID: 'temp1_2_1',name:"",position:{x: 1, y: 1},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"2_1",source: "2_1",target:"3",linkID: BASIC_DATA_SYS.caseDoc_caseLinktypeId,name:"调查类\n文书",position:{x: 1, y: 2},itemStyleColor: "",attributes:{modularity_class:'lct_03'}},
//     {id:"2_2",source: "2_2",target:"2_1",linkID: BASIC_DATA_SYS.adminCoerciveMeasure_caseLinktypeId,name:"行政强制\n措施",position:{x: 2, y: 2},itemStyleColor: "",attributes:{modularity_class:'lct_02'}},
//     {id:"3",source: "3",target:"4_1",linkID: BASIC_DATA_SYS.caseInvestig_caseLinktypeId,name:"调查报告",position:{x: 1, y: 3},itemStyleColor: "",attributes:{modularity_class:'lct_04'}},
//     {id:"temp3_1",source: '3',target:"temp3_1",linkID: 'temp3_1',name:"",position:{x: 1, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"temp3_2",source: 'temp3_1',target:"temp3_2",linkID: 'temp3_2',name:"",position:{x: 2, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"temp3_2_1",source: 'temp3_2',target:"4_2",linkID: 'temp3_2_1',name:"",position:{x: 2, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"temp3_3",source: 'temp3_2',target:"temp3_3",linkID: 'temp3_3',name:"",position:{x: 3, y: 3.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"temp3_3_1",source: 'temp3_3',target:"4_3",linkID: 'temp3_3_1',name:"",position:{x: 1, y: 1},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"4_1",source: "4_1",target:"5",linkID: BASIC_DATA_SYS.illegalActionForm_caseLinktypeId,name:"违法行为\n通知",position:{x: 1, y: 4},itemStyleColor: "",attributes:{modularity_class:'lct_06'}},
//     {id:"4_2",source: "4_2",target:"temp4_2_1",linkID: BASIC_DATA_SYS.forceCorrect_caseLinktypeId,name:"责令改正",position:{x: 2, y: 4},itemStyleColor: "",attributes:{modularity_class:'lct_07'}},
//     {id:"temp4_2_1",source: 'temp4_2_1',target:"temp4_2_2",linkID: 'temp4_2_1',name:"",position:{x: 2, y: 6.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"temp4_2_2",source: 'temp4_2_2',target:"7_1",linkID: 'temp4_2_2',name:"",position:{x: 1, y: 6.5},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"4_3",source: "4_3",target:"temp4_3_1",linkID: BASIC_DATA_SYS.noPenalty_caseLinktypeId,name:"不予处罚",position:{x: 3, y: 4},itemStyleColor: "",attributes:{modularity_class:'lct_09'}},
//     {id:"temp4_3_1",source: 'temp4_3_1',target:"temp7_2_1",linkID: 'temp4_3_1',name:"",position:{x: 3, y: 7},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"5",source: '5',target:"6",linkID: BASIC_DATA_SYS.partyRights_caseLinktypeId,name:"当事人\n权利",position:{x: 1, y: 5},itemStyleColor: "",attributes:{modularity_class:'lct_10'}},
//     {id:"6",source: '6',target:"7_1",linkID: BASIC_DATA_SYS.punishDecisionDoc_caseLinktypeId,name:"处罚决定",position:{x: 1, y: 6},itemStyleColor: "",attributes:{modularity_class:'lct_11'}},
//     {id:"7_1",source: '7_1',target:"7_2",linkID: BASIC_DATA_SYS.penaltyExecution_caseLinktypeId,name:"决定执行",position:{x: 1, y: 7},itemStyleColor: "",attributes:{modularity_class:'lct_12'}},
//     {id:"temp7_1_1",source: '7_1',target:"temp7_1_1",linkID: 'temp7_1_1',name:"",position:{x: 1, y: 8},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"temp7_1_2",source: 'temp7_1_1',target:"temp7_1_2",linkID: 'temp7_1_2',name:"",position:{x: 2, y: 8},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"7_2",source: '7_2',target:"temp7_1_2",linkID: BASIC_DATA_SYS.forceExecute_caseLinktypeId,name:"强制执行",position:{x: 2, y: 7},itemStyleColor: "",attributes:{modularity_class:'lct_13'}},
//     {id:"temp7_2_1",source: 'temp7_1_2',target:"temp7_2_1",linkID: 'temp7_2_1',name:"",position:{x: 3, y: 8},itemStyleColor: "",attributes:{modularity_class: 'hide'}},
//     {id:"8",source: "temp7_2_1",target:"8",linkID: BASIC_DATA_SYS.finishCaseReport_caseLinktypeId,name:"结案登记",position:{x: 4, y: 8},itemStyleColor: "",attributes:{modularity_class:'lct_14'}}
//   ],
//   links:[]
// }

const linePosition = [
    {
        id: BASIC_DATA_SYS.finishCaseReport_caseLinktypeId,
        name: '结案登记',
        type: 'line',
        smooth: true,
        symbolSize: 5,
        symbol:'arrow',
        data: [[1,4],[1,1]],// 列，行
        lineStyle: {
            width: 3,
            type:'solid',
            color: 'green'
        },
    }, {
        id: BASIC_DATA_SYS.forceExecute_caseLinktypeId,
        name: '强制执行',
        type: 'line',
        smooth: true,
        symbolSize: 4,
        symbol:'arrow',
        data: [[2,3],[2,4]],
        lineStyle: {
            width: 3,
            type:'solid',
            color: 'blue'
        },
    }, {
        id: BASIC_DATA_SYS.penaltyExecution_caseLinktypeId,
        name:'决定执行',
        type: 'line',
        smooth: true,
        symbolSize: 4,
        symbol:'arrow',
        data: [[1,4],[1,3.7]],
        lineStyle: {
            width: 2,
            type:'solid',
            color: 'red'
        },
    }
   
]

export {svgData, imgList, linePosition, stateColor, lineStyle, graphData, mainLinkData,layoutCharts, legend}












































