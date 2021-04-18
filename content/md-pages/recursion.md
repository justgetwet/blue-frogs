---
title: 再帰関数
date: 2021-01-30
tags: ["Python"]
---


$$
\binom{n}{r} = _n C _r = \frac{n!}{r!(n-r)!}
$$


再帰による二項係数計算

```python
def comb(n, r):
    if n == 0 or r == 0:
        return 1
    return comb(n, r - 1) * (n - r + 1) / r
```

lambda

```python
comb = lambda n, r: comb(n, r - 1) * (n - r + 1) / r if not (n == 0 or r == 0) else 1
```

