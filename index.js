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

/*
    Setup remote driver
    Params
    ----------
    platform : Supported platform - (Windows 10, Windows 8.1, Windows 8, Windows 7,  macOS High Sierra, macOS Sierra, OS X El Capitan, OS X Yosemite, OS X Mavericks)
    browserName : Supported platform - (chrome, firefox, Internet Explorer, MicrosoftEdge, Safari)
    version :  Supported list of version can be found at https://www.lambdatest.com/capabilities-generator/
*/

// username: Username can be found at automation dashboard
const USERNAME = process.env.LT_USERNAME;

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = process.env.LT_ACCESS_KEY;

// gridUrl: gridUrl can be found at automation dashboard
const GRID_HOST = 'hub.lambdatest.com/wd/hub';

function searchTextOnGoogle() {

    const platform = process.env.LT_OPERATING_SYSTEM || 'windows 10';
    const browserName = process.env.LT_BROWSER_NAME || 'chrome';
    const version = process.env.LT_BROWSER_VERSION || '80.0';
    const buildName = process.env.LT_BUILD_NAME || 'NodeJS build';
    const testName = process.env.LT_TEST_NAME || 'Test 1';

    // Setup Input capabilities
    const capabilities = {
        platform: platform,
        browserName: browserName,
        version: version,
        network: true,
        visual: true,
        console: true,
        video: true,
        name: testName, // name of the test
        build: buildName // name of the build
    }

    // URL: https://{username}:{accessToken}@beta-hub.lambdatest.com/wd/hub
    const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;
    console.log(gridUrl);
    console.log(capabilities);
    // setup and build selenium driver object 
    const driver = new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(capabilities)
        .build();

    // navigate to a url, search for a text and get title of page
    driver.get('https://www.google.com/ncr').then(function() {
        driver.findElement(webdriver.By.name('q')).sendKeys('LambdaTest\n').then(function() {
            driver.getTitle().then(function(title) {
                setTimeout(function() {
                    console.log(title);
                    driver.executeScript('lambda-status=passed');
                    driver.quit();
                }, 5000);
            });
        });
    }).catch(function(err){
        console.log("test failed with reason "+err)
        driver.executeScript('lambda-status=failed');
        driver.quit();
    });
}
searchTextOnGoogle();