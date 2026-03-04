window.BENCHMARK_DATA = {
  "lastUpdate": 1772642220717,
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
      }
    ]
  }
}