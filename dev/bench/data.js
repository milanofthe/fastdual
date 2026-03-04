window.BENCHMARK_DATA = {
  "lastUpdate": 1772630049534,
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
      }
    ]
  }
}