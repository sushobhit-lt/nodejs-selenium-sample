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
var async = require('asyncawait/async');
var await = require('asyncawait/await');
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

console.log('node parallel.js 1 stage false false "Windows 7" "Internet Explorer" 8')
console.log('node parallel.js 10 stage false false "Windows 7" "Internet Explorer" 8')

async function searchTextOnGoogle() {

   var keys= process.argv;
   console.log(keys);
   let parallelCount = keys[2] || 1;
   let env = keys[3];
   let tunnel = keys[4] || false;
   let euGrid = keys[5] || false;
   let platform = keys[6] || "Windows 10";
   let browserName = keys[7] || "chrome";
   let version = keys[8] || "78.0";

    // Setup Input capabilities
    let capabilities = {
        "platform" : platform,
		"browserName" : browserName,
		"version" : version,
        //"resolution" : "1920x1080",
        // "fixedIP":"10.92.181.185",
        network: true,
        visual: true,
        console: true,
        video: true,
        name: "test 1", // name of the test
        build: 'LW-UK' // name of the build
    }

    if(tunnel=== "true"){
        capabilities.tunnel = true
    }
    // capabilities = {
    //     "platform" : "MacOS Catalina",
    //     "browserName" : "Chrome",
    //     "version" : "79.0",
    //     "resolution" : "1920x1080",
    //     network: true,
    //     visual: true,
    //     console: true,
    //     video: true,
    //     name: 'Test', // name of the test
    //     build: 'Catalina', // name of the build
    // }
    

    // URL: https://{username}:{accessToken}@beta-hub.lambdatest.com/wd/hub
    // const gridUrl ="https://webhook.site/1b2c943b-d8fc-4669-b93d-695b116327d7"
    var gridUrl="https://sushobhitd:glcUH6FSqT4uawyIL1RbXJr4ePasM1NuTZTkvxlQEz2IkSHLQt@stage-hub.lambdatest.com/wd/hub";
    if(env === "prod"){
         gridUrl = "https://sushobhitd:8NFTCyOh68MjrGVTlCT9RAau9B1jIaIJQhESCXFJzvUqx057Yu@hub.lambdatest.com/wd/hub";
         if(euGrid === "true"){ 
            gridUrl = "https://sushobhitd:8NFTCyOh68MjrGVTlCT9RAau9B1jIaIJQhESCXFJzvUqx057Yu@eu-central-1-hub.lambdatest.com/wd/hub";
        }
    }
    console.log(gridUrl);
    console.log(capabilities);
    console.log("Running "+parallelCount+" parallel tests ");
    let i=1;
    for(i=1;i<=parallelCount;i++){
        startTest(gridUrl,capabilities,"Test "+i);
    }

}

searchTextOnGoogle();


async function startTest(gridUrl,capabilities,name){
    const caps= capabilities;
    const n=name
    caps.name= n;

    const driver = new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(caps)
        .build();
    //console.log(caps);

    // navigate to a url, search for a text and get title of page
    await driver.get('https://www.lambdatest.com/blog/').then(function() {
            driver.getTitle().then(function(title) {
                setTimeout(function() {
                    console.log(title);
                    driver.executeScript('lambda-status=passed');
                    driver.quit();
                }, 25000);
            });
    }).catch(function(err){
        console.log("test failed with reason "+err)
        driver.executeScript('lambda-status=failed');
        driver.quit();
    });
    console.log(n+" Test End");
}


