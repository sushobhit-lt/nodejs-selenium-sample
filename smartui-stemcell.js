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
let USERNAME = '{username}';

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
let KEY = '{accessKey}';

// gridUrl: gridUrl can be found at automation dashboard
const GRID_HOST = 'hub.lambdatest.com/wd/hub';
// const GRID_HOST='stage-hub.lambdatestinternal.com/wd/hub';


console.log('node smartui-stemcell.js 1024x768')
console.log('node smartui-stemcell.js 1280x960')
console.log('node smartui-stemcell.js 1920x1080')

// require('dns').lookup('hub.lambdatest.com', (e, addr) => { console.log(addr) });
USERNAME = process.env.LT_USERNAME;

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
KEY = process.env.LT_ACCESS_KEY;


async function searchTextOnGoogle() {

    var keys = process.argv;
    console.log(keys);
    let parallelCount = 1;
    let env = "prod";
    let fixedIP = keys[3];
    let tunnel = keys[4] || false;
    let platform = keys[6] || "monterey";
    let browserName = keys[7] || "chrome";
    let version = keys[8] || "latest";

    // Setup Input capabilities
    let capabilities = {
        "platform": platform,
        "browserName": browserName,
        "version": version,

        "resolution" : keys[2] || "1024x768",
        idleTimeout: 1800,
        // network: true,
        visual: true,
        console: true,
        video: true,
        name: "test session", // name of the test
        build: platform + browserName + version, // name of the build
        "smartUI.project": "stemcell",
        "smartUI.baseline": false,
        // "selenium_version": "4.0.0",
         build: "stemcell-build"
    }

    if (keys[9]) {
        capabilities = {}
        capabilities.deviceName = keys[9]

        if (capabilities.deviceName.startsWith("i")) {
            capabilities.browserName = "safari";
            capabilities.nativeWebTap = true;
            if(keys[10]){
                capabilities.platformVersion = keys[10] || "13.4";
            }
        } else {
            capabilities.browserName = "chrome";
            capabilities["appiumVersion"] = keys[10];
            capabilities.fixedPort = "8000";

        }
        // capabilities.network = false;
        capabilities["smartUI.project"] = "DOT-1418";
        // capabilities["smartUI.build"]= "smartui-04eeecb63a", 

        capabilities.visual = true;
        capabilities.console = true;
        capabilities.idleTimeout= 1800;
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

    //add github app capabilities
    let githubURL = process.env.GITHUB_URL
    if (githubURL){
        capabilities.github = {
                url:githubURL
        }
    }

    gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

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
    let url = "https://www.stemcell.com/products/mtesr1.html";
    
    await driver.get(url).then(function () {
       
           
        let screenshotName = "full-page-only";
        driver.executeScript(`smartui.takeFullPageScreenshot=${screenshotName}`).then(out => {
            console.log("takeScreenshot :", out)
            return
        });
        console.log("screenshotName :", screenshotName)
        driver.getTitle().then(function (title) {
            setTimeout(function () {
                driver.executeScript('lambda-status=passed');
                driver.quit();
            }, 10000);
        });
    }).catch(function (err) {
        console.log("test failed with reason " + err)
        driver.executeScript('lambda-status=failed');
        driver.quit();
    });
    console.log(n + " Test End");
}

