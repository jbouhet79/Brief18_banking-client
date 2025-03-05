## Rapport LighthouseCI

5 result(s) for http://localhost:36871/index.html :

  ✘  color-contrast failure for minScore assertion
       Background and foreground colors do not have a sufficient contrast ratio.
       https://dequeuniversity.com/rules/axe/4.9/color-contrast
        expected: >=0.9
           found: 0
      all values: 0, 0, 0

![alt rapport-color-contrast-analyser](image-7.png)

  ✘  unused-javascript failure for maxLength assertion
       Reduce unused JavaScript
       https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/
        expected: <=0
           found: 1
      all values: 1, 1, 1

  ⚠️  legacy-javascript warning for maxLength assertion
       Avoid serving legacy JavaScript to modern browsers
       https://web.dev/articles/publish-modern-javascript
        expected: <=0
           found: 1
      all values: 1, 1, 1

  ⚠️  render-blocking-resources warning for maxLength assertion
       Eliminate render-blocking resources
       https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/
        expected: <=0
           found: 1
      all values: 1, 1, 1

  ⚠️  uses-long-cache-ttl warning for maxLength assertion
       Serve static assets with an efficient cache policy
       https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/
        expected: <=0
           found: 1
      all values: 1, 1, 1

Assertion failed. Exiting with status code 1.
assert command failed. Exiting with status code 1.
Error: Process completed with exit code 1.

## Corrections

1. Problème de contraste
avant correction :
![alt rapport-color-contrast-analyser](image-16.png)
![alt result-rapport-contrast](image-17.png)

Solution :
Changer la couleur du background:

avant:
```
.login-container button {
  padding: 10px;
  background: #007bff;
}
```
après:
```
.login-container button {
  padding: 10px;
  background: #00438F;
}
```

après correction :
![alt rapport-color-contrast-analyser](image-18.png)
![alt result-rapport-contrast](image-19.png)



