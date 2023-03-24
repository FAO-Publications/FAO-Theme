"use strict";const path=require("node:path"),ip=require("ip"),{babel}=require("@rollup/plugin-babel"),istanbul=require("rollup-plugin-istanbul"),{nodeResolve}=require("@rollup/plugin-node-resolve"),replace=require("@rollup/plugin-replace"),{browsers}=require("./browsers"),ENV=process.env,BROWSERSTACK=Boolean(ENV.BROWSERSTACK),DEBUG=Boolean(ENV.DEBUG),JQUERY_TEST=Boolean(ENV.JQUERY),frameworks=["jasmine"],plugins=["karma-jasmine","karma-rollup-preprocessor"],reporters=["dots"],detectBrowsers={usePhantomJS:!1,postDetection(e){if(!0===ENV.CI)return["ChromeHeadless"];if(e.includes("Chrome"))return DEBUG?["Chrome"]:["ChromeHeadless"];if(e.includes("Chromium"))return DEBUG?["Chromium"]:["ChromiumHeadless"];if(e.includes("Firefox"))return DEBUG?["Firefox"]:["FirefoxHeadless"];throw new Error("Please install Chrome, Chromium or Firefox")}},config={basePath:"../..",port:9876,colors:!0,autoWatch:!1,singleRun:!0,concurrency:Number.POSITIVE_INFINITY,client:{clearContext:!1},files:["node_modules/hammer-simulator/index.js",{pattern:"js/tests/unit/**/!(jquery).spec.js",watched:!BROWSERSTACK}],preprocessors:{"js/tests/unit/**/*.spec.js":["rollup"]},rollupPreprocessor:{plugins:[replace({"process.env.NODE_ENV":'"dev"',preventAssignment:!0}),istanbul({exclude:["node_modules/**","js/tests/unit/**/*.spec.js","js/tests/helpers/**/*.js"]}),babel({exclude:"node_modules/**",babelHelpers:"inline"}),nodeResolve()],output:{format:"iife",name:"bootstrapTest",sourcemap:"inline",generatedCode:"es2015"}}};BROWSERSTACK?(config.hostname=ip.address(),config.browserStack={username:ENV.BROWSER_STACK_USERNAME,accessKey:ENV.BROWSER_STACK_ACCESS_KEY,build:`bootstrap-${ENV.GITHUB_SHA?ENV.GITHUB_SHA.slice(0,7)+"-":""}${(new Date).toISOString()}`,project:"Bootstrap",retryLimit:2},plugins.push("karma-browserstack-launcher","karma-jasmine-html-reporter"),config.customLaunchers=browsers,config.browsers=Object.keys(browsers),reporters.push("BrowserStack","kjhtml")):JQUERY_TEST?(frameworks.push("detectBrowsers"),plugins.push("karma-chrome-launcher","karma-firefox-launcher","karma-detect-browsers"),config.detectBrowsers=detectBrowsers,config.files=["node_modules/jquery/dist/jquery.slim.min.js",{pattern:"js/tests/unit/jquery.spec.js",watched:!1}]):(frameworks.push("detectBrowsers"),plugins.push("karma-chrome-launcher","karma-firefox-launcher","karma-detect-browsers","karma-coverage-istanbul-reporter"),reporters.push("coverage-istanbul"),config.detectBrowsers=detectBrowsers,config.coverageIstanbulReporter={dir:path.resolve(__dirname,"../coverage/"),reports:["lcov","text-summary"],thresholds:{emitWarning:!1,global:{statements:90,branches:89,functions:90,lines:90}}},DEBUG&&(config.hostname=ip.address(),plugins.push("karma-jasmine-html-reporter"),reporters.push("kjhtml"),config.singleRun=!1,config.autoWatch=!0)),config.frameworks=frameworks,config.plugins=plugins,config.reporters=reporters,module.exports=e=>{config.logLevel=e.LOG_ERROR,e.set(config)};