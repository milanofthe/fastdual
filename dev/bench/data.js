window.BENCHMARK_DATA = {
  "lastUpdate": 1772630162237,
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
      }
    ]
  }
}