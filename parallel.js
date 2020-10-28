/*
    LambdaTest selenium automation sample example
    Configuration
    ----------
    username: Username can be found at automation dashboard
    accessToken:  AccessToken can be generated from automation dashboard or profile section

    Result
    -------
    Execute NodeJS Automation Tests on LambdaTest Distributed Selenium Grid 
*/
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var moment = require("moment");

/*
    Setup remote driver
    Params
    ----------
    platform : Supported platform - (Windows 10, Windows 8.1, Windows 8, Windows 7,  macOS High Sierra, macOS Sierra, OS X El Capitan, OS X Yosemite, OS X Mavericks)
    browserName : Supported platform - (chrome, firefox, Internet Explorer, MicrosoftEdge, Safari)
    version :  Supported list of version can be found at https://www.lambdatest.com/capabilities-generator/
*/

// username: Username can be found at automation dashboard
const USERNAME = '{username}';

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = '{accessKey}';

// gridUrl: gridUrl can be found at automation dashboard
const GRID_HOST = 'hub.lambdatest.com/wd/hub';

console.log('node parallel.js 1 stage false "10.5.0.53" "win10" firefox 75')
console.log('node parallel.js 1 stage false false "Windows 7" "Internet Explorer" 8 "Galaxy S10" 1.17.0')
console.log('node parallel.js 1 stage false false "macOS Mojave" safari 12 "iPhone X"')
console.log('node parallel.js 1 dev false "10.92.181.33" "macOS Mojave" safari 12 "iPhone X"')

// require('dns').lookup('hub.lambdatest.com', (e, addr) => { console.log(addr) });

async function searchTextOnGoogle() {

    var keys = process.argv;
    console.log(keys);
    let parallelCount = keys[2] || 1;
    let env = keys[3];
    let tunnel = keys[4] || false;
    let fixedIP = keys[5];
    let platform = keys[6] || "Windows 10";
    let browserName = keys[7] || "chrome";
    let version = keys[8] || "78.0";

    // Setup Input capabilities
    let capabilities = {
        "platform": platform,
        "browserName": browserName,
        "version": version,

        // "resolution" : "1024x768",
        // "resolution" : "1280x800",
        // "resolution" : "2048x1536",
        // "resolution" : "1440x900",
        

        // "proxy" : {
        //     "proxyType":"direct"
        // },
        // "infraProvider":["AZ"],
        // "fixedIP":"10.92.181.33",
        // "fixedIP":"10.92.181.153",
        "geoLocation":"IN",
        // "geoLocation":"RO",
        // "geoLocation": "DE",
        // "performance":true,
        // "goog:chromeOptions": {
        //     "args":[
        //         "user-agent=lambdatest_prod_tests_user_agent"
        //     ]
        // },
        
        // "unboundRegion": "PCC-US3",
        // "tunnelIdentifier":"xyz",
        //"safari.cookies" : true,
        // idleTimeout: 300,
        network: false,
        visual: true,
        console: true,
        video: true,
        name: "test session", // name of the test
        build: platform + browserName + version, // name of the build
        // build: "paul-build"
    }

    if (keys[9]) {
        capabilities = {}
        capabilities.deviceName = keys[9]

        if (capabilities.deviceName.startsWith("i")) {
            capabilities.browserName = "safari";
            capabilities.platform = "iOS";
            capabilities.platformName = "iOS";
            //capabilities.appiumVersion = keys[10];
            capabilities.nativeWebTap = true;
            if(keys[10]){
                capabilities.platformVersion = keys[10] || "13.4";
            }
        } else {
            capabilities.browserName = "chrome";
            // capabilities.autoAcceptAlerts= true;
            // capabilities.autoDismissAlerts= true;
            // capabilities["userAgent"] = "S=005"
            capabilities["appiumVersion"] = keys[10];
            capabilities.fixedPort = "8000";

        }
        capabilities.network = false;
        capabilities.visual = true;
        capabilities.console = true;
        capabilities.video = true;
        capabilities.performance = true;
        capabilities.build = keys[6] +" - "+ keys[9] +" - "+ keys[10] +" - "+ capabilities["appiumVersion"];
        // capabilities.geoLocation="IT";
    }
    if (tunnel === "true") {
        capabilities.tunnel = true
    }
    if (fixedIP && fixedIP != "false") {
        capabilities.fixedIP = fixedIP
    }


    // gridUrl ="https://webhook.site/8e2e6fad-98f9-4ca5-a592-2aac0cc0533d"
    var gridUrl = "https://sushobhitd:glcUH6FSqT4uawyIL1RbXJr4ePasM1NuTZTkvxlQEz2IkSHLQt@stage-hub.lambdatest.com/wd/hub";

    if (env === "prod") {
        gridUrl = "https://sushobhitd:8NFTCyOh68MjrGVTlCT9RAau9B1jIaIJQhESCXFJzvUqx057Yu@hub.lambdatest.com/wd/hub";
        // if(euGrid === "true"){ 
        //     gridUrl = "https://sushobhitd:8NFTCyOh68MjrGVTlCT9RAau9B1jIaIJQhESCXFJzvUqx057Yu@eu-central-1-hub.lambdatest.com/wd/hub";
        // }
        // gridUrl = "https://supportinfpro:M26gzgDzEPG07MGO4ypfjpSFqZNpZGGvMQon924rVc6pFkbQ8g@hub.lambdatest.com/wd/hub";

    }
    if (env === "direct") {
        gridUrl = "http://sushobhitd:8NFTCyOh68MjrGVTlCT9RAau9B1jIaIJQhESCXFJzvUqx057Yu@ab5cc5d63a71e11e9acea0e0d764409c-1221821132.us-east-1.elb.amazonaws.com:80/wd/hub"
    }
    if (env === "beta") {
        gridUrl = "https://sushobhitd:8NFTCyOh68MjrGVTlCT9RAau9B1jIaIJQhESCXFJzvUqx057Yu@beta-hub.lambdatest.com/wd/hub";
    }
    if (env === "dev") {
        gridUrl = "http://sushobhitd:glcUH6FSqT4uawyIL1RbXJr4ePasM1NuTZTkvxlQEz2IkSHLQt@54.224.22.27:30541/wd/hub";
        gridUrl = "http://sushobhitd:glcUH6FSqT4uawyIL1RbXJr4ePasM1NuTZTkvxlQEz2IkSHLQt@35.171.87.55:32450/wd/hub";
        gridUrl = "http://sushobhitd:glcUH6FSqT4uawyIL1RbXJr4ePasM1NuTZTkvxlQEz2IkSHLQt@sushobhit-dev.lambdatest.io:32450/wd/hub";
        // http://sushobhit-dev.lambdatest.io:32450/wd/hub/status
        // https://sushobhit-dev.lambdatest.io:32450
    }
    if (env === "california") {
        gridUrl = "http://sushobhitd:8NFTCyOh68MjrGVTlCT9RAau9B1jIaIJQhESCXFJzvUqx057Yu@54.153.87.144:80/wd/hub"
    }
    if (env === "nv") {
        gridUrl = "http://sushobhitd:8NFTCyOh68MjrGVTlCT9RAau9B1jIaIJQhESCXFJzvUqx057Yu@us-east-1.lambdatest.com"
    }
    if (env === "local") {
        gridUrl = "http://localhost:4444/wd/hub"
    }
    if (env === "eu") {
        gridUrl = "https://sushobhitd:8NFTCyOh68MjrGVTlCT9RAau9B1jIaIJQhESCXFJzvUqx057Yu@eu-central-1-hub.lambdatest.com/wd/hub";
    }
    if (env === "siraj-stage") {
        gridUrl = "https://sirajk:oz85RZKxbqX6X8aCQXuQgUDnojP8OwY3wx2SAkEswtgRuxl8n0@stage-hub.lambdatest.com/wd/hub";
    }
    if (env === "bs") {
        gridUrl = "https://mohammadasadkhan1:CsbtfqVzuuBShxEgq1K3@hub-cloud.browserstack.com/wd/hub"
        capabilities.browser = browserName;
        capabilities.browser_version = version;
        capabilities.os = "Windows";
        capabilities.os_version = "10";
        delete capabilities.platform;
        delete capabilities.version;
    }
    //  gridUrl ="https://webhook.site/8e2e6fad-98f9-4ca5-a592-2aac0cc0533d"

    console.log(gridUrl);
    console.log(capabilities);
    console.log("Running " + parallelCount + " parallel tests ");
    let i = 1;
    for (i = 1; i <= parallelCount; i++) {
        startTest(gridUrl, capabilities, "Test " + i);
    }

}

searchTextOnGoogle();


async function startTest(gridUrl, capabilities, name) {
    const caps = capabilities;
    var n = name
    caps.name = n + capabilities.fixedIP + capabilities.appiumVersion

    var start_date= moment();

    const driver = await new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(caps)
        .build();

    var end_date = moment();
    var duration = moment.duration(end_date.diff(start_date));
    console.log(caps.name," : Setup Time :" , duration.asSeconds());
    
    // navigate to a url, search for a text and get title of page
    let url = "https://www.whatversion.net/safari/";
    url = "https://www.lambdatest.com/blog/"
    url = "https://wccqa.on24.com/webcast/lead?token=lFY_v867w2c80xnPMBr1B2GOZjjRIQpd1e8-EtO_pStJeIMF3ODVEhSEr6wR22US2iwlO1pLdOM1X-_9pBBXD8jwYLFf8EjlUKT1bWfDdBY="
    url = "about:preferences#searchResults"
    url = "https://mylocation.org/"
    url = "http://www.mit.edu"
    // url = "https://urldefense.com/v3/__https://storefront:l1oveJoy110@staging-spark-converse.demandware.net/s/ConverseUS/Register__;!!KLCbKzk!xItC4NlkL3XH0cpR7MDYyZfcVMXdRUkMryL8eySJLm5_H5sa9OJXNgnTBsOn42RBlgLN$"
    if (capabilities.resolution) {
        url = "http://whatismyscreenresolution.net/"
    }
    if (capabilities.tunnel) {
        url = "http://localhost:4725/"
        // url = "http://localhost.lambdatest.com:4725/"
        //url= "https://www.lambdatest.com/blog/"
    }
    if (capabilities.geoLocation) {
        url = "https://mylocation.org/"
        // url = "https://ifconfig.me/"
    }
    if (capabilities["userAgent"]) {
        url = "https://www.whatsmyua.info/"
    }
    url = "https://www.economist.com/science-and-technology/2020/08/25/robots-that-can-walk-are-now-striding-to-market?amp=1"
    url = "https://www.lambdatest.com/blog/"

    // url = "https://www.nsw.gov.au/"
    // url= "https://www.lambdatest.com/blog/"
    //url= "https://www.whatismybrowser.com/"
    // url= "chrome://version/"

    url = "https://self-signed.badssl.com/"
    url = "https://mylocation.org/"

    // url= "https://www.whatismybrowser.com/detect/are-cookies-enabled"
    // url= "https://tisa:WebAccess123%2B%2B%2B@jumbofischer-test.redhouse.de"
    await driver.get(url).then(function () {
       
            // driver.findElement(webdriver.By.xpath('//*[@id="home-search-autosuggest-input"]')).sendKeys("jobs").then(function () {
            //     setTimeout(function () {
            //         console.log("Marking Status Passed");
            //         driver.executeScript('lambda-status=passed');
            //         driver.quit();
            //     }, 5000);
            // });

        // driver.get("https://www.google.com/");
        // driver.findElement(webdriver.By.xpath('//*[@id="__next"]/div[1]/header/nav/a[2]/span')).click().then(function () {
        //     setTimeout(function () {
        //         driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/main/div[2]/div[1]/form/input[1]')).sendKeys("sushobhitdua.94@gmail.com").then(function () {
        //             driver.findElement(webdriver.By.xpath('//*[@id="root"]/div/main/div[2]/div[1]/form/input[2]')).sendKeys("sushobhit").then(function () {
        //                 setTimeout(function () {
        //                     driver.findElement(webdriver.By.xpath('//*[@id="submit-login"]')).click().then(function () {
        //                         setTimeout(function () {
        //                             console.log("Marking Status Passed");
        //                             driver.executeScript('lambda-status=passed');
        //                             driver.quit();
        //                         }, 25000);
        //                     });
        //                 }, 15000);
        //             });
        //         });
        //     }, 30000);
        // });
                    // driver.executeScript('return window.innerHeight').then(function (data) {
            //     console.log(data);
            // });
            // driver.executeScript('return window.innerWidth').then(function (data) {
            //     console.log(data);
            // });
            // driver.findElement(By.id("resolution")).then(function (element){
            //     console.log(JSON.stringify(element));
            // });
            //driver.get("https://www.lambdatest.com/blog/")
            // console.log(element)
            // element.isDisplayed();

        // var urlArray= ["https://www.lambdatest.com/blog/","https://www.google.com/","http://www.mit.edu","https://www.whatsmyua.info/","https://www.lambdatest.com/blog/","https://www.google.com/","http://www.mit.edu","https://www.whatsmyua.info/",]
        // for (j = 1; j <= 5; j++) {
        //     driver.get(urlArray[j]) 
        // }
         
        driver.getTitle().then(function (title) {
            setTimeout(function () {
                driver.executeScript('lambda-status=passed');
                driver.quit();
            }, 6000);
        });
    }).catch(function (err) {
        console.log("test failed with reason " + err)
        driver.executeScript('lambda-status=failed');
        driver.quit();
    });
    console.log(n + " Test End");
}

