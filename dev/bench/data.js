window.BENCHMARK_DATA = {
  "lastUpdate": 1773240155224,
  "repoUrl": "https://github.com/milanofthe/fastdual",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "cca8c2e443599f246968e4c4e9bab6d6ccea9a92",
          "message": "Fix benchmark CI: set git identity for gh-pages bootstrap",
          "timestamp": "2026-03-04T14:13:26+01:00",
          "tree_id": "45d64012c797967f349b8f15129f0f62bf64ca55",
          "url": "https://github.com/milanofthe/fastdual/commit/cca8c2e443599f246968e4c4e9bab6d6ccea9a92"
        },
        "date": 1772630048928,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8206697.064040916,
            "unit": "iter/sec",
            "range": "stddev: 1.542508696362815e-8",
            "extra": "mean: 121.85170138443095 nsec\nrounds: 198060"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8218520.489508429,
            "unit": "iter/sec",
            "range": "stddev: 1.0219608794269585e-8",
            "extra": "mean: 121.67640164389402 nsec\nrounds: 83452"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 5904598.515598915,
            "unit": "iter/sec",
            "range": "stddev: 2.4163209558226618e-8",
            "extra": "mean: 169.35952501396585 nsec\nrounds: 199641"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 6902672.09847206,
            "unit": "iter/sec",
            "range": "stddev: 1.7419882763939053e-8",
            "extra": "mean: 144.87143322675792 nsec\nrounds: 190115"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6682949.729410278,
            "unit": "iter/sec",
            "range": "stddev: 1.780135060003186e-8",
            "extra": "mean: 149.63452374917725 nsec\nrounds: 197629"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7336912.156830543,
            "unit": "iter/sec",
            "range": "stddev: 2.2809463371000846e-8",
            "extra": "mean: 136.29712045400692 nsec\nrounds: 194553"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 231199.88963668406,
            "unit": "iter/sec",
            "range": "stddev: 6.461839477487594e-7",
            "extra": "mean: 4.325261580234474 usec\nrounds: 16947"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 46284.86960470582,
            "unit": "iter/sec",
            "range": "stddev: 0.000003211325520509946",
            "extra": "mean: 21.60533255339082 usec\nrounds: 17949"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 387782.26679765334,
            "unit": "iter/sec",
            "range": "stddev: 6.392140523464301e-7",
            "extra": "mean: 2.57876670910742 usec\nrounds: 55733"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 144241.20933538716,
            "unit": "iter/sec",
            "range": "stddev: 9.603601340082376e-7",
            "extra": "mean: 6.93283150222914 usec\nrounds: 35134"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 140324.70238929795,
            "unit": "iter/sec",
            "range": "stddev: 8.352993557606679e-7",
            "extra": "mean: 7.1263290281260305 usec\nrounds: 41887"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 83118.1384079353,
            "unit": "iter/sec",
            "range": "stddev: 0.00009260009670889056",
            "extra": "mean: 12.03106829813852 usec\nrounds: 11728"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 41237.701810199505,
            "unit": "iter/sec",
            "range": "stddev: 0.0002947378229569812",
            "extra": "mean: 24.249653984176817 usec\nrounds: 17005"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19794.944020826653,
            "unit": "iter/sec",
            "range": "stddev: 0.00016779465687538064",
            "extra": "mean: 50.51795038914383 usec\nrounds: 11308"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_3x3",
            "value": 18808.94078463516,
            "unit": "iter/sec",
            "range": "stddev: 0.000004133652691879839",
            "extra": "mean: 53.166204915530926 usec\nrounds: 9643"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "f795e7a2c1020725f668f9ea9a3cc8ceb652680b",
          "message": "Fix license field format for setuptools<77 compatibility",
          "timestamp": "2026-03-04T14:15:24+01:00",
          "tree_id": "04d6c3b7b8e38da6286c75ad7d7ba0ff7e61f919",
          "url": "https://github.com/milanofthe/fastdual/commit/f795e7a2c1020725f668f9ea9a3cc8ceb652680b"
        },
        "date": 1772630161906,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8046146.576638359,
            "unit": "iter/sec",
            "range": "stddev: 1.8744290479728163e-8",
            "extra": "mean: 124.28309507851337 nsec\nrounds: 197239"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8209672.561699778,
            "unit": "iter/sec",
            "range": "stddev: 1.1466081562776265e-8",
            "extra": "mean: 121.80753769221636 nsec\nrounds: 83174"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 5969172.569414135,
            "unit": "iter/sec",
            "range": "stddev: 2.1117839676641635e-8",
            "extra": "mean: 167.52740658294428 nsec\nrounds: 195734"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 7171260.820880324,
            "unit": "iter/sec",
            "range": "stddev: 1.787960266265905e-8",
            "extra": "mean: 139.4454929164385 nsec\nrounds: 196079"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6745170.210059024,
            "unit": "iter/sec",
            "range": "stddev: 2.0376125559716076e-8",
            "extra": "mean: 148.2542276707424 nsec\nrounds: 196503"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7670070.11541725,
            "unit": "iter/sec",
            "range": "stddev: 1.0794145752551084e-8",
            "extra": "mean: 130.37690463740958 nsec\nrounds: 78469"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 234289.70200350686,
            "unit": "iter/sec",
            "range": "stddev: 7.165418156466867e-7",
            "extra": "mean: 4.268220034634864 usec\nrounds: 17320"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 47056.228569383864,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017274551084706608",
            "extra": "mean: 21.251171851256878 usec\nrounds: 14466"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 391611.34347347816,
            "unit": "iter/sec",
            "range": "stddev: 5.157339452295924e-7",
            "extra": "mean: 2.5535521804100267 usec\nrounds: 58269"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 142664.3578549311,
            "unit": "iter/sec",
            "range": "stddev: 9.346022491068313e-7",
            "extra": "mean: 7.0094592302925065 usec\nrounds: 42458"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 138070.62722660246,
            "unit": "iter/sec",
            "range": "stddev: 8.397753372178123e-7",
            "extra": "mean: 7.242670074633565 usec\nrounds: 40200"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 85174.46112176494,
            "unit": "iter/sec",
            "range": "stddev: 0.00006286287515528403",
            "extra": "mean: 11.740608473828857 usec\nrounds: 15483"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 41437.828094873796,
            "unit": "iter/sec",
            "range": "stddev: 0.00023794017318423452",
            "extra": "mean: 24.13253893786263 usec\nrounds: 19056"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19406.328363235196,
            "unit": "iter/sec",
            "range": "stddev: 0.00018237216386381342",
            "extra": "mean: 51.529582581652846 usec\nrounds: 12860"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_3x3",
            "value": 18193.761817459825,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028014515449289416",
            "extra": "mean: 54.963894220069434 usec\nrounds: 9879"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "49e123ca11bcf1f1ed2c695764b8520b7c76b8a1",
          "message": "Add dynamic benchmark-to-README pipeline and update README for v0.2.0",
          "timestamp": "2026-03-04T16:13:31+01:00",
          "tree_id": "0b2903087ec8d4b731259b6e94158457a4d2f8ee",
          "url": "https://github.com/milanofthe/fastdual/commit/49e123ca11bcf1f1ed2c695764b8520b7c76b8a1"
        },
        "date": 1772637477541,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8276737.994618922,
            "unit": "iter/sec",
            "range": "stddev: 1.4999442238686138e-8",
            "extra": "mean: 120.82054556398242 nsec\nrounds: 198847"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8215507.5018335795,
            "unit": "iter/sec",
            "range": "stddev: 1.0636285192167754e-8",
            "extra": "mean: 121.72102572808983 nsec\nrounds: 82556"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 6038366.854949689,
            "unit": "iter/sec",
            "range": "stddev: 2.3287498776194006e-8",
            "extra": "mean: 165.60769228194437 nsec\nrounds: 199243"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 7118153.570034467,
            "unit": "iter/sec",
            "range": "stddev: 2.3369550915329957e-8",
            "extra": "mean: 140.48587041023308 nsec\nrounds: 197629"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6760130.180025707,
            "unit": "iter/sec",
            "range": "stddev: 2.2320723318538505e-8",
            "extra": "mean: 147.92614540985025 nsec\nrounds: 192679"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7647796.61702815,
            "unit": "iter/sec",
            "range": "stddev: 1.6528826477775465e-8",
            "extra": "mean: 130.75661528098914 nsec\nrounds: 187970"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 233056.7139022275,
            "unit": "iter/sec",
            "range": "stddev: 6.757852537477247e-7",
            "extra": "mean: 4.290801081231765 usec\nrounds: 16092"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 47707.086201130354,
            "unit": "iter/sec",
            "range": "stddev: 0.000001735476324549036",
            "extra": "mean: 20.96124663292277 usec\nrounds: 19750"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 390594.003373418,
            "unit": "iter/sec",
            "range": "stddev: 4.930015192468474e-7",
            "extra": "mean: 2.5602031556126432 usec\nrounds: 52541"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 139241.16694395686,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013818333047322288",
            "extra": "mean: 7.181784108448975 usec\nrounds: 41456"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 139020.32866788036,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014617454962105796",
            "extra": "mean: 7.193192604147848 usec\nrounds: 20498"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 87790.6306012066,
            "unit": "iter/sec",
            "range": "stddev: 0.00006852506315624302",
            "extra": "mean: 11.390737179489582 usec\nrounds: 14508"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 41739.45914187679,
            "unit": "iter/sec",
            "range": "stddev: 0.0002485392714851959",
            "extra": "mean: 23.958144656376483 usec\nrounds: 19294"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19693.88190494957,
            "unit": "iter/sec",
            "range": "stddev: 0.0001857714010532239",
            "extra": "mean: 50.7771908467002 usec\nrounds: 13110"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_3x3",
            "value": 18870.87823972423,
            "unit": "iter/sec",
            "range": "stddev: 0.0000029358673592166626",
            "extra": "mean: 52.9917043232755 usec\nrounds: 9923"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 43647.842097671,
            "unit": "iter/sec",
            "range": "stddev: 0.00015670540844904478",
            "extra": "mean: 22.910640066977308 usec\nrounds: 14925"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 12091.206359447511,
            "unit": "iter/sec",
            "range": "stddev: 0.00000817899130317693",
            "extra": "mean: 82.70473352881338 usec\nrounds: 5798"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 19957.99898893332,
            "unit": "iter/sec",
            "range": "stddev: 0.00015999910566980445",
            "extra": "mean: 50.10522350234102 usec\nrounds: 11718"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4108.036282291037,
            "unit": "iter/sec",
            "range": "stddev: 0.000009311916008103957",
            "extra": "mean: 243.4253086592272 usec\nrounds: 3580"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_fastdual_2d",
            "value": 42399.51340657458,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020933752765731582",
            "extra": "mean: 23.585176329993853 usec\nrounds: 15902"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_2d",
            "value": 50209.978661999296,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015896538512784494",
            "extra": "mean: 19.916359788394725 usec\nrounds: 20412"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_fastdual_5d",
            "value": 2287.2731349150067,
            "unit": "iter/sec",
            "range": "stddev: 0.000014478069361302718",
            "extra": "mean: 437.2018298711663 usec\nrounds: 2022"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5d",
            "value": 3972.1306813561796,
            "unit": "iter/sec",
            "range": "stddev: 0.000007676427124830327",
            "extra": "mean: 251.75405348410547 usec\nrounds: 3272"
          },
          {
            "name": "tests/test_benchmark.py::test_sparse_jac_20",
            "value": 5668.059025019541,
            "unit": "iter/sec",
            "range": "stddev: 0.000008088996863342732",
            "extra": "mean: 176.42723824608592 usec\nrounds: 4105"
          },
          {
            "name": "tests/test_benchmark.py::test_dense_jac_20",
            "value": 19280.381136800945,
            "unit": "iter/sec",
            "range": "stddev: 0.000274245739693671",
            "extra": "mean: 51.86619459981914 usec\nrounds: 13592"
          },
          {
            "name": "tests/test_benchmark.py::test_sparse_jac_50",
            "value": 1457.8791292324413,
            "unit": "iter/sec",
            "range": "stddev: 0.000044731631559764314",
            "extra": "mean: 685.9279208739958 usec\nrounds: 1327"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "040458e575b4a93fe4de57ad5ed3ad8a2f2fb489",
          "message": "Show relative overhead vs plain floats in benchmark tables",
          "timestamp": "2026-03-04T16:21:42+01:00",
          "tree_id": "230a8d9d40755b528191c83c0ccef74920dd9b2e",
          "url": "https://github.com/milanofthe/fastdual/commit/040458e575b4a93fe4de57ad5ed3ad8a2f2fb489"
        },
        "date": 1772637768396,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8313868.946945521,
            "unit": "iter/sec",
            "range": "stddev: 1.7071867802554267e-8",
            "extra": "mean: 120.28094337082321 nsec\nrounds: 196079"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8169282.658059045,
            "unit": "iter/sec",
            "range": "stddev: 1.047919167258687e-8",
            "extra": "mean: 122.40976862435947 nsec\nrounds: 82420"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 6032716.617278454,
            "unit": "iter/sec",
            "range": "stddev: 2.178028554287889e-8",
            "extra": "mean: 165.76280031716973 nsec\nrounds: 45123"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10311031.83932623,
            "unit": "iter/sec",
            "range": "stddev: 1.2638443221880286e-8",
            "extra": "mean: 96.98350422951894 nsec\nrounds: 103435"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10195057.947330412,
            "unit": "iter/sec",
            "range": "stddev: 1.0103753392193056e-8",
            "extra": "mean: 98.08674018001547 nsec\nrounds: 103972"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8162703.083145902,
            "unit": "iter/sec",
            "range": "stddev: 2.2123139903242266e-8",
            "extra": "mean: 122.50843743964782 nsec\nrounds: 194970"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 6966727.334901501,
            "unit": "iter/sec",
            "range": "stddev: 2.1710862586566214e-8",
            "extra": "mean: 143.53941986365083 nsec\nrounds: 196117"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6661617.166632793,
            "unit": "iter/sec",
            "range": "stddev: 2.4009747961522347e-8",
            "extra": "mean: 150.1136998698867 nsec\nrounds: 194591"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7608976.822155494,
            "unit": "iter/sec",
            "range": "stddev: 1.2937561661266819e-8",
            "extra": "mean: 131.42371482697155 nsec\nrounds: 77616"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8584073.74979006,
            "unit": "iter/sec",
            "range": "stddev: 7.923260282654002e-9",
            "extra": "mean: 116.494805281054 nsec\nrounds: 44500"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8164350.556847891,
            "unit": "iter/sec",
            "range": "stddev: 1.7129926359083632e-8",
            "extra": "mean: 122.48371662106605 nsec\nrounds: 199204"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8864243.763372317,
            "unit": "iter/sec",
            "range": "stddev: 7.679022881447582e-9",
            "extra": "mean: 112.8127820821073 nsec\nrounds: 44659"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 225940.61252414688,
            "unit": "iter/sec",
            "range": "stddev: 6.562273742642069e-7",
            "extra": "mean: 4.4259417942983905 usec\nrounds: 15806"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 47576.36666572106,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017749525372596158",
            "extra": "mean: 21.01883918597978 usec\nrounds: 17542"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 352847.6881358286,
            "unit": "iter/sec",
            "range": "stddev: 9.188301888826766e-7",
            "extra": "mean: 2.8340840357583703 usec\nrounds: 54334"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 140830.29205418672,
            "unit": "iter/sec",
            "range": "stddev: 9.4537778136776e-7",
            "extra": "mean: 7.100745055724474 usec\nrounds: 39389"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 138885.07881975203,
            "unit": "iter/sec",
            "range": "stddev: 9.576761335512364e-7",
            "extra": "mean: 7.200197519402506 usec\nrounds: 39910"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_10",
            "value": 1174659.3075782463,
            "unit": "iter/sec",
            "range": "stddev: 2.473414606627914e-7",
            "extra": "mean: 851.3106681644269 nsec\nrounds: 48312"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_100",
            "value": 530421.3386713556,
            "unit": "iter/sec",
            "range": "stddev: 4.287134251838811e-7",
            "extra": "mean: 1.8852936846486696 usec\nrounds: 126343"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 80337.61643966284,
            "unit": "iter/sec",
            "range": "stddev: 0.00011278771895373226",
            "extra": "mean: 12.44746912240102 usec\nrounds: 12080"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 41317.17385511746,
            "unit": "iter/sec",
            "range": "stddev: 0.0002622673560647907",
            "extra": "mean: 24.203010677995398 usec\nrounds: 21165"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19665.77907226737,
            "unit": "iter/sec",
            "range": "stddev: 0.00019840002836641547",
            "extra": "mean: 50.84975257401307 usec\nrounds: 12820"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_3x3",
            "value": 18058.192136070327,
            "unit": "iter/sec",
            "range": "stddev: 0.0000029035944490739457",
            "extra": "mean: 55.37652897172085 usec\nrounds: 10027"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 43770.96026458042,
            "unit": "iter/sec",
            "range": "stddev: 0.00014685843211155003",
            "extra": "mean: 22.84619743216378 usec\nrounds: 16512"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 12094.79349431225,
            "unit": "iter/sec",
            "range": "stddev: 0.000003926312847401405",
            "extra": "mean: 82.68020454175297 usec\nrounds: 6209"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 19866.17601593343,
            "unit": "iter/sec",
            "range": "stddev: 0.00015299093968222107",
            "extra": "mean: 50.33681364737542 usec\nrounds: 10786"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4202.950708651008,
            "unit": "iter/sec",
            "range": "stddev: 0.000010951094498038413",
            "extra": "mean: 237.9280817977908 usec\nrounds: 3582"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_fastdual_2d",
            "value": 41015.32800135255,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021716367833655864",
            "extra": "mean: 24.38112892738596 usec\nrounds: 16296"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_2d",
            "value": 49980.103771742135,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015708232805460468",
            "extra": "mean: 20.00796165944302 usec\nrounds: 20683"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_fastdual_5d",
            "value": 2255.7602949966176,
            "unit": "iter/sec",
            "range": "stddev: 0.000009829864904260403",
            "extra": "mean: 443.30951396655354 usec\nrounds: 1969"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5d",
            "value": 3904.6530833858997,
            "unit": "iter/sec",
            "range": "stddev: 0.0000070646848785487375",
            "extra": "mean: 256.10469832901396 usec\nrounds: 3411"
          },
          {
            "name": "tests/test_benchmark.py::test_sparse_jac_20",
            "value": 5668.532415756394,
            "unit": "iter/sec",
            "range": "stddev: 0.00000906644678590141",
            "extra": "mean: 176.41250444654335 usec\nrounds: 4048"
          },
          {
            "name": "tests/test_benchmark.py::test_dense_jac_20",
            "value": 19328.469124828753,
            "unit": "iter/sec",
            "range": "stddev: 0.0002808037396899226",
            "extra": "mean: 51.737154843547906 usec\nrounds: 13265"
          },
          {
            "name": "tests/test_benchmark.py::test_sparse_jac_50",
            "value": 1505.2496971362154,
            "unit": "iter/sec",
            "range": "stddev: 0.000013599791510176377",
            "extra": "mean: 664.3416051851937 usec\nrounds: 1350"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "b1b4a99b329d0547110acc31fd5904579f95a5fb",
          "message": "Remove pure-Python hessian/sparse benchmarks from comparison table",
          "timestamp": "2026-03-04T16:24:59+01:00",
          "tree_id": "fa39ef61594a068dcd87fb39312a51a2e1fcd9a6",
          "url": "https://github.com/milanofthe/fastdual/commit/b1b4a99b329d0547110acc31fd5904579f95a5fb"
        },
        "date": 1772637957171,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8026955.244331364,
            "unit": "iter/sec",
            "range": "stddev: 1.655346853908153e-8",
            "extra": "mean: 124.5802386535293 nsec\nrounds: 199641"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8062681.569004372,
            "unit": "iter/sec",
            "range": "stddev: 1.0095147710152424e-8",
            "extra": "mean: 124.02821461340261 nsec\nrounds: 79473"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 5918521.191548371,
            "unit": "iter/sec",
            "range": "stddev: 2.8611016028029752e-8",
            "extra": "mean: 168.96112519255598 nsec\nrounds: 199243"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10228536.01793335,
            "unit": "iter/sec",
            "range": "stddev: 9.520193268891706e-9",
            "extra": "mean: 97.76570158688726 nsec\nrounds: 104734"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10200261.17804543,
            "unit": "iter/sec",
            "range": "stddev: 9.48817442932373e-9",
            "extra": "mean: 98.03670538871631 nsec\nrounds: 101751"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8341569.930281922,
            "unit": "iter/sec",
            "range": "stddev: 1.4233882056684215e-8",
            "extra": "mean: 119.88151011834803 nsec\nrounds: 82967"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 7024438.317060754,
            "unit": "iter/sec",
            "range": "stddev: 1.912360057445431e-8",
            "extra": "mean: 142.3601368341763 nsec\nrounds: 197668"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6719565.487689091,
            "unit": "iter/sec",
            "range": "stddev: 1.9167928119607418e-8",
            "extra": "mean: 148.81914639154851 nsec\nrounds: 198453"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7519784.648607625,
            "unit": "iter/sec",
            "range": "stddev: 1.8330870709558946e-8",
            "extra": "mean: 132.98253164539247 nsec\nrounds: 199243"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8415949.319834156,
            "unit": "iter/sec",
            "range": "stddev: 1.8619354745326786e-8",
            "extra": "mean: 118.82200830787629 nsec\nrounds: 194591"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8159411.065605813,
            "unit": "iter/sec",
            "range": "stddev: 1.681279783031913e-8",
            "extra": "mean: 122.55786501740035 nsec\nrounds: 197239"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8839227.586832494,
            "unit": "iter/sec",
            "range": "stddev: 8.05307680921389e-9",
            "extra": "mean: 113.13205709169283 nsec\nrounds: 44840"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 234215.01079656437,
            "unit": "iter/sec",
            "range": "stddev: 8.49774363897482e-7",
            "extra": "mean: 4.26958117073284 usec\nrounds: 15221"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 47799.786557019965,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017951132239717613",
            "extra": "mean: 20.92059550950313 usec\nrounds: 17726"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 391840.9354708076,
            "unit": "iter/sec",
            "range": "stddev: 5.729078953379856e-7",
            "extra": "mean: 2.552055973423177 usec\nrounds: 51185"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 141250.07977017385,
            "unit": "iter/sec",
            "range": "stddev: 8.451087799598437e-7",
            "extra": "mean: 7.07964201950956 usec\nrounds: 38287"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 140050.66990623876,
            "unit": "iter/sec",
            "range": "stddev: 9.747133700754797e-7",
            "extra": "mean: 7.140272878876487 usec\nrounds: 29984"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_10",
            "value": 1194085.157838285,
            "unit": "iter/sec",
            "range": "stddev: 2.584730671802007e-7",
            "extra": "mean: 837.4612090567748 nsec\nrounds: 20778"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_100",
            "value": 552844.9353249739,
            "unit": "iter/sec",
            "range": "stddev: 4.6591455421362634e-7",
            "extra": "mean: 1.8088254700428412 usec\nrounds: 117275"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 80712.04453030213,
            "unit": "iter/sec",
            "range": "stddev: 0.00013233507347148985",
            "extra": "mean: 12.389724554983426 usec\nrounds: 10336"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 40010.46822695086,
            "unit": "iter/sec",
            "range": "stddev: 0.00036218169197133705",
            "extra": "mean: 24.993459069954213 usec\nrounds: 18043"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19475.673392348006,
            "unit": "iter/sec",
            "range": "stddev: 0.0001752415694177102",
            "extra": "mean: 51.346106491645116 usec\nrounds: 10968"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 43379.02854578301,
            "unit": "iter/sec",
            "range": "stddev: 0.00017876073323359488",
            "extra": "mean: 23.052613982458872 usec\nrounds: 16678"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 12309.275709846195,
            "unit": "iter/sec",
            "range": "stddev: 0.000004043806124235921",
            "extra": "mean: 81.23954841632961 usec\nrounds: 6630"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 19763.112630387626,
            "unit": "iter/sec",
            "range": "stddev: 0.0001429413400880055",
            "extra": "mean: 50.599316954881225 usec\nrounds: 10522"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4184.310763208022,
            "unit": "iter/sec",
            "range": "stddev: 0.000009433923437744802",
            "extra": "mean: 238.98798549879245 usec\nrounds: 3517"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "4fbc2fdbb3ab53b878b99dd0d0f86483de880021",
          "message": "Port HyperDual from pure Python to C extension",
          "timestamp": "2026-03-04T17:30:10+01:00",
          "tree_id": "827f6c6c2437ca64fe1cd941407a4350663f7288",
          "url": "https://github.com/milanofthe/fastdual/commit/4fbc2fdbb3ab53b878b99dd0d0f86483de880021"
        },
        "date": 1772641875356,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8170003.198841451,
            "unit": "iter/sec",
            "range": "stddev: 1.5798698990233602e-8",
            "extra": "mean: 122.39897288434418 nsec\nrounds: 198453"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8165731.612793471,
            "unit": "iter/sec",
            "range": "stddev: 1.060971194527806e-8",
            "extra": "mean: 122.46300116370138 nsec\nrounds: 82488"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 5855467.616345399,
            "unit": "iter/sec",
            "range": "stddev: 2.518315428399683e-8",
            "extra": "mean: 170.7805534110587 nsec\nrounds: 199601"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10414577.176482389,
            "unit": "iter/sec",
            "range": "stddev: 9.534408925447986e-9",
            "extra": "mean: 96.01926060504344 nsec\nrounds: 105397"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10215862.778663144,
            "unit": "iter/sec",
            "range": "stddev: 9.290656107213271e-9",
            "extra": "mean: 97.88698435619169 nsec\nrounds: 103875"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8333132.379068829,
            "unit": "iter/sec",
            "range": "stddev: 1.0588263478059425e-8",
            "extra": "mean: 120.0028938111917 nsec\nrounds: 83879"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 7019338.428670886,
            "unit": "iter/sec",
            "range": "stddev: 1.7770569308586652e-8",
            "extra": "mean: 142.46356834932524 nsec\nrounds: 194932"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6722841.20173662,
            "unit": "iter/sec",
            "range": "stddev: 1.891608886443813e-8",
            "extra": "mean: 148.74663404836687 nsec\nrounds: 197239"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7460296.285746007,
            "unit": "iter/sec",
            "range": "stddev: 4.273786512249889e-8",
            "extra": "mean: 134.04293364469277 nsec\nrounds: 199641"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8394399.320605593,
            "unit": "iter/sec",
            "range": "stddev: 1.6477944013661075e-8",
            "extra": "mean: 119.12704671379124 nsec\nrounds: 199601"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8181705.354226525,
            "unit": "iter/sec",
            "range": "stddev: 1.5789625618388967e-8",
            "extra": "mean: 122.22390769467364 nsec\nrounds: 191939"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8554258.984744566,
            "unit": "iter/sec",
            "range": "stddev: 1.5620610740057268e-8",
            "extra": "mean: 116.90083288141882 nsec\nrounds: 198413"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 231429.89560951758,
            "unit": "iter/sec",
            "range": "stddev: 7.164117672546556e-7",
            "extra": "mean: 4.320962930766991 usec\nrounds: 16105"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 47439.41110477581,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016928284674393",
            "extra": "mean: 21.07951968019536 usec\nrounds: 14634"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 393809.15757907036,
            "unit": "iter/sec",
            "range": "stddev: 5.315572830905047e-7",
            "extra": "mean: 2.5393010313611524 usec\nrounds: 54393"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 139821.66742334078,
            "unit": "iter/sec",
            "range": "stddev: 9.263290940129699e-7",
            "extra": "mean: 7.151967348324352 usec\nrounds: 18192"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 141343.20075715779,
            "unit": "iter/sec",
            "range": "stddev: 8.695370399003899e-7",
            "extra": "mean: 7.0749777466699895 usec\nrounds: 35635"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_10",
            "value": 1190359.1430290919,
            "unit": "iter/sec",
            "range": "stddev: 2.478625045658263e-7",
            "extra": "mean: 840.0825967995783 nsec\nrounds: 50462"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_100",
            "value": 552442.1616369882,
            "unit": "iter/sec",
            "range": "stddev: 3.8433821134290237e-7",
            "extra": "mean: 1.8101442457556378 usec\nrounds: 137855"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 82305.0709689552,
            "unit": "iter/sec",
            "range": "stddev: 0.00012377406305085596",
            "extra": "mean: 12.14991966141663 usec\nrounds: 12049"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 40254.611315792245,
            "unit": "iter/sec",
            "range": "stddev: 0.00034216897457920944",
            "extra": "mean: 24.84187444154233 usec\nrounds: 19027"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19064.423885803077,
            "unit": "iter/sec",
            "range": "stddev: 0.00024363738518032405",
            "extra": "mean: 52.45372249327092 usec\nrounds: 12915"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 44586.630688452235,
            "unit": "iter/sec",
            "range": "stddev: 0.00010636946918281598",
            "extra": "mean: 22.42824776304517 usec\nrounds: 19446"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 11141.081790984925,
            "unit": "iter/sec",
            "range": "stddev: 0.000003958692795344054",
            "extra": "mean: 89.75789054965686 usec\nrounds: 6423"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 19749.825799117643,
            "unit": "iter/sec",
            "range": "stddev: 0.00014437677647561586",
            "extra": "mean: 50.63335799370324 usec\nrounds: 10746"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 3781.8161915272426,
            "unit": "iter/sec",
            "range": "stddev: 0.000007706861658323855",
            "extra": "mean: 264.42321608342405 usec\nrounds: 3258"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "89b52cf8ef37f9971164e672d41e7eff613f4dc6",
          "message": "Overhaul README with ops tables and HyperDual benchmarks",
          "timestamp": "2026-03-04T17:35:29+01:00",
          "tree_id": "1c6346ab11b7f7da1eaf2c0bdc01c99c5e84dfff",
          "url": "https://github.com/milanofthe/fastdual/commit/89b52cf8ef37f9971164e672d41e7eff613f4dc6"
        },
        "date": 1772642220125,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8126837.404182501,
            "unit": "iter/sec",
            "range": "stddev: 1.5436446407763514e-8",
            "extra": "mean: 123.04909650159199 nsec\nrounds: 199204"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8188652.337370794,
            "unit": "iter/sec",
            "range": "stddev: 1.1820015294922521e-8",
            "extra": "mean: 122.12021695392666 nsec\nrounds: 80432"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 5778502.978136632,
            "unit": "iter/sec",
            "range": "stddev: 3.9539645271510844e-8",
            "extra": "mean: 173.055201975939 nsec\nrounds: 194553"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10390167.986221991,
            "unit": "iter/sec",
            "range": "stddev: 1.4098170574257768e-8",
            "extra": "mean: 96.24483466735688 nsec\nrounds: 103972"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10408448.788314957,
            "unit": "iter/sec",
            "range": "stddev: 1.133142007630319e-8",
            "extra": "mean: 96.07579576340423 nsec\nrounds: 103008"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8370172.115469811,
            "unit": "iter/sec",
            "range": "stddev: 1.0346886269743204e-8",
            "extra": "mean: 119.47185627781691 nsec\nrounds: 83592"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 7026683.157513374,
            "unit": "iter/sec",
            "range": "stddev: 1.8787587393364112e-8",
            "extra": "mean: 142.3146565148219 nsec\nrounds: 198413"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6564569.394359241,
            "unit": "iter/sec",
            "range": "stddev: 1.885343121439988e-8",
            "extra": "mean: 152.33291628530478 nsec\nrounds: 197278"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7617924.517234034,
            "unit": "iter/sec",
            "range": "stddev: 1.0579075530515329e-8",
            "extra": "mean: 131.2693500359185 nsec\nrounds: 72281"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8541023.683972985,
            "unit": "iter/sec",
            "range": "stddev: 7.109086805761638e-9",
            "extra": "mean: 117.08198419780463 nsec\nrounds: 43854"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 7988546.866445109,
            "unit": "iter/sec",
            "range": "stddev: 1.4890529319955677e-8",
            "extra": "mean: 125.17921177884988 nsec\nrounds: 195313"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8707218.626136933,
            "unit": "iter/sec",
            "range": "stddev: 1.4590631169771223e-8",
            "extra": "mean: 114.84723686600053 nsec\nrounds: 199601"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 230140.33399326634,
            "unit": "iter/sec",
            "range": "stddev: 7.241534601291503e-7",
            "extra": "mean: 4.34517488807181 usec\nrounds: 16765"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 46944.633019800545,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016707814665587951",
            "extra": "mean: 21.301689579258507 usec\nrounds: 18185"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 391957.0751078967,
            "unit": "iter/sec",
            "range": "stddev: 5.337581908446257e-7",
            "extra": "mean: 2.5512997812954983 usec\nrounds: 59450"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 142146.33735671322,
            "unit": "iter/sec",
            "range": "stddev: 9.259067579163539e-7",
            "extra": "mean: 7.0350036349548795 usec\nrounds: 43191"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 139531.371299387,
            "unit": "iter/sec",
            "range": "stddev: 7.973063721282771e-7",
            "extra": "mean: 7.166847073081071 usec\nrounds: 39751"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_10",
            "value": 1153661.6965725592,
            "unit": "iter/sec",
            "range": "stddev: 2.405337355408491e-7",
            "extra": "mean: 866.8052367266102 nsec\nrounds: 50795"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_100",
            "value": 543747.417113537,
            "unit": "iter/sec",
            "range": "stddev: 3.950454073735563e-7",
            "extra": "mean: 1.8390891956939546 usec\nrounds: 129300"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 80691.58119044268,
            "unit": "iter/sec",
            "range": "stddev: 0.00011537456615970478",
            "extra": "mean: 12.39286658220105 usec\nrounds: 12637"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 39048.75588153364,
            "unit": "iter/sec",
            "range": "stddev: 0.0002760598744725879",
            "extra": "mean: 25.609010515822998 usec\nrounds: 19114"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19330.54944749524,
            "unit": "iter/sec",
            "range": "stddev: 0.0002114659392110677",
            "extra": "mean: 51.731586974087556 usec\nrounds: 12360"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 45595.0755775572,
            "unit": "iter/sec",
            "range": "stddev: 0.00009420826611922948",
            "extra": "mean: 21.932193056660264 usec\nrounds: 21517"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 12176.206826387068,
            "unit": "iter/sec",
            "range": "stddev: 0.00000367997265921112",
            "extra": "mean: 82.12738287533841 usec\nrounds: 6587"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 19536.15150254241,
            "unit": "iter/sec",
            "range": "stddev: 0.00020893587189315565",
            "extra": "mean: 51.1871542289105 usec\nrounds: 12462"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4105.180891073794,
            "unit": "iter/sec",
            "range": "stddev: 0.00003330148185335857",
            "extra": "mean: 243.59462506862386 usec\nrounds: 3638"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_add",
            "value": 9248817.671529824,
            "unit": "iter/sec",
            "range": "stddev: 9.516258612834277e-9",
            "extra": "mean: 108.12192817664146 nsec\nrounds: 93897"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_mul",
            "value": 8659247.31079801,
            "unit": "iter/sec",
            "range": "stddev: 9.98003911428199e-9",
            "extra": "mean: 115.4834784257759 nsec\nrounds: 87025"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_sin",
            "value": 7868632.0853614025,
            "unit": "iter/sec",
            "range": "stddev: 1.519744739912002e-8",
            "extra": "mean: 127.0868925057983 nsec\nrounds: 196117"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_exp",
            "value": 4478697.678495965,
            "unit": "iter/sec",
            "range": "stddev: 1.3015069106119318e-7",
            "extra": "mean: 223.27919225300778 nsec\nrounds: 188680"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_5",
            "value": 64942.17358391682,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012750938887903626",
            "extra": "mean: 15.398314297377537 usec\nrounds: 22221"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_10",
            "value": 10889.489218820687,
            "unit": "iter/sec",
            "range": "stddev: 0.0000039933197359762085",
            "extra": "mean: 91.83167179886316 usec\nrounds: 9223"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_20",
            "value": 1497.3409592022817,
            "unit": "iter/sec",
            "range": "stddev: 0.000021148399632838806",
            "extra": "mean: 667.8505612594453 usec\nrounds: 1461"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5",
            "value": 5735.546590636269,
            "unit": "iter/sec",
            "range": "stddev: 0.000008654665311544349",
            "extra": "mean: 174.3512992523814 usec\nrounds: 4949"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_10",
            "value": 915.6223801585862,
            "unit": "iter/sec",
            "range": "stddev: 0.000015683742453213986",
            "extra": "mean: 1.0921532955832725 msec\nrounds: 883"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_20",
            "value": 130.69517735423128,
            "unit": "iter/sec",
            "range": "stddev: 0.00005194513649541493",
            "extra": "mean: 7.651391736434449 msec\nrounds: 129"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "59a0dc06fdad7171f14b6787f350ed73bbd0bf04",
          "message": "Add fabs to HyperDual, document all supported operations in README",
          "timestamp": "2026-03-04T17:40:09+01:00",
          "tree_id": "6deb253172d12c5b4753003ca4a19074c5d76d52",
          "url": "https://github.com/milanofthe/fastdual/commit/59a0dc06fdad7171f14b6787f350ed73bbd0bf04"
        },
        "date": 1772642483603,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8154548.513662922,
            "unit": "iter/sec",
            "range": "stddev: 1.504247155751699e-8",
            "extra": "mean: 122.63094619211631 nsec\nrounds: 198413"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8163001.054166434,
            "unit": "iter/sec",
            "range": "stddev: 9.827208588591472e-9",
            "extra": "mean: 122.50396555928353 nsec\nrounds: 81880"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 5961606.803405366,
            "unit": "iter/sec",
            "range": "stddev: 2.1115285202633378e-8",
            "extra": "mean: 167.74001254641348 nsec\nrounds: 197668"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10299071.478761766,
            "unit": "iter/sec",
            "range": "stddev: 1.0752621079306471e-8",
            "extra": "mean: 97.09613163304579 nsec\nrounds: 105308"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10411141.564676741,
            "unit": "iter/sec",
            "range": "stddev: 8.924134104664069e-9",
            "extra": "mean: 96.05094636238859 nsec\nrounds: 104516"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8328056.5098369615,
            "unit": "iter/sec",
            "range": "stddev: 9.746867159691047e-9",
            "extra": "mean: 120.07603440476376 nsec\nrounds: 83942"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 7062005.625938399,
            "unit": "iter/sec",
            "range": "stddev: 1.68804267312472e-8",
            "extra": "mean: 141.60283253344477 nsec\nrounds: 194932"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6719737.409605401,
            "unit": "iter/sec",
            "range": "stddev: 1.7728608667884374e-8",
            "extra": "mean: 148.81533891050103 nsec\nrounds: 197668"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7570480.912929803,
            "unit": "iter/sec",
            "range": "stddev: 1.0466731106268911e-8",
            "extra": "mean: 132.0920046561476 nsec\nrounds: 72591"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8343605.082727024,
            "unit": "iter/sec",
            "range": "stddev: 2.0729384445657246e-8",
            "extra": "mean: 119.8522689035469 nsec\nrounds: 197278"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8079090.391298965,
            "unit": "iter/sec",
            "range": "stddev: 1.5949264397542732e-8",
            "extra": "mean: 123.77631039714349 nsec\nrounds: 194970"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8815102.28713481,
            "unit": "iter/sec",
            "range": "stddev: 7.12650083007064e-9",
            "extra": "mean: 113.44167854517683 nsec\nrounds: 44759"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 234251.78936063038,
            "unit": "iter/sec",
            "range": "stddev: 6.381372438155743e-7",
            "extra": "mean: 4.2689108276586145 usec\nrounds: 16855"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 48252.628207982765,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016231497643918367",
            "extra": "mean: 20.72425973751546 usec\nrounds: 18819"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 395298.21172486484,
            "unit": "iter/sec",
            "range": "stddev: 5.064486189780494e-7",
            "extra": "mean: 2.5297357041827935 usec\nrounds: 56520"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 144784.77836939623,
            "unit": "iter/sec",
            "range": "stddev: 0.000001033595088505563",
            "extra": "mean: 6.906803403384386 usec\nrounds: 43780"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 137958.65425718433,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012373429844847966",
            "extra": "mean: 7.2485485262547344 usec\nrounds: 41730"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_10",
            "value": 1163946.6047753291,
            "unit": "iter/sec",
            "range": "stddev: 2.6379337733284983e-7",
            "extra": "mean: 859.1459401121111 nsec\nrounds: 55605"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_100",
            "value": 547677.7782340111,
            "unit": "iter/sec",
            "range": "stddev: 4.0021297412261956e-7",
            "extra": "mean: 1.8258911347918905 usec\nrounds: 154751"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 81687.86805964033,
            "unit": "iter/sec",
            "range": "stddev: 0.00012401787003320951",
            "extra": "mean: 12.241719899825268 usec\nrounds: 13181"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 42343.95405018044,
            "unit": "iter/sec",
            "range": "stddev: 0.00028247969929903516",
            "extra": "mean: 23.61612235869453 usec\nrounds: 19214"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19641.35639773723,
            "unit": "iter/sec",
            "range": "stddev: 0.000202653339915051",
            "extra": "mean: 50.9129807407397 usec\nrounds: 12825"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 45652.454580882906,
            "unit": "iter/sec",
            "range": "stddev: 0.000113154311236415",
            "extra": "mean: 21.90462723594172 usec\nrounds: 20965"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 12015.084980909452,
            "unit": "iter/sec",
            "range": "stddev: 0.000003905448580938566",
            "extra": "mean: 83.22870804400316 usec\nrounds: 5905"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 19503.836825165712,
            "unit": "iter/sec",
            "range": "stddev: 0.00023632405217774107",
            "extra": "mean: 51.27196299702962 usec\nrounds: 10864"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4095.889907178869,
            "unit": "iter/sec",
            "range": "stddev: 0.00000833659079713194",
            "extra": "mean: 244.147187219876 usec\nrounds: 3349"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_add",
            "value": 9178851.114991348,
            "unit": "iter/sec",
            "range": "stddev: 9.525462050284559e-9",
            "extra": "mean: 108.94609657266922 nsec\nrounds: 93546"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_mul",
            "value": 8695784.535572644,
            "unit": "iter/sec",
            "range": "stddev: 9.91773676017561e-9",
            "extra": "mean: 114.99824954369652 nsec\nrounds: 86566"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_sin",
            "value": 7894806.995556005,
            "unit": "iter/sec",
            "range": "stddev: 1.5735599732813596e-8",
            "extra": "mean: 126.66554110352551 nsec\nrounds: 199204"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_exp",
            "value": 8072813.161028188,
            "unit": "iter/sec",
            "range": "stddev: 1.518423528588949e-8",
            "extra": "mean: 123.87255595453863 nsec\nrounds: 196851"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_5",
            "value": 65903.52226148074,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013399331497935578",
            "extra": "mean: 15.17369581601983 usec\nrounds: 21224"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_10",
            "value": 10841.18580217678,
            "unit": "iter/sec",
            "range": "stddev: 0.0000037141017626410993",
            "extra": "mean: 92.24083216055683 usec\nrounds: 8669"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_20",
            "value": 1480.7468287700178,
            "unit": "iter/sec",
            "range": "stddev: 0.000009627635722394627",
            "extra": "mean: 675.3348922115538 usec\nrounds: 1438"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5",
            "value": 5716.807937433442,
            "unit": "iter/sec",
            "range": "stddev: 0.000006873774537456593",
            "extra": "mean: 174.92279099531012 usec\nrounds: 4531"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_10",
            "value": 904.6572248304028,
            "unit": "iter/sec",
            "range": "stddev: 0.0000650445326806971",
            "extra": "mean: 1.1053910503920104 msec\nrounds: 893"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_20",
            "value": 130.82903165129372,
            "unit": "iter/sec",
            "range": "stddev: 0.000047428557603757764",
            "extra": "mean: 7.643563415384428 msec\nrounds: 130"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "d886d56c38864497d410ce32b86ce424b33b0bba",
          "message": "Optimize HyperDual C extension: fix repr leak, eliminate redundant libm calls, add object freelist, reuse hessian seeds",
          "timestamp": "2026-03-04T18:01:16+01:00",
          "tree_id": "2862fe1a9ebf6a62e0cf5ec008f8fb2355628644",
          "url": "https://github.com/milanofthe/fastdual/commit/d886d56c38864497d410ce32b86ce424b33b0bba"
        },
        "date": 1772643764143,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 7934704.780836642,
            "unit": "iter/sec",
            "range": "stddev: 1.7344794170920116e-8",
            "extra": "mean: 126.02863340487875 nsec\nrounds: 198847"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8123858.148814312,
            "unit": "iter/sec",
            "range": "stddev: 1.0752846425932767e-8",
            "extra": "mean: 123.09422218874553 nsec\nrounds: 80238"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 5750076.601254774,
            "unit": "iter/sec",
            "range": "stddev: 2.2007462301538013e-8",
            "extra": "mean: 173.9107266469774 nsec\nrounds: 196464"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10147235.719261866,
            "unit": "iter/sec",
            "range": "stddev: 2.3695901718348612e-8",
            "extra": "mean: 98.549006612881 nsec\nrounds: 46841"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10197184.509403748,
            "unit": "iter/sec",
            "range": "stddev: 9.226918781776253e-9",
            "extra": "mean: 98.06628477476399 nsec\nrounds: 102481"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8229097.653585038,
            "unit": "iter/sec",
            "range": "stddev: 1.0362283001949729e-8",
            "extra": "mean: 121.52000645712911 nsec\nrounds: 82082"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 6999831.2855134085,
            "unit": "iter/sec",
            "range": "stddev: 1.80008002005548e-8",
            "extra": "mean: 142.86058609291953 nsec\nrounds: 190840"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6717230.82370644,
            "unit": "iter/sec",
            "range": "stddev: 1.846297296835341e-8",
            "extra": "mean: 148.87087048889276 nsec\nrounds: 197278"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7429004.238381291,
            "unit": "iter/sec",
            "range": "stddev: 2.4248981833395378e-8",
            "extra": "mean: 134.60754199514233 nsec\nrounds: 197668"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8280698.383284021,
            "unit": "iter/sec",
            "range": "stddev: 1.6425867737362623e-8",
            "extra": "mean: 120.76276102733893 nsec\nrounds: 199204"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8023313.991386485,
            "unit": "iter/sec",
            "range": "stddev: 1.5242348879725322e-8",
            "extra": "mean: 124.63677740564071 nsec\nrounds: 199641"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8655492.825429354,
            "unit": "iter/sec",
            "range": "stddev: 7.594202670779258e-9",
            "extra": "mean: 115.53357159075402 nsec\nrounds: 44028"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 234082.34347382028,
            "unit": "iter/sec",
            "range": "stddev: 6.807725944062531e-7",
            "extra": "mean: 4.2720009769204985 usec\nrounds: 16377"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 46883.540502896714,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016933378273074203",
            "extra": "mean: 21.32944716362056 usec\nrounds: 18756"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 397453.92856590135,
            "unit": "iter/sec",
            "range": "stddev: 4.762744000799888e-7",
            "extra": "mean: 2.5160148840601817 usec\nrounds: 58855"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 143172.6869895685,
            "unit": "iter/sec",
            "range": "stddev: 8.710425614696261e-7",
            "extra": "mean: 6.9845724141006 usec\nrounds: 43341"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 141239.72078573395,
            "unit": "iter/sec",
            "range": "stddev: 8.336400249172048e-7",
            "extra": "mean: 7.080161263679062 usec\nrounds: 43587"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_10",
            "value": 1190814.1283607297,
            "unit": "iter/sec",
            "range": "stddev: 2.8060418735321163e-7",
            "extra": "mean: 839.7616186974506 nsec\nrounds: 57429"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_100",
            "value": 552456.9994822369,
            "unit": "iter/sec",
            "range": "stddev: 4.4023499297783217e-7",
            "extra": "mean: 1.8100956290484158 usec\nrounds: 159439"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 81606.23465738607,
            "unit": "iter/sec",
            "range": "stddev: 0.0001221129748238253",
            "extra": "mean: 12.253965695125862 usec\nrounds: 13380"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 41854.67968026794,
            "unit": "iter/sec",
            "range": "stddev: 0.00026377709223669336",
            "extra": "mean: 23.89219097217084 usec\nrounds: 19872"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19698.134679803086,
            "unit": "iter/sec",
            "range": "stddev: 0.00019334213161019368",
            "extra": "mean: 50.76622818633285 usec\nrounds: 12985"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 44493.41092974683,
            "unit": "iter/sec",
            "range": "stddev: 0.0001332830009621088",
            "extra": "mean: 22.475237998250048 usec\nrounds: 21601"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 12202.69191561377,
            "unit": "iter/sec",
            "range": "stddev: 0.00000401367122526704",
            "extra": "mean: 81.94913113560338 usec\nrounds: 6886"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 19464.27504396857,
            "unit": "iter/sec",
            "range": "stddev: 0.00018383671892181628",
            "extra": "mean: 51.37617495339863 usec\nrounds: 10700"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4140.050623266553,
            "unit": "iter/sec",
            "range": "stddev: 0.00000804318089032351",
            "extra": "mean: 241.54294017085888 usec\nrounds: 3627"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_add",
            "value": 10358085.601959635,
            "unit": "iter/sec",
            "range": "stddev: 9.155407205370595e-9",
            "extra": "mean: 96.54293644868228 nsec\nrounds: 105631"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_mul",
            "value": 10632741.563972421,
            "unit": "iter/sec",
            "range": "stddev: 8.856084563972956e-9",
            "extra": "mean: 94.04912119639606 nsec\nrounds: 106406"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_sin",
            "value": 9419866.605967201,
            "unit": "iter/sec",
            "range": "stddev: 6.484916429361026e-9",
            "extra": "mean: 106.15861580954132 nsec\nrounds: 47237"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_exp",
            "value": 9547433.777250217,
            "unit": "iter/sec",
            "range": "stddev: 1.2177639792174566e-8",
            "extra": "mean: 104.74018708386505 nsec\nrounds: 48080"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_5",
            "value": 92442.74484936068,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011203647738291732",
            "extra": "mean: 10.817506572630895 usec\nrounds: 16584"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_10",
            "value": 16505.669842138446,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028341597600104524",
            "extra": "mean: 60.585241893487535 usec\nrounds: 13816"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_20",
            "value": 2318.0501561823266,
            "unit": "iter/sec",
            "range": "stddev: 0.000009278256620430013",
            "extra": "mean: 431.3970503757059 usec\nrounds: 2263"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5",
            "value": 5706.78100563074,
            "unit": "iter/sec",
            "range": "stddev: 0.000006408727511548063",
            "extra": "mean: 175.2301339429925 usec\nrounds: 4920"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_10",
            "value": 907.0044965386935,
            "unit": "iter/sec",
            "range": "stddev: 0.000018718793758748115",
            "extra": "mean: 1.1025303665154864 msec\nrounds: 884"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_20",
            "value": 129.2505426671048,
            "unit": "iter/sec",
            "range": "stddev: 0.000051796812477247546",
            "extra": "mean: 7.736911423076811 msec\nrounds: 130"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "704e86afaca33bff22699370df508d7d54d5f2b1",
          "message": "Add gradient vs hessian benchmarks, fix HyperDual overhead table to compare vs float",
          "timestamp": "2026-03-04T18:10:22+01:00",
          "tree_id": "750e7edc58f56edef17843ce172220c35115408c",
          "url": "https://github.com/milanofthe/fastdual/commit/704e86afaca33bff22699370df508d7d54d5f2b1"
        },
        "date": 1772644289832,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8215168.976335665,
            "unit": "iter/sec",
            "range": "stddev: 1.9817113800464744e-8",
            "extra": "mean: 121.72604153128997 nsec\nrounds: 198060"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8074637.196526667,
            "unit": "iter/sec",
            "range": "stddev: 2.2796085167662554e-8",
            "extra": "mean: 123.8445735283504 nsec\nrounds: 79466"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 5982341.222132693,
            "unit": "iter/sec",
            "range": "stddev: 2.207841840804432e-8",
            "extra": "mean: 167.15863620422206 nsec\nrounds: 198847"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10140633.96007793,
            "unit": "iter/sec",
            "range": "stddev: 9.878447084187205e-9",
            "extra": "mean: 98.61316402276637 nsec\nrounds: 102376"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10209467.349143934,
            "unit": "iter/sec",
            "range": "stddev: 9.861950571457423e-9",
            "extra": "mean: 97.94830286458091 nsec\nrounds: 103221"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8176620.1124492595,
            "unit": "iter/sec",
            "range": "stddev: 1.6283462891274404e-8",
            "extra": "mean: 122.29992175831387 nsec\nrounds: 199601"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 6615294.670840067,
            "unit": "iter/sec",
            "range": "stddev: 3.421806108577824e-8",
            "extra": "mean: 151.1648459754872 nsec\nrounds: 198020"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6650275.796624073,
            "unit": "iter/sec",
            "range": "stddev: 1.9037391668291836e-8",
            "extra": "mean: 150.369703540361 nsec\nrounds: 193799"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7316456.393954767,
            "unit": "iter/sec",
            "range": "stddev: 1.7779732627655264e-8",
            "extra": "mean: 136.67818765738173 nsec\nrounds: 186255"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8232140.57292888,
            "unit": "iter/sec",
            "range": "stddev: 5.70772295728698e-8",
            "extra": "mean: 121.475087936237 nsec\nrounds: 196079"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8222318.792013354,
            "unit": "iter/sec",
            "range": "stddev: 1.9029194572136005e-8",
            "extra": "mean: 121.62019319554204 nsec\nrounds: 194932"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8638693.817151451,
            "unit": "iter/sec",
            "range": "stddev: 1.7751560943663522e-8",
            "extra": "mean: 115.75824090611688 nsec\nrounds: 196117"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 232833.4166080586,
            "unit": "iter/sec",
            "range": "stddev: 7.523100965860119e-7",
            "extra": "mean: 4.294916144632948 usec\nrounds: 16123"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 47070.20360666737,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019417686105332873",
            "extra": "mean: 21.24486242626647 usec\nrounds: 18819"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 388611.5419859224,
            "unit": "iter/sec",
            "range": "stddev: 5.145742269728823e-7",
            "extra": "mean: 2.573263765892536 usec\nrounds: 40426"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 141206.57552643132,
            "unit": "iter/sec",
            "range": "stddev: 9.481946382031248e-7",
            "extra": "mean: 7.081823181901456 usec\nrounds: 38763"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 139766.64080426164,
            "unit": "iter/sec",
            "range": "stddev: 8.480143843808911e-7",
            "extra": "mean: 7.154783103075831 usec\nrounds: 40102"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_10",
            "value": 1171020.8064117667,
            "unit": "iter/sec",
            "range": "stddev: 2.434252049125594e-7",
            "extra": "mean: 853.9557918395938 nsec\nrounds: 50692"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_100",
            "value": 548599.3138174211,
            "unit": "iter/sec",
            "range": "stddev: 4.295319964674035e-7",
            "extra": "mean: 1.8228240080023308 usec\nrounds: 118977"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 77937.94613470726,
            "unit": "iter/sec",
            "range": "stddev: 0.00015094159397053801",
            "extra": "mean: 12.830720458961142 usec\nrounds: 12288"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 41125.68315860425,
            "unit": "iter/sec",
            "range": "stddev: 0.00029122151532360864",
            "extra": "mean: 24.315705495843698 usec\nrounds: 19633"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19025.28404722623,
            "unit": "iter/sec",
            "range": "stddev: 0.00021789885500080142",
            "extra": "mean: 52.56163311505428 usec\nrounds: 12369"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 44148.131014361104,
            "unit": "iter/sec",
            "range": "stddev: 0.00011683055919002994",
            "extra": "mean: 22.651015502212456 usec\nrounds: 23287"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 12058.290929083045,
            "unit": "iter/sec",
            "range": "stddev: 0.000004385847487264492",
            "extra": "mean: 82.93049204743674 usec\nrounds: 5910"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 19525.432373404677,
            "unit": "iter/sec",
            "range": "stddev: 0.00019710282340756487",
            "extra": "mean: 51.215255102984884 usec\nrounds: 10925"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4098.4341241793445,
            "unit": "iter/sec",
            "range": "stddev: 0.000009537299657920978",
            "extra": "mean: 243.9956260612671 usec\nrounds: 2709"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_add",
            "value": 10581221.29292785,
            "unit": "iter/sec",
            "range": "stddev: 9.033190066504042e-9",
            "extra": "mean: 94.50704907460617 nsec\nrounds: 108366"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_mul",
            "value": 10599515.007897444,
            "unit": "iter/sec",
            "range": "stddev: 9.00540343688903e-9",
            "extra": "mean: 94.34393925145858 nsec\nrounds: 106406"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_sin",
            "value": 9486816.738206713,
            "unit": "iter/sec",
            "range": "stddev: 7.821918820284076e-9",
            "extra": "mean: 105.40943580923745 nsec\nrounds: 47351"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_exp",
            "value": 9652005.137906779,
            "unit": "iter/sec",
            "range": "stddev: 8.123733139572712e-9",
            "extra": "mean: 103.60541521809313 nsec\nrounds: 50335"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_5",
            "value": 76747.80533869677,
            "unit": "iter/sec",
            "range": "stddev: 0.00010703291668777881",
            "extra": "mean: 13.029688544016166 usec\nrounds: 13469"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_10",
            "value": 63051.34233492836,
            "unit": "iter/sec",
            "range": "stddev: 0.000009309418592704813",
            "extra": "mean: 15.860090570126259 usec\nrounds: 24942"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_20",
            "value": 31841.061109152168,
            "unit": "iter/sec",
            "range": "stddev: 0.0010466157032166538",
            "extra": "mean: 31.40598853072039 usec\nrounds: 18833"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_5",
            "value": 91451.50977200599,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011162883697774755",
            "extra": "mean: 10.9347565993504 usec\nrounds: 30912"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_10",
            "value": 16414.003712777743,
            "unit": "iter/sec",
            "range": "stddev: 0.00000282776050912329",
            "extra": "mean: 60.92358802267932 usec\nrounds: 13559"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_20",
            "value": 2319.6269234829074,
            "unit": "iter/sec",
            "range": "stddev: 0.000008234541401502102",
            "extra": "mean: 431.103808063456 usec\nrounds: 2282"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5",
            "value": 5726.514590561091,
            "unit": "iter/sec",
            "range": "stddev: 0.000013760100239985167",
            "extra": "mean: 174.62629042249918 usec\nrounds: 4521"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_10",
            "value": 911.210807609065,
            "unit": "iter/sec",
            "range": "stddev: 0.000021179451171601755",
            "extra": "mean: 1.0974408903510593 msec\nrounds: 912"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_20",
            "value": 129.29999671218317,
            "unit": "iter/sec",
            "range": "stddev: 0.0003298720587627106",
            "extra": "mean: 7.733952246154821 msec\nrounds: 130"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milan.rother@gmx.de",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "0f4abeccbe8160ab6a7d990f176455e83695c514",
          "message": "Fix findiff benchmarks to use raw function instead of autohess-wrapped",
          "timestamp": "2026-03-09T09:42:12+01:00",
          "tree_id": "b51df48740a317656c6578076844e419e3389639",
          "url": "https://github.com/milanofthe/fastdual/commit/0f4abeccbe8160ab6a7d990f176455e83695c514"
        },
        "date": 1773045811394,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8171384.661506176,
            "unit": "iter/sec",
            "range": "stddev: 1.6909922798994065e-8",
            "extra": "mean: 122.37827998855666 nsec\nrounds: 199641"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8043483.630109141,
            "unit": "iter/sec",
            "range": "stddev: 1.0131823806232673e-8",
            "extra": "mean: 124.32424133452623 nsec\nrounds: 81215"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 6010544.551007709,
            "unit": "iter/sec",
            "range": "stddev: 2.0506744505109984e-8",
            "extra": "mean: 166.37427632615137 nsec\nrounds: 199641"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10234072.01851589,
            "unit": "iter/sec",
            "range": "stddev: 9.643040087003105e-9",
            "extra": "mean: 97.71281638342589 nsec\nrounds: 103008"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10297071.97630559,
            "unit": "iter/sec",
            "range": "stddev: 8.55791062888544e-9",
            "extra": "mean: 97.11498592037448 nsec\nrounds: 104406"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8319716.423731137,
            "unit": "iter/sec",
            "range": "stddev: 9.495491885726727e-9",
            "extra": "mean: 120.19640442883397 nsec\nrounds: 83105"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 7003104.194542949,
            "unit": "iter/sec",
            "range": "stddev: 1.78504674933695e-8",
            "extra": "mean: 142.79382002901417 nsec\nrounds: 193799"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6593709.349793224,
            "unit": "iter/sec",
            "range": "stddev: 1.8480028913950724e-8",
            "extra": "mean: 151.65970274855374 nsec\nrounds: 195695"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7549009.998263782,
            "unit": "iter/sec",
            "range": "stddev: 1.1403656113718809e-8",
            "extra": "mean: 132.467701093255 nsec\nrounds: 73287"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8388596.742669125,
            "unit": "iter/sec",
            "range": "stddev: 1.4167346686081316e-8",
            "extra": "mean: 119.20944952728948 nsec\nrounds: 196851"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8068484.3029702725,
            "unit": "iter/sec",
            "range": "stddev: 1.4864882673561473e-8",
            "extra": "mean: 123.93901536523624 nsec\nrounds: 197278"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8776103.370843649,
            "unit": "iter/sec",
            "range": "stddev: 9.502840369710336e-9",
            "extra": "mean: 113.94578638650081 nsec\nrounds: 87635"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 233476.9163229732,
            "unit": "iter/sec",
            "range": "stddev: 6.191472278441418e-7",
            "extra": "mean: 4.283078668970771 usec\nrounds: 16830"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 46843.48282115536,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019385683398715833",
            "extra": "mean: 21.34768680240791 usec\nrounds: 19534"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 393031.4397758882,
            "unit": "iter/sec",
            "range": "stddev: 4.935937989520867e-7",
            "extra": "mean: 2.54432571748004 usec\nrounds: 61013"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 141750.81903248682,
            "unit": "iter/sec",
            "range": "stddev: 9.086397241888269e-7",
            "extra": "mean: 7.054632959622036 usec\nrounds: 44600"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 140221.06130380568,
            "unit": "iter/sec",
            "range": "stddev: 8.64296028410569e-7",
            "extra": "mean: 7.1315962859058715 usec\nrounds: 41195"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_10",
            "value": 1183471.3023727518,
            "unit": "iter/sec",
            "range": "stddev: 2.5577110294522386e-7",
            "extra": "mean: 844.9719042574934 nsec\nrounds: 55916"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_100",
            "value": 549384.3394995234,
            "unit": "iter/sec",
            "range": "stddev: 3.7951699684272193e-7",
            "extra": "mean: 1.820219340272745 usec\nrounds: 170329"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 80369.28793184776,
            "unit": "iter/sec",
            "range": "stddev: 0.00012816151037616416",
            "extra": "mean: 12.442563891420669 usec\nrounds: 12756"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 42270.504831398706,
            "unit": "iter/sec",
            "range": "stddev: 0.00028459263216581423",
            "extra": "mean: 23.657157727087185 usec\nrounds: 19781"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19612.899611976172,
            "unit": "iter/sec",
            "range": "stddev: 0.00019962471447613532",
            "extra": "mean: 50.98685149998793 usec\nrounds: 12532"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 44960.108634704564,
            "unit": "iter/sec",
            "range": "stddev: 0.00011358978625041039",
            "extra": "mean: 22.2419391404251 usec\nrounds: 21870"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 12145.955008433504,
            "unit": "iter/sec",
            "range": "stddev: 0.0000036040741320519745",
            "extra": "mean: 82.33193678929761 usec\nrounds: 6597"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 19828.45139242682,
            "unit": "iter/sec",
            "range": "stddev: 0.00018938452473591858",
            "extra": "mean: 50.43258196058291 usec\nrounds: 10987"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4122.403484639868,
            "unit": "iter/sec",
            "range": "stddev: 0.000009001403275068388",
            "extra": "mean: 242.5769344815503 usec\nrounds: 3251"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_add",
            "value": 10693596.949322112,
            "unit": "iter/sec",
            "range": "stddev: 8.694811363374026e-9",
            "extra": "mean: 93.5139041371287 nsec\nrounds: 106861"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_mul",
            "value": 10519694.488189206,
            "unit": "iter/sec",
            "range": "stddev: 8.763282503617872e-9",
            "extra": "mean: 95.05979485646962 nsec\nrounds: 105731"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_sin",
            "value": 9598507.46662651,
            "unit": "iter/sec",
            "range": "stddev: 6.907617496511443e-9",
            "extra": "mean: 104.18286420851844 nsec\nrounds: 48523"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_exp",
            "value": 9888997.012404857,
            "unit": "iter/sec",
            "range": "stddev: 6.783952239888042e-9",
            "extra": "mean: 101.1224898486257 nsec\nrounds: 50485"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_5",
            "value": 77952.7039419967,
            "unit": "iter/sec",
            "range": "stddev: 0.00008543613995924755",
            "extra": "mean: 12.828291379656095 usec\nrounds: 15533"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_10",
            "value": 46829.299064885214,
            "unit": "iter/sec",
            "range": "stddev: 0.000878497701835368",
            "extra": "mean: 21.354152634538288 usec\nrounds: 23743"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_20",
            "value": 42467.80541691689,
            "unit": "iter/sec",
            "range": "stddev: 0.000008290944769308188",
            "extra": "mean: 23.54724926759822 usec\nrounds: 14679"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_5",
            "value": 72509.26236620567,
            "unit": "iter/sec",
            "range": "stddev: 0.000001143174868692045",
            "extra": "mean: 13.791341510958041 usec\nrounds: 32324"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_10",
            "value": 14263.069841264629,
            "unit": "iter/sec",
            "range": "stddev: 0.000003127953826101264",
            "extra": "mean: 70.11113393744242 usec\nrounds: 12364"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_20",
            "value": 2126.3731064562244,
            "unit": "iter/sec",
            "range": "stddev: 0.00000834456198859254",
            "extra": "mean: 470.28435271483573 usec\nrounds: 2081"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5",
            "value": 5266.70257235367,
            "unit": "iter/sec",
            "range": "stddev: 0.000006983475493059325",
            "extra": "mean: 189.87212326157686 usec\nrounds: 4170"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_10",
            "value": 980.9601700684301,
            "unit": "iter/sec",
            "range": "stddev: 0.000012889048453011866",
            "extra": "mean: 1.0194093812496399 msec\nrounds: 960"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_20",
            "value": 156.06532445968807,
            "unit": "iter/sec",
            "range": "stddev: 0.00008318928137980484",
            "extra": "mean: 6.407573261146179 msec\nrounds: 157"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "105657697+milanofthe@users.noreply.github.com",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "105657697+milanofthe@users.noreply.github.com",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "685a88d93fa6d79eb768e7990d3323c288978a65",
          "message": "Bump cibuildwheel v2.21 -> v2.23 to fix virtualenv download 429 errors",
          "timestamp": "2026-03-09T10:08:33+01:00",
          "tree_id": "e8e509d2d25a73936556f5e9b29702708c963dec",
          "url": "https://github.com/milanofthe/fastdual/commit/685a88d93fa6d79eb768e7990d3323c288978a65"
        },
        "date": 1773047376976,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8354954.642969002,
            "unit": "iter/sec",
            "range": "stddev: 1.5403711532620714e-8",
            "extra": "mean: 119.68945885798868 nsec\nrounds: 199641"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8278545.918493175,
            "unit": "iter/sec",
            "range": "stddev: 1.2269063559343458e-8",
            "extra": "mean: 120.7941599703074 nsec\nrounds: 82015"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 6033835.463471097,
            "unit": "iter/sec",
            "range": "stddev: 2.2098392959480905e-8",
            "extra": "mean: 165.732063138614 nsec\nrounds: 192679"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10568946.649837844,
            "unit": "iter/sec",
            "range": "stddev: 9.542988472985402e-9",
            "extra": "mean: 94.6168083850951 nsec\nrounds: 107090"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10257891.30012126,
            "unit": "iter/sec",
            "range": "stddev: 9.337614671284172e-9",
            "extra": "mean: 97.48592286098595 nsec\nrounds: 105731"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8321215.31714892,
            "unit": "iter/sec",
            "range": "stddev: 1.0298904638079548e-8",
            "extra": "mean: 120.1747535530216 nsec\nrounds: 79530"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 7024983.933858359,
            "unit": "iter/sec",
            "range": "stddev: 1.8672429686993025e-8",
            "extra": "mean: 142.34908000006857 nsec\nrounds: 196890"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6681679.454070976,
            "unit": "iter/sec",
            "range": "stddev: 2.575562543542811e-8",
            "extra": "mean: 149.66297124456125 nsec\nrounds: 193462"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7361892.850547969,
            "unit": "iter/sec",
            "range": "stddev: 1.7633546810591603e-8",
            "extra": "mean: 135.83463116086602 nsec\nrounds: 197239"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8509055.21607072,
            "unit": "iter/sec",
            "range": "stddev: 1.6305699607282012e-8",
            "extra": "mean: 117.52186048943942 nsec\nrounds: 198020"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8062100.709956652,
            "unit": "iter/sec",
            "range": "stddev: 1.6104129419221746e-8",
            "extra": "mean: 124.03715061075896 nsec\nrounds: 200000"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8591465.321594866,
            "unit": "iter/sec",
            "range": "stddev: 1.492467736213826e-8",
            "extra": "mean: 116.39458026868533 nsec\nrounds: 196890"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 236502.09660568155,
            "unit": "iter/sec",
            "range": "stddev: 8.399865354669215e-7",
            "extra": "mean: 4.228292325320455 usec\nrounds: 16639"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 47713.24082574713,
            "unit": "iter/sec",
            "range": "stddev: 0.000002461427521174254",
            "extra": "mean: 20.958542800563183 usec\nrounds: 17710"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 390508.7878251989,
            "unit": "iter/sec",
            "range": "stddev: 4.851264908089607e-7",
            "extra": "mean: 2.5607618347570296 usec\nrounds: 51691"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 141369.13732226004,
            "unit": "iter/sec",
            "range": "stddev: 9.990502300092284e-7",
            "extra": "mean: 7.073679722048778 usec\nrounds: 42026"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 140514.59811655167,
            "unit": "iter/sec",
            "range": "stddev: 0.000001108414377568174",
            "extra": "mean: 7.116698289031414 usec\nrounds: 42259"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_10",
            "value": 1177967.2460649437,
            "unit": "iter/sec",
            "range": "stddev: 2.75987490728097e-7",
            "extra": "mean: 848.9200386008594 nsec\nrounds: 48736"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_100",
            "value": 551291.5882012101,
            "unit": "iter/sec",
            "range": "stddev: 4.0912442779864197e-7",
            "extra": "mean: 1.8139221083761947 usec\nrounds: 131683"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 78968.79600846209,
            "unit": "iter/sec",
            "range": "stddev: 0.00013935930134082255",
            "extra": "mean: 12.663229662167353 usec\nrounds: 11813"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 41330.86482087487,
            "unit": "iter/sec",
            "range": "stddev: 0.00027333787183707797",
            "extra": "mean: 24.194993362319693 usec\nrounds: 21694"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19509.691716044694,
            "unit": "iter/sec",
            "range": "stddev: 0.00019464806967987446",
            "extra": "mean: 51.25657619579934 usec\nrounds: 11897"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 44622.44484418412,
            "unit": "iter/sec",
            "range": "stddev: 0.00012595650456882456",
            "extra": "mean: 22.41024676016458 usec\nrounds: 20834"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 12355.915136384547,
            "unit": "iter/sec",
            "range": "stddev: 0.000004352554956220865",
            "extra": "mean: 80.9328964275008 usec\nrounds: 6382"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 19185.32445198317,
            "unit": "iter/sec",
            "range": "stddev: 0.00022732245152189202",
            "extra": "mean: 52.12317375725333 usec\nrounds: 10601"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4190.398013382156,
            "unit": "iter/sec",
            "range": "stddev: 0.000007841659841714977",
            "extra": "mean: 238.64081569494624 usec\nrounds: 3619"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_add",
            "value": 7895649.7587569505,
            "unit": "iter/sec",
            "range": "stddev: 1.6399938542365325e-8",
            "extra": "mean: 126.65202111972032 nsec\nrounds: 105397"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_mul",
            "value": 9503267.689733937,
            "unit": "iter/sec",
            "range": "stddev: 1.234185524140715e-8",
            "extra": "mean: 105.22696325604575 nsec\nrounds: 90001"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_sin",
            "value": 9701322.469737206,
            "unit": "iter/sec",
            "range": "stddev: 8.968552367681683e-9",
            "extra": "mean: 103.0787300514389 nsec\nrounds: 44301"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_exp",
            "value": 7783493.074730717,
            "unit": "iter/sec",
            "range": "stddev: 1.2093982453068993e-8",
            "extra": "mean: 128.4770205868779 nsec\nrounds: 39298"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_5",
            "value": 79640.74380666758,
            "unit": "iter/sec",
            "range": "stddev: 0.00005980031752397181",
            "extra": "mean: 12.556386997433835 usec\nrounds: 14597"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_10",
            "value": 47244.21608344395,
            "unit": "iter/sec",
            "range": "stddev: 0.0008686441330222686",
            "extra": "mean: 21.166612188755003 usec\nrounds: 25778"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_20",
            "value": 41789.34483307835,
            "unit": "iter/sec",
            "range": "stddev: 0.000019018906164787368",
            "extra": "mean: 23.929544815654783 usec\nrounds: 19781"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_5",
            "value": 71743.08692678272,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012498977047283624",
            "extra": "mean: 13.938625208872713 usec\nrounds: 31124"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_10",
            "value": 14129.430101197433,
            "unit": "iter/sec",
            "range": "stddev: 0.000003253619964809672",
            "extra": "mean: 70.77426285687578 usec\nrounds: 12231"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_20",
            "value": 2106.7268426030205,
            "unit": "iter/sec",
            "range": "stddev: 0.000038581946979946494",
            "extra": "mean: 474.6699855802968 usec\nrounds: 2011"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5",
            "value": 5342.002013828912,
            "unit": "iter/sec",
            "range": "stddev: 0.00000782609343979724",
            "extra": "mean: 187.19573624481734 usec\nrounds: 4489"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_10",
            "value": 998.69064293516,
            "unit": "iter/sec",
            "range": "stddev: 0.00001794309129767176",
            "extra": "mean: 1.001311073728489 msec\nrounds: 963"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_20",
            "value": 158.71213063554322,
            "unit": "iter/sec",
            "range": "stddev: 0.00004380638493093401",
            "extra": "mean: 6.300715616352845 msec\nrounds: 159"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "105657697+milanofthe@users.noreply.github.com",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "105657697+milanofthe@users.noreply.github.com",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "fae37707a9ebcc97116388a7fd8e4b5723571876",
          "message": "Add setup-uv to publish workflow to avoid virtualenv download 429s",
          "timestamp": "2026-03-09T10:11:19+01:00",
          "tree_id": "53c24c4dcb925b604f2ee4e663eb00cef8ae34b7",
          "url": "https://github.com/milanofthe/fastdual/commit/fae37707a9ebcc97116388a7fd8e4b5723571876"
        },
        "date": 1773047531620,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8905397.638100741,
            "unit": "iter/sec",
            "range": "stddev: 1.117551167002009e-8",
            "extra": "mean: 112.29144847183608 nsec\nrounds: 193799"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8919946.446423309,
            "unit": "iter/sec",
            "range": "stddev: 1.638432274164308e-8",
            "extra": "mean: 112.10829639016237 nsec\nrounds: 64334"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 6100538.267847528,
            "unit": "iter/sec",
            "range": "stddev: 2.082452153856699e-8",
            "extra": "mean: 163.91996182868516 nsec\nrounds: 196580"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 11470560.761764796,
            "unit": "iter/sec",
            "range": "stddev: 6.360363575336475e-9",
            "extra": "mean: 87.17969598603526 nsec\nrounds: 72036"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 11587599.097448047,
            "unit": "iter/sec",
            "range": "stddev: 6.731388511473384e-9",
            "extra": "mean: 86.29915408621889 nsec\nrounds: 98426"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8806326.087805107,
            "unit": "iter/sec",
            "range": "stddev: 8.378128522716985e-9",
            "extra": "mean: 113.55473213566187 nsec\nrounds: 80154"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 7515334.156521701,
            "unit": "iter/sec",
            "range": "stddev: 1.4758440640280081e-8",
            "extra": "mean: 133.06128232930456 nsec\nrounds: 196503"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 7525996.957262648,
            "unit": "iter/sec",
            "range": "stddev: 1.505043212719198e-8",
            "extra": "mean: 132.87276166581384 nsec\nrounds: 190187"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 8036360.878740286,
            "unit": "iter/sec",
            "range": "stddev: 1.4564351165221955e-8",
            "extra": "mean: 124.43443183909777 nsec\nrounds: 199761"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8842049.620008068,
            "unit": "iter/sec",
            "range": "stddev: 9.965105126363668e-9",
            "extra": "mean: 113.09594980525426 nsec\nrounds: 196812"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 9076349.079454975,
            "unit": "iter/sec",
            "range": "stddev: 1.2295884756449475e-8",
            "extra": "mean: 110.17645875515939 nsec\nrounds: 194856"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8901085.295137865,
            "unit": "iter/sec",
            "range": "stddev: 1.0792794597106506e-8",
            "extra": "mean: 112.34585074094734 nsec\nrounds: 191388"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 232637.26152019715,
            "unit": "iter/sec",
            "range": "stddev: 5.820656264371306e-7",
            "extra": "mean: 4.298537532059033 usec\nrounds: 16479"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 50138.31098775025,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010462055989288847",
            "extra": "mean: 19.944828222161675 usec\nrounds: 14804"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 429552.1717003874,
            "unit": "iter/sec",
            "range": "stddev: 2.926357965377074e-7",
            "extra": "mean: 2.3280059231023977 usec\nrounds: 54873"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 159082.26383495925,
            "unit": "iter/sec",
            "range": "stddev: 6.365844680142573e-7",
            "extra": "mean: 6.28605588010399 usec\nrounds: 31496"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 156323.23388265085,
            "unit": "iter/sec",
            "range": "stddev: 5.384585781508018e-7",
            "extra": "mean: 6.397001745439086 usec\nrounds: 34378"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_10",
            "value": 1238385.3761758155,
            "unit": "iter/sec",
            "range": "stddev: 1.6173206845702022e-7",
            "extra": "mean: 807.5030755676725 nsec\nrounds: 30075"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_100",
            "value": 630105.2087368948,
            "unit": "iter/sec",
            "range": "stddev: 2.5359129934291995e-7",
            "extra": "mean: 1.5870365553787347 usec\nrounds: 44344"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 78950.26296712947,
            "unit": "iter/sec",
            "range": "stddev: 0.00017946697865566167",
            "extra": "mean: 12.666202269856209 usec\nrounds: 12775"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 42049.89481816936,
            "unit": "iter/sec",
            "range": "stddev: 0.00033453276434741095",
            "extra": "mean: 23.78127232717618 usec\nrounds: 12955"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 20871.40684337101,
            "unit": "iter/sec",
            "range": "stddev: 0.00020543178385740033",
            "extra": "mean: 47.91243865372741 usec\nrounds: 11435"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 47067.97410034929,
            "unit": "iter/sec",
            "range": "stddev: 0.0001329756931070877",
            "extra": "mean: 21.24586874863133 usec\nrounds: 17836"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 13412.830611335132,
            "unit": "iter/sec",
            "range": "stddev: 0.0000029515575114461805",
            "extra": "mean: 74.55547818183163 usec\nrounds: 7104"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 21188.242204230686,
            "unit": "iter/sec",
            "range": "stddev: 0.00015060076214100696",
            "extra": "mean: 47.195986828974824 usec\nrounds: 9111"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4664.791804259883,
            "unit": "iter/sec",
            "range": "stddev: 0.000006977386307866208",
            "extra": "mean: 214.37183950777847 usec\nrounds: 2916"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_add",
            "value": 12013156.960122036,
            "unit": "iter/sec",
            "range": "stddev: 7.711954350415249e-9",
            "extra": "mean: 83.2420656218448 nsec\nrounds: 103136"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_mul",
            "value": 11734321.347117696,
            "unit": "iter/sec",
            "range": "stddev: 7.0056857018284214e-9",
            "extra": "mean: 85.22009670764898 nsec\nrounds: 101854"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_sin",
            "value": 9997686.839518381,
            "unit": "iter/sec",
            "range": "stddev: 5.329274101736295e-9",
            "extra": "mean: 100.02313695676558 nsec\nrounds: 50133"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_exp",
            "value": 10882456.757184485,
            "unit": "iter/sec",
            "range": "stddev: 6.723127057568005e-9",
            "extra": "mean: 91.89101526544641 nsec\nrounds: 48805"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_5",
            "value": 71970.78587526629,
            "unit": "iter/sec",
            "range": "stddev: 0.00019697646032735788",
            "extra": "mean: 13.894526617134844 usec\nrounds: 15723"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_10",
            "value": 66449.35986838472,
            "unit": "iter/sec",
            "range": "stddev: 0.000007193528479989642",
            "extra": "mean: 15.049053925887103 usec\nrounds: 21548"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_20",
            "value": 33671.44206630284,
            "unit": "iter/sec",
            "range": "stddev: 0.0009294971164834943",
            "extra": "mean: 29.69875771969873 usec\nrounds: 17682"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_5",
            "value": 76319.7307944599,
            "unit": "iter/sec",
            "range": "stddev: 8.058481549901401e-7",
            "extra": "mean: 13.10277158462659 usec\nrounds: 29582"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_10",
            "value": 15839.133604869266,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023076992246681587",
            "extra": "mean: 63.13476639230949 usec\nrounds: 12307"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_20",
            "value": 2422.1695952496225,
            "unit": "iter/sec",
            "range": "stddev: 0.000023601513411437",
            "extra": "mean: 412.8530066437989 usec\nrounds: 2258"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5",
            "value": 5870.6323210935225,
            "unit": "iter/sec",
            "range": "stddev: 0.000006128664740017071",
            "extra": "mean: 170.33940218108057 usec\nrounds: 3578"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_10",
            "value": 1165.1637857775665,
            "unit": "iter/sec",
            "range": "stddev: 0.000012021243086300042",
            "extra": "mean: 858.2484387228485 usec\nrounds: 971"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_20",
            "value": 196.95059395586534,
            "unit": "iter/sec",
            "range": "stddev: 0.00003465183892732921",
            "extra": "mean: 5.077415507688643 msec\nrounds: 195"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "105657697+milanofthe@users.noreply.github.com",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "committer": {
            "email": "105657697+milanofthe@users.noreply.github.com",
            "name": "Milan Rother",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "70a3ea5be24f77e7a1fd5ba22e7a3060a5e3e9ae",
          "message": "Use build[uv] frontend in cibuildwheel to avoid virtualenv 429s",
          "timestamp": "2026-03-09T10:13:19+01:00",
          "tree_id": "63d5570ddbe01d692819ce0733a83da779fb7621",
          "url": "https://github.com/milanofthe/fastdual/commit/70a3ea5be24f77e7a1fd5ba22e7a3060a5e3e9ae"
        },
        "date": 1773047660852,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 8248511.734827543,
            "unit": "iter/sec",
            "range": "stddev: 1.6269911374765324e-8",
            "extra": "mean: 121.23399131236219 nsec\nrounds: 197668"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8215181.785685771,
            "unit": "iter/sec",
            "range": "stddev: 1.0629249290285568e-8",
            "extra": "mean: 121.72585173250965 nsec\nrounds: 81880"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 6029909.546276544,
            "unit": "iter/sec",
            "range": "stddev: 2.2447655878340595e-8",
            "extra": "mean: 165.83996697222395 nsec\nrounds: 198453"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10275684.027024418,
            "unit": "iter/sec",
            "range": "stddev: 8.997529254823543e-9",
            "extra": "mean: 97.31712238037501 nsec\nrounds: 103853"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10249939.544029402,
            "unit": "iter/sec",
            "range": "stddev: 1.0403454410014963e-8",
            "extra": "mean: 97.56155104178158 nsec\nrounds: 103221"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8333337.732145741,
            "unit": "iter/sec",
            "range": "stddev: 1.0174714333249196e-8",
            "extra": "mean: 119.99993665713477 nsec\nrounds: 83669"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 7009990.796459565,
            "unit": "iter/sec",
            "range": "stddev: 1.8185111040395993e-8",
            "extra": "mean: 142.65353964588022 nsec\nrounds: 199243"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6713383.268678327,
            "unit": "iter/sec",
            "range": "stddev: 1.8689315793944873e-8",
            "extra": "mean: 148.9561909366261 nsec\nrounds: 196851"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7470453.504168394,
            "unit": "iter/sec",
            "range": "stddev: 1.84257347030139e-8",
            "extra": "mean: 133.8606818772135 nsec\nrounds: 188715"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8572244.666969525,
            "unit": "iter/sec",
            "range": "stddev: 7.085606749252688e-9",
            "extra": "mean: 116.65555975708307 nsec\nrounds: 42420"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8220793.923629356,
            "unit": "iter/sec",
            "range": "stddev: 1.726504190561445e-8",
            "extra": "mean: 121.64275242633929 nsec\nrounds: 196464"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8727033.736027077,
            "unit": "iter/sec",
            "range": "stddev: 7.965804394963326e-9",
            "extra": "mean: 114.58647121665 nsec\nrounds: 43797"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 232812.99812697317,
            "unit": "iter/sec",
            "range": "stddev: 7.58719426951155e-7",
            "extra": "mean: 4.295292823189421 usec\nrounds: 14449"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 47742.03838862142,
            "unit": "iter/sec",
            "range": "stddev: 0.00000193005089392317",
            "extra": "mean: 20.945900798369234 usec\nrounds: 19526"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 395055.1708632777,
            "unit": "iter/sec",
            "range": "stddev: 4.705183427700993e-7",
            "extra": "mean: 2.531292016289249 usec\nrounds: 53634"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 143565.98938854467,
            "unit": "iter/sec",
            "range": "stddev: 8.80790659648716e-7",
            "extra": "mean: 6.965438013968728 usec\nrounds: 43816"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 140181.85729624616,
            "unit": "iter/sec",
            "range": "stddev: 8.403810899146232e-7",
            "extra": "mean: 7.133590746245437 usec\nrounds: 36244"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_10",
            "value": 1166482.2827764207,
            "unit": "iter/sec",
            "range": "stddev: 2.5998622728841293e-7",
            "extra": "mean: 857.2783442709774 nsec\nrounds: 56042"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_100",
            "value": 548200.1453653644,
            "unit": "iter/sec",
            "range": "stddev: 3.852395761668112e-7",
            "extra": "mean: 1.8241512857197806 usec\nrounds: 161760"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 79571.84693424466,
            "unit": "iter/sec",
            "range": "stddev: 0.00013426881633346894",
            "extra": "mean: 12.567258880221347 usec\nrounds: 11909"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 41900.840349982354,
            "unit": "iter/sec",
            "range": "stddev: 0.0003018842063059088",
            "extra": "mean: 23.86586979276231 usec\nrounds: 18578"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19487.166634677393,
            "unit": "iter/sec",
            "range": "stddev: 0.00022563237687409565",
            "extra": "mean: 51.31582331833202 usec\nrounds: 12797"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 45819.70032052603,
            "unit": "iter/sec",
            "range": "stddev: 0.00010326550657097792",
            "extra": "mean: 21.824673513895203 usec\nrounds: 20739"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 12122.814165208114,
            "unit": "iter/sec",
            "range": "stddev: 0.000003869219290663252",
            "extra": "mean: 82.48909752901693 usec\nrounds: 6675"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 20116.06419868358,
            "unit": "iter/sec",
            "range": "stddev: 0.00013323154119252166",
            "extra": "mean: 49.711513650142415 usec\nrounds: 9156"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4125.522060812223,
            "unit": "iter/sec",
            "range": "stddev: 0.000013311441770016292",
            "extra": "mean: 242.39356504692222 usec\nrounds: 3582"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_add",
            "value": 10634563.967305828,
            "unit": "iter/sec",
            "range": "stddev: 1.0564382309734408e-8",
            "extra": "mean: 94.0330043689926 nsec\nrounds: 107447"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_mul",
            "value": 10515296.82172746,
            "unit": "iter/sec",
            "range": "stddev: 9.27992654042958e-9",
            "extra": "mean: 95.09955039345427 nsec\nrounds: 108027"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_sin",
            "value": 9436966.162720382,
            "unit": "iter/sec",
            "range": "stddev: 8.391492567263725e-9",
            "extra": "mean: 105.96625893927454 nsec\nrounds: 47667"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_exp",
            "value": 9751523.011040054,
            "unit": "iter/sec",
            "range": "stddev: 7.428137484052539e-9",
            "extra": "mean: 102.54808391139144 nsec\nrounds: 51005"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_5",
            "value": 75618.47343306745,
            "unit": "iter/sec",
            "range": "stddev: 0.00015845223897919896",
            "extra": "mean: 13.224281774018287 usec\nrounds: 14792"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_10",
            "value": 63780.18805275793,
            "unit": "iter/sec",
            "range": "stddev: 0.000005194165455877637",
            "extra": "mean: 15.678849977250247 usec\nrounds: 26316"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_20",
            "value": 32642.101982135373,
            "unit": "iter/sec",
            "range": "stddev: 0.0009754908909631204",
            "extra": "mean: 30.635282021583286 usec\nrounds: 19229"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_5",
            "value": 72887.01006902168,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012640147865838172",
            "extra": "mean: 13.719865845135255 usec\nrounds: 30979"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_10",
            "value": 14458.112098788846,
            "unit": "iter/sec",
            "range": "stddev: 0.0000030103203637319403",
            "extra": "mean: 69.16532346458773 usec\nrounds: 12261"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_20",
            "value": 2172.458110963831,
            "unit": "iter/sec",
            "range": "stddev: 0.000009448639820712235",
            "extra": "mean: 460.3080699016749 usec\nrounds: 2060"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5",
            "value": 5276.280597038743,
            "unit": "iter/sec",
            "range": "stddev: 0.000006492912947786085",
            "extra": "mean: 189.52744866549358 usec\nrounds: 4451"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_10",
            "value": 980.8240391943385,
            "unit": "iter/sec",
            "range": "stddev: 0.00007838417352500067",
            "extra": "mean: 1.0195508674740605 msec\nrounds: 664"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_20",
            "value": 157.85436005985358,
            "unit": "iter/sec",
            "range": "stddev: 0.00027288260597562206",
            "extra": "mean: 6.334953305191128 msec\nrounds: 154"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milanofthe@users.noreply.github.com",
            "name": "milanofthe",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milanofthe@users.noreply.github.com",
            "name": "milanofthe",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "dd3f6340ea64108b93718c443cdd8c83c1b98e91",
          "message": "Remove sparse jacobian and scipy minimize integration",
          "timestamp": "2026-03-11T15:13:10+01:00",
          "tree_id": "1337186aeaab4943a62157250b21be42ec800e02",
          "url": "https://github.com/milanofthe/fastdual/commit/dd3f6340ea64108b93718c443cdd8c83c1b98e91"
        },
        "date": 1773238462194,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 7965224.710467645,
            "unit": "iter/sec",
            "range": "stddev: 1.6654404410307168e-8",
            "extra": "mean: 125.54573616558888 nsec\nrounds: 197629"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8037514.659063725,
            "unit": "iter/sec",
            "range": "stddev: 1.0702952597220752e-8",
            "extra": "mean: 124.4165693523585 nsec\nrounds: 79536"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 5981307.61582676,
            "unit": "iter/sec",
            "range": "stddev: 4.606748429215294e-8",
            "extra": "mean: 167.18752223242342 nsec\nrounds: 198847"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10190112.050475407,
            "unit": "iter/sec",
            "range": "stddev: 1.0359650178978324e-8",
            "extra": "mean: 98.13434779192112 nsec\nrounds: 101647"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10117020.816348014,
            "unit": "iter/sec",
            "range": "stddev: 9.058322360596281e-9",
            "extra": "mean: 98.84332731470789 nsec\nrounds: 103008"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8354669.86321004,
            "unit": "iter/sec",
            "range": "stddev: 1.1977963959511807e-8",
            "extra": "mean: 119.69353862844066 nsec\nrounds: 82905"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 6787049.642244444,
            "unit": "iter/sec",
            "range": "stddev: 5.143306369379056e-8",
            "extra": "mean: 147.33942621779687 nsec\nrounds: 169492"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6639085.191270298,
            "unit": "iter/sec",
            "range": "stddev: 2.2716817037887988e-8",
            "extra": "mean: 150.62316135284652 nsec\nrounds: 192345"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7334579.617203405,
            "unit": "iter/sec",
            "range": "stddev: 2.494708235562371e-8",
            "extra": "mean: 136.3404656013931 nsec\nrounds: 192679"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8506841.959122997,
            "unit": "iter/sec",
            "range": "stddev: 1.4643363090769095e-8",
            "extra": "mean: 117.5524365922385 nsec\nrounds: 198808"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8100673.168808668,
            "unit": "iter/sec",
            "range": "stddev: 3.2881518190550446e-8",
            "extra": "mean: 123.44653082048315 nsec\nrounds: 198453"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8616451.394293012,
            "unit": "iter/sec",
            "range": "stddev: 1.4743104658285004e-8",
            "extra": "mean: 116.0570580903336 nsec\nrounds: 192308"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 234105.99043957423,
            "unit": "iter/sec",
            "range": "stddev: 6.84590897030549e-7",
            "extra": "mean: 4.271569463567883 usec\nrounds: 15922"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 47536.65608057328,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016648528700677816",
            "extra": "mean: 21.03639764448363 usec\nrounds: 20463"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_10",
            "value": 391206.8212637155,
            "unit": "iter/sec",
            "range": "stddev: 5.354580186254912e-7",
            "extra": "mean: 2.5561926470752727 usec\nrounds: 56549"
          },
          {
            "name": "tests/test_benchmark.py::test_np_sin_array_100",
            "value": 142860.00549317859,
            "unit": "iter/sec",
            "range": "stddev: 8.733313008945192e-7",
            "extra": "mean: 6.9998597336449695 usec\nrounds: 43396"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 140008.73432314137,
            "unit": "iter/sec",
            "range": "stddev: 8.31161458495885e-7",
            "extra": "mean: 7.142411541925601 usec\nrounds: 42783"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_10",
            "value": 1133872.2302640104,
            "unit": "iter/sec",
            "range": "stddev: 2.8946312300443734e-7",
            "extra": "mean: 881.9335841456849 nsec\nrounds: 51825"
          },
          {
            "name": "tests/test_benchmark.py::test_float_np_sin_array_100",
            "value": 544749.6513021309,
            "unit": "iter/sec",
            "range": "stddev: 3.9659441110613063e-7",
            "extra": "mean: 1.8357056266299043 usec\nrounds: 161499"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 78393.0521815111,
            "unit": "iter/sec",
            "range": "stddev: 0.00014075541647234557",
            "extra": "mean: 12.75623249984708 usec\nrounds: 10757"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 41650.03174458806,
            "unit": "iter/sec",
            "range": "stddev: 0.00028579092149146073",
            "extra": "mean: 24.009585542031157 usec\nrounds: 21732"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 19654.17109961533,
            "unit": "iter/sec",
            "range": "stddev: 0.00020178356925661537",
            "extra": "mean: 50.87978500500446 usec\nrounds: 13191"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 45674.203788958046,
            "unit": "iter/sec",
            "range": "stddev: 0.00011679204864144556",
            "extra": "mean: 21.894196659028673 usec\nrounds: 24245"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 12171.43039212491,
            "unit": "iter/sec",
            "range": "stddev: 0.000004935759433550731",
            "extra": "mean: 82.15961212307589 usec\nrounds: 6863"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 20000.395228258254,
            "unit": "iter/sec",
            "range": "stddev: 0.00014788398821324148",
            "extra": "mean: 49.99901194887965 usec\nrounds: 11884"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4132.309613341798,
            "unit": "iter/sec",
            "range": "stddev: 0.000007263223160374756",
            "extra": "mean: 241.99541989093606 usec\nrounds: 3670"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_add",
            "value": 10849930.693315927,
            "unit": "iter/sec",
            "range": "stddev: 8.684400478494279e-9",
            "extra": "mean: 92.16648735056414 nsec\nrounds: 107910"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_mul",
            "value": 10719336.929681206,
            "unit": "iter/sec",
            "range": "stddev: 8.448547555482908e-9",
            "extra": "mean: 93.28935236946043 nsec\nrounds: 106079"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_sin",
            "value": 9589373.50022567,
            "unit": "iter/sec",
            "range": "stddev: 9.645437653065005e-9",
            "extra": "mean: 104.28209934428634 nsec\nrounds: 48196"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_exp",
            "value": 9686714.61952132,
            "unit": "iter/sec",
            "range": "stddev: 9.444353135567367e-9",
            "extra": "mean: 103.23417580453257 nsec\nrounds: 50158"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_5",
            "value": 70947.81999654282,
            "unit": "iter/sec",
            "range": "stddev: 0.000165954008277356",
            "extra": "mean: 14.094865776689524 usec\nrounds: 14081"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_10",
            "value": 47940.614231984226,
            "unit": "iter/sec",
            "range": "stddev: 0.000877362975781583",
            "extra": "mean: 20.859140334769357 usec\nrounds: 26109"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_20",
            "value": 42808.85714945493,
            "unit": "iter/sec",
            "range": "stddev: 0.000007834400847110785",
            "extra": "mean: 23.359651870844974 usec\nrounds: 19510"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_5",
            "value": 73043.7022956603,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012298356822785734",
            "extra": "mean: 13.690434199957197 usec\nrounds: 26041"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_10",
            "value": 14349.355103999369,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028860527977616507",
            "extra": "mean: 69.6895430318876 usec\nrounds: 12421"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_20",
            "value": 2132.008416070343,
            "unit": "iter/sec",
            "range": "stddev: 0.00000776766683016233",
            "extra": "mean: 469.0413004293723 usec\nrounds: 2097"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5",
            "value": 5297.500460736011,
            "unit": "iter/sec",
            "range": "stddev: 0.000009848841620312522",
            "extra": "mean: 188.76827051017654 usec\nrounds: 4510"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_10",
            "value": 990.3523039893987,
            "unit": "iter/sec",
            "range": "stddev: 0.000054048154086170196",
            "extra": "mean: 1.0097416807854516 msec\nrounds: 968"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_20",
            "value": 158.54841081749768,
            "unit": "iter/sec",
            "range": "stddev: 0.00011293213019510448",
            "extra": "mean: 6.307221843750188 msec\nrounds: 160"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milanofthe@users.noreply.github.com",
            "name": "milanofthe",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milanofthe@users.noreply.github.com",
            "name": "milanofthe",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "9b49fe2877e493fc02c626a0437f81aebdc7bc21",
          "message": "Remove DualArray, seed parameter, and array dispatch; add Dual.from_array classmethod",
          "timestamp": "2026-03-11T15:36:29+01:00",
          "tree_id": "6badc46914764a0182eacaf9e2f8e0edd4bc9c1b",
          "url": "https://github.com/milanofthe/fastdual/commit/9b49fe2877e493fc02c626a0437f81aebdc7bc21"
        },
        "date": 1773239857474,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 7865025.665979963,
            "unit": "iter/sec",
            "range": "stddev: 2.2301003059614993e-8",
            "extra": "mean: 127.14516677618526 nsec\nrounds: 198060"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8011216.915019712,
            "unit": "iter/sec",
            "range": "stddev: 2.9304283001483525e-8",
            "extra": "mean: 124.82498109933393 nsec\nrounds: 80685"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 5778462.390785611,
            "unit": "iter/sec",
            "range": "stddev: 2.5181010478285027e-8",
            "extra": "mean: 173.05641749864273 nsec\nrounds: 198020"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10472230.083292607,
            "unit": "iter/sec",
            "range": "stddev: 9.995883063803235e-9",
            "extra": "mean: 95.49064449943664 nsec\nrounds: 104298"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10330771.297646586,
            "unit": "iter/sec",
            "range": "stddev: 9.733306409977014e-9",
            "extra": "mean: 96.79819358965058 nsec\nrounds: 104954"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8217743.621094511,
            "unit": "iter/sec",
            "range": "stddev: 1.6012781074601714e-8",
            "extra": "mean: 121.68790438205606 nsec\nrounds: 194175"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 3964235.6496378146,
            "unit": "iter/sec",
            "range": "stddev: 1.3768508450774164e-7",
            "extra": "mean: 252.25543796604603 nsec\nrounds: 111025"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6768839.585776898,
            "unit": "iter/sec",
            "range": "stddev: 1.967611360911782e-8",
            "extra": "mean: 147.73581015293396 nsec\nrounds: 198060"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 4149784.795540376,
            "unit": "iter/sec",
            "range": "stddev: 1.6644998495253572e-7",
            "extra": "mean: 240.97635161097125 nsec\nrounds: 168891"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8401430.935772192,
            "unit": "iter/sec",
            "range": "stddev: 1.7143143472591782e-8",
            "extra": "mean: 119.02734279968084 nsec\nrounds: 196079"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8322070.73564168,
            "unit": "iter/sec",
            "range": "stddev: 1.6397486063636454e-8",
            "extra": "mean: 120.16240089347117 nsec\nrounds: 196079"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8804765.023554139,
            "unit": "iter/sec",
            "range": "stddev: 1.0078059712718187e-8",
            "extra": "mean: 113.57486512415058 nsec\nrounds: 44819"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 1531252.5337766944,
            "unit": "iter/sec",
            "range": "stddev: 5.099311339120164e-7",
            "extra": "mean: 653.0601438637893 nsec\nrounds: 79033"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 226413.10684989332,
            "unit": "iter/sec",
            "range": "stddev: 6.506680494852449e-7",
            "extra": "mean: 4.416705436858728 usec\nrounds: 67079"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 53332.62572798691,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018778649263670432",
            "extra": "mean: 18.750248770805197 usec\nrounds: 14644"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 154981.4992321162,
            "unit": "iter/sec",
            "range": "stddev: 0.00007311698683888742",
            "extra": "mean: 6.452383058330707 usec\nrounds: 22973"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 61289.82510552864,
            "unit": "iter/sec",
            "range": "stddev: 0.00024705353852567556",
            "extra": "mean: 16.31592190511562 usec\nrounds: 21269"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 24757.454862177256,
            "unit": "iter/sec",
            "range": "stddev: 0.0002138632977599204",
            "extra": "mean: 40.39187410688696 usec\nrounds: 16935"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 67195.43157318572,
            "unit": "iter/sec",
            "range": "stddev: 0.00010115416516369349",
            "extra": "mean: 14.881964094699693 usec\nrounds: 31221"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 11766.690940105334,
            "unit": "iter/sec",
            "range": "stddev: 0.000004043797530973949",
            "extra": "mean: 84.98566037726219 usec\nrounds: 6413"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 25658.782829911655,
            "unit": "iter/sec",
            "range": "stddev: 0.00017764712412934769",
            "extra": "mean: 38.973010007094054 usec\nrounds: 15589"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4100.406177620986,
            "unit": "iter/sec",
            "range": "stddev: 0.000012541143166021153",
            "extra": "mean: 243.87827856122038 usec\nrounds: 3475"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_add",
            "value": 10587545.648150505,
            "unit": "iter/sec",
            "range": "stddev: 1.1761458978836373e-8",
            "extra": "mean: 94.45059631687971 nsec\nrounds: 105397"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_mul",
            "value": 10183841.433364479,
            "unit": "iter/sec",
            "range": "stddev: 2.7019114926733085e-8",
            "extra": "mean: 98.19477321433762 nsec\nrounds: 103115"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_sin",
            "value": 9674291.552556306,
            "unit": "iter/sec",
            "range": "stddev: 9.382070920292355e-9",
            "extra": "mean: 103.36674210896228 nsec\nrounds: 49486"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_exp",
            "value": 9718913.886186006,
            "unit": "iter/sec",
            "range": "stddev: 7.455983473717136e-9",
            "extra": "mean: 102.89215561641632 nsec\nrounds: 51055"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_5",
            "value": 67730.95844435428,
            "unit": "iter/sec",
            "range": "stddev: 0.0011534823560702403",
            "extra": "mean: 14.764297198327261 usec\nrounds: 23486"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_10",
            "value": 121285.1091664865,
            "unit": "iter/sec",
            "range": "stddev: 0.000004743181779843877",
            "extra": "mean: 8.245035246885196 usec\nrounds: 41110"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_20",
            "value": 75990.26424214417,
            "unit": "iter/sec",
            "range": "stddev: 0.000010156306675604163",
            "extra": "mean: 13.159580506438092 usec\nrounds: 29066"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_5",
            "value": 71559.9711846484,
            "unit": "iter/sec",
            "range": "stddev: 0.000001590103891714292",
            "extra": "mean: 13.974292938431587 usec\nrounds: 31027"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_10",
            "value": 14270.852110630309,
            "unit": "iter/sec",
            "range": "stddev: 0.0000030784427084227757",
            "extra": "mean: 70.07290050011123 usec\nrounds: 11397"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_20",
            "value": 2141.602196246551,
            "unit": "iter/sec",
            "range": "stddev: 0.000023410725205773994",
            "extra": "mean: 466.9401263001298 usec\nrounds: 2019"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5",
            "value": 5209.264509464873,
            "unit": "iter/sec",
            "range": "stddev: 0.00000589396920963505",
            "extra": "mean: 191.9656792591486 usec\nrounds: 4103"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_10",
            "value": 961.3302961632338,
            "unit": "iter/sec",
            "range": "stddev: 0.00002033123525432191",
            "extra": "mean: 1.0402252004239343 msec\nrounds: 943"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_20",
            "value": 154.18060148873593,
            "unit": "iter/sec",
            "range": "stddev: 0.00007248486182985876",
            "extra": "mean: 6.485900238708418 msec\nrounds: 155"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milanofthe@users.noreply.github.com",
            "name": "milanofthe",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milanofthe@users.noreply.github.com",
            "name": "milanofthe",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "e5e686aa13be65139cded2d47e34e79d3415a483",
          "message": "Remove reset() from public API",
          "timestamp": "2026-03-11T15:38:24+01:00",
          "tree_id": "b98f3a80fcb2f936cc65b6a76f8b1debf28ec38f",
          "url": "https://github.com/milanofthe/fastdual/commit/e5e686aa13be65139cded2d47e34e79d3415a483"
        },
        "date": 1773239965558,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 7733235.489762255,
            "unit": "iter/sec",
            "range": "stddev: 1.93953466906707e-8",
            "extra": "mean: 129.31198090680974 nsec\nrounds: 189754"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 7883753.692237313,
            "unit": "iter/sec",
            "range": "stddev: 1.1227323236747306e-8",
            "extra": "mean: 126.84313070113333 nsec\nrounds: 78040"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 5787114.28855534,
            "unit": "iter/sec",
            "range": "stddev: 2.2541999890338566e-8",
            "extra": "mean: 172.79769331281585 nsec\nrounds: 198060"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10428002.593087675,
            "unit": "iter/sec",
            "range": "stddev: 8.916582482746255e-9",
            "extra": "mean: 95.89564166994568 nsec\nrounds: 104189"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10491781.703160925,
            "unit": "iter/sec",
            "range": "stddev: 9.28474561830512e-9",
            "extra": "mean: 95.31269600269357 nsec\nrounds: 104080"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8351847.982974046,
            "unit": "iter/sec",
            "range": "stddev: 1.0708168502924636e-8",
            "extra": "mean: 119.73398007705423 nsec\nrounds: 83320"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 7366840.085306378,
            "unit": "iter/sec",
            "range": "stddev: 1.985272610473991e-8",
            "extra": "mean: 135.7434108003189 nsec\nrounds: 195313"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6712944.197825133,
            "unit": "iter/sec",
            "range": "stddev: 1.977362856642013e-8",
            "extra": "mean: 148.96593365456263 nsec\nrounds: 195313"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 4127034.7075711703,
            "unit": "iter/sec",
            "range": "stddev: 1.89917994887709e-7",
            "extra": "mean: 242.3047226051842 nsec\nrounds: 162049"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8731666.315446742,
            "unit": "iter/sec",
            "range": "stddev: 8.012794442679286e-9",
            "extra": "mean: 114.52567744497419 nsec\nrounds: 44380"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8355477.581727696,
            "unit": "iter/sec",
            "range": "stddev: 1.521757015806881e-8",
            "extra": "mean: 119.68196793285225 nsec\nrounds: 196851"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 9055660.007357407,
            "unit": "iter/sec",
            "range": "stddev: 7.1096924665217085e-9",
            "extra": "mean: 110.42817411293431 nsec\nrounds: 45723"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 1578290.8760716366,
            "unit": "iter/sec",
            "range": "stddev: 5.958266983110413e-8",
            "extra": "mean: 633.5967692400264 nsec\nrounds: 77737"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 225839.7526513555,
            "unit": "iter/sec",
            "range": "stddev: 7.651016673981079e-7",
            "extra": "mean: 4.427918416753535 usec\nrounds: 58235"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 53220.99784537929,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015278758336945358",
            "extra": "mean: 18.78957630417336 usec\nrounds: 13800"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 152379.98390423376,
            "unit": "iter/sec",
            "range": "stddev: 0.00007635964182355434",
            "extra": "mean: 6.562541709076895 usec\nrounds: 21530"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 60747.30034115969,
            "unit": "iter/sec",
            "range": "stddev: 0.0002263305459950319",
            "extra": "mean: 16.46163688565505 usec\nrounds: 21591"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 24286.528914381306,
            "unit": "iter/sec",
            "range": "stddev: 0.000226029720190515",
            "extra": "mean: 41.17508943024988 usec\nrounds: 17645"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 67513.90562222575,
            "unit": "iter/sec",
            "range": "stddev: 0.00010042717544120508",
            "extra": "mean: 14.811763455005888 usec\nrounds: 30100"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 12163.722996002132,
            "unit": "iter/sec",
            "range": "stddev: 0.0000036981820731336115",
            "extra": "mean: 82.2116715687024 usec\nrounds: 6528"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 25007.094881958663,
            "unit": "iter/sec",
            "range": "stddev: 0.00019205265232593612",
            "extra": "mean: 39.98865140954252 usec\nrounds: 15643"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4160.017967098119,
            "unit": "iter/sec",
            "range": "stddev: 0.000008553859654847244",
            "extra": "mean: 240.38357716458722 usec\nrounds: 3337"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_add",
            "value": 10577402.700781314,
            "unit": "iter/sec",
            "range": "stddev: 9.206410460049569e-9",
            "extra": "mean: 94.54116745750198 nsec\nrounds: 105854"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_mul",
            "value": 10535945.444306653,
            "unit": "iter/sec",
            "range": "stddev: 1.0385708255164282e-8",
            "extra": "mean: 94.91317179706674 nsec\nrounds: 105508"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_sin",
            "value": 9652070.099902827,
            "unit": "iter/sec",
            "range": "stddev: 7.374823272592687e-9",
            "extra": "mean: 103.60471791538974 nsec\nrounds: 48833"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_exp",
            "value": 9980350.322895907,
            "unit": "iter/sec",
            "range": "stddev: 7.349171399892733e-9",
            "extra": "mean: 100.19688364103828 nsec\nrounds: 51212"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_5",
            "value": 69198.61977187869,
            "unit": "iter/sec",
            "range": "stddev: 0.0011290287681735619",
            "extra": "mean: 14.451155287440942 usec\nrounds: 23698"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_10",
            "value": 119290.37616239395,
            "unit": "iter/sec",
            "range": "stddev: 0.000006684803191161826",
            "extra": "mean: 8.382905915550696 usec\nrounds: 38508"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_20",
            "value": 75057.53421335964,
            "unit": "iter/sec",
            "range": "stddev: 0.00001601376697735648",
            "extra": "mean: 13.32311286908767 usec\nrounds: 34066"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_5",
            "value": 70446.05405256979,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013070783806031576",
            "extra": "mean: 14.195259244098446 usec\nrounds: 28965"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_10",
            "value": 13962.452645219653,
            "unit": "iter/sec",
            "range": "stddev: 0.000003539699415008161",
            "extra": "mean: 71.62065472375096 usec\nrounds: 12225"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_20",
            "value": 2097.0197160898088,
            "unit": "iter/sec",
            "range": "stddev: 0.000011519344936086148",
            "extra": "mean: 476.8672379793558 usec\nrounds: 2038"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5",
            "value": 5297.146849697464,
            "unit": "iter/sec",
            "range": "stddev: 0.000006609641072981858",
            "extra": "mean: 188.78087173609566 usec\nrounds: 4366"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_10",
            "value": 982.7321757291135,
            "unit": "iter/sec",
            "range": "stddev: 0.000015681434261984832",
            "extra": "mean: 1.0175712413792446 msec\nrounds: 957"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_20",
            "value": 157.07553762617158,
            "unit": "iter/sec",
            "range": "stddev: 0.00004457181938613491",
            "extra": "mean: 6.36636369426236 msec\nrounds: 157"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "milanofthe@users.noreply.github.com",
            "name": "milanofthe",
            "username": "milanofthe"
          },
          "committer": {
            "email": "milanofthe@users.noreply.github.com",
            "name": "milanofthe",
            "username": "milanofthe"
          },
          "distinct": true,
          "id": "1e78891e51f21afa2f1959631f67b84671449725",
          "message": "Add benchmark bar charts to README",
          "timestamp": "2026-03-11T15:41:29+01:00",
          "tree_id": "db27ea706bc058dd8231d7fc4007e6b45a5631e4",
          "url": "https://github.com/milanofthe/fastdual/commit/1e78891e51f21afa2f1959631f67b84671449725"
        },
        "date": 1773240154851,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmark.py::test_scalar_add",
            "value": 7734771.574177628,
            "unit": "iter/sec",
            "range": "stddev: 5.334233986090014e-8",
            "extra": "mean: 129.2863002365162 nsec\nrounds: 196851"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_mul",
            "value": 8073111.502173883,
            "unit": "iter/sec",
            "range": "stddev: 1.0217002943641451e-8",
            "extra": "mean: 123.86797825481854 nsec\nrounds: 79466"
          },
          {
            "name": "tests/test_benchmark.py::test_scalar_pow",
            "value": 5736402.043962438,
            "unit": "iter/sec",
            "range": "stddev: 2.4162940162309463e-8",
            "extra": "mean: 174.32529873886713 nsec\nrounds: 199641"
          },
          {
            "name": "tests/test_benchmark.py::test_float_add",
            "value": 10162137.734686732,
            "unit": "iter/sec",
            "range": "stddev: 9.174724615654695e-9",
            "extra": "mean: 98.40449186067117 nsec\nrounds: 97857"
          },
          {
            "name": "tests/test_benchmark.py::test_float_mul",
            "value": 10140568.372148814,
            "unit": "iter/sec",
            "range": "stddev: 1.2600757984680053e-8",
            "extra": "mean: 98.61380184038907 nsec\nrounds: 96619"
          },
          {
            "name": "tests/test_benchmark.py::test_float_pow",
            "value": 8321561.714144163,
            "unit": "iter/sec",
            "range": "stddev: 1.0210965171066164e-8",
            "extra": "mean: 120.16975110576894 nsec\nrounds: 82967"
          },
          {
            "name": "tests/test_benchmark.py::test_sin",
            "value": 7247602.404495274,
            "unit": "iter/sec",
            "range": "stddev: 1.8192256049075412e-8",
            "extra": "mean: 137.9766637556935 nsec\nrounds: 199243"
          },
          {
            "name": "tests/test_benchmark.py::test_exp",
            "value": 6894442.86498645,
            "unit": "iter/sec",
            "range": "stddev: 1.1399219007325677e-8",
            "extra": "mean: 145.0443523259171 nsec\nrounds: 68885"
          },
          {
            "name": "tests/test_benchmark.py::test_log",
            "value": 7562877.266999503,
            "unit": "iter/sec",
            "range": "stddev: 2.6483407732500504e-8",
            "extra": "mean: 132.22480871975594 nsec\nrounds: 79726"
          },
          {
            "name": "tests/test_benchmark.py::test_float_sin",
            "value": 8275622.980145364,
            "unit": "iter/sec",
            "range": "stddev: 4.010965022140137e-8",
            "extra": "mean: 120.83682429699503 nsec\nrounds: 193051"
          },
          {
            "name": "tests/test_benchmark.py::test_float_exp",
            "value": 8127811.7337734075,
            "unit": "iter/sec",
            "range": "stddev: 1.6014947509289245e-8",
            "extra": "mean: 123.03434586762275 nsec\nrounds: 198413"
          },
          {
            "name": "tests/test_benchmark.py::test_float_log",
            "value": 8378592.9684476,
            "unit": "iter/sec",
            "range": "stddev: 1.51649992339436e-8",
            "extra": "mean: 119.35178182850451 nsec\nrounds: 196851"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_10",
            "value": 1603647.8358772295,
            "unit": "iter/sec",
            "range": "stddev: 8.83328622662603e-8",
            "extra": "mean: 623.578305428248 nsec\nrounds: 78840"
          },
          {
            "name": "tests/test_benchmark.py::test_seed_array_100",
            "value": 225481.8098542479,
            "unit": "iter/sec",
            "range": "stddev: 6.510170559516715e-7",
            "extra": "mean: 4.434947549189901 usec\nrounds: 62306"
          },
          {
            "name": "tests/test_benchmark.py::test_val_extraction_100",
            "value": 53177.503254524505,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016217800029740832",
            "extra": "mean: 18.804944549834936 usec\nrounds: 15293"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_5x5",
            "value": 150908.3881839448,
            "unit": "iter/sec",
            "range": "stddev: 0.00008424528116774828",
            "extra": "mean: 6.6265368813102885 usec\nrounds: 18790"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_10x10",
            "value": 62469.14573819112,
            "unit": "iter/sec",
            "range": "stddev: 0.00022594783038972757",
            "extra": "mean: 16.007902592281496 usec\nrounds: 21179"
          },
          {
            "name": "tests/test_benchmark.py::test_jacobian_20x20",
            "value": 24888.496630704656,
            "unit": "iter/sec",
            "range": "stddev: 0.00018306545853315185",
            "extra": "mean: 40.17920466784287 usec\nrounds: 17824"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_10",
            "value": 66012.43316187977,
            "unit": "iter/sec",
            "range": "stddev: 0.0001364785042888658",
            "extra": "mean: 15.148661427881898 usec\nrounds: 30478"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_10",
            "value": 11707.610687500486,
            "unit": "iter/sec",
            "range": "stddev: 0.00001429335528544542",
            "extra": "mean: 85.41452450820218 usec\nrounds: 5794"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_fastdual_20",
            "value": 24966.713083146067,
            "unit": "iter/sec",
            "range": "stddev: 0.0002048629314264892",
            "extra": "mean: 40.053330074716804 usec\nrounds: 16060"
          },
          {
            "name": "tests/test_benchmark.py::test_jac_findiff_20",
            "value": 4118.530171424192,
            "unit": "iter/sec",
            "range": "stddev: 0.000007849272474077173",
            "extra": "mean: 242.80506840482826 usec\nrounds: 3567"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_add",
            "value": 10639207.116743086,
            "unit": "iter/sec",
            "range": "stddev: 1.0684754560932962e-8",
            "extra": "mean: 93.9919666030643 nsec\nrounds: 106417"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_scalar_mul",
            "value": 10587759.734739378,
            "unit": "iter/sec",
            "range": "stddev: 8.855142832376042e-9",
            "extra": "mean: 94.44868650720429 nsec\nrounds: 108969"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_sin",
            "value": 9741351.261522373,
            "unit": "iter/sec",
            "range": "stddev: 9.20677270563194e-9",
            "extra": "mean: 102.65516283658992 nsec\nrounds: 96815"
          },
          {
            "name": "tests/test_benchmark.py::test_hd_exp",
            "value": 9857862.64582793,
            "unit": "iter/sec",
            "range": "stddev: 9.729725461273591e-9",
            "extra": "mean: 101.44186787013335 nsec\nrounds: 52070"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_5",
            "value": 69868.6581577167,
            "unit": "iter/sec",
            "range": "stddev: 0.0011516618962517378",
            "extra": "mean: 14.312569131393206 usec\nrounds: 24005"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_10",
            "value": 122164.32062758373,
            "unit": "iter/sec",
            "range": "stddev: 0.000005050250183726491",
            "extra": "mean: 8.185696076094807 usec\nrounds: 42152"
          },
          {
            "name": "tests/test_benchmark.py::test_gradient_20",
            "value": 75669.89528259759,
            "unit": "iter/sec",
            "range": "stddev: 0.000010316309767001913",
            "extra": "mean: 13.215295148293643 usec\nrounds: 34359"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_5",
            "value": 67902.18121574607,
            "unit": "iter/sec",
            "range": "stddev: 0.000001334575231783181",
            "extra": "mean: 14.727067409258813 usec\nrounds: 31242"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_10",
            "value": 13563.474871337028,
            "unit": "iter/sec",
            "range": "stddev: 0.00000370731928696309",
            "extra": "mean: 73.72741937342671 usec\nrounds: 12130"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_20",
            "value": 2055.2495034978497,
            "unit": "iter/sec",
            "range": "stddev: 0.00001095722685516526",
            "extra": "mean: 486.5589303381852 usec\nrounds: 1981"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_5",
            "value": 5310.152758987973,
            "unit": "iter/sec",
            "range": "stddev: 0.0000070123996226021",
            "extra": "mean: 188.31849955868 usec\nrounds: 4532"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_10",
            "value": 983.2524135498312,
            "unit": "iter/sec",
            "range": "stddev: 0.000014713168416550121",
            "extra": "mean: 1.017032845502718 msec\nrounds: 945"
          },
          {
            "name": "tests/test_benchmark.py::test_hessian_findiff_20",
            "value": 159.0496572115995,
            "unit": "iter/sec",
            "range": "stddev: 0.0000479677604008973",
            "extra": "mean: 6.2873445786154765 msec\nrounds: 159"
          }
        ]
      }
    ]
  }
}