npm init
npm install --save @cucumber/cucumber chai nyc
 "scripts": {
    "test": "cucumber-js --publish-quiet",
    "coverage": "nyc --reporter=html cucumber-js --publish-quiet"
  },
  "nyc":{
    "exclude":"features/**"
  },