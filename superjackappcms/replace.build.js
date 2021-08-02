var replace = require('replace-in-file');
var fs = require('fs');
var versionType = process.argv[2];
processCurrentVersion();



function processCurrentVersion(){
    var file = "./package.json";

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        let packageNodes = JSON.parse(data);
        let previousPackageVersion = packageNodes.version;
        var workingVersions = previousPackageVersion.split('.');
        workingVersions.forEach((x, i) => {
            let y = parseInt(x);
            workingVersions[i] = y;
        });
        
        switch (versionType) {
            case "major":
                workingVersions[0] = workingVersions[0] + 1;
                workingVersions[1] = 0;
                workingVersions[2] = 0;
                break;
            case "minor":
                workingVersions[1] = workingVersions[1] + 1;
                workingVersions[2] = 0;
                break;
            case "patch":
                workingVersions[2] = workingVersions[2] + 1;
                break;
            default:
                workingVersions[2] = workingVersions[2] + 1;
                break;
        }
    
        var buildVersion = workingVersions.join('.');

        let vt = new Date();
        let date = vt.getFullYear() + "-" + fixDateTime(vt.getMonth() + 1) + "-" + fixDateTime(vt.getDate());
        let time = fixDateTime(vt.getHours()) + ":" + fixDateTime(vt.getMinutes()) + ":" + fixDateTime(vt.getSeconds());
        
        var versionDate = date + " " + time;

        updatePackageVersion(buildVersion);
        updatePackageLockVersion(buildVersion);
        updateLocalDevelopmentVersion(buildVersion, versionDate);
        updateProductionVersion(buildVersion, versionDate);
    });
}

function updatePackageVersion(updatedVersion){
    var file = "./package.json";

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        let packageNodes = JSON.parse(data);
        
        packageNodes.version = updatedVersion;
    
        try {
            fs.writeFile(file, JSON.stringify(packageNodes, 0, 4), 'utf8', function (err, data) {
                if (err) {
                  return console.log(err);
                }   
                console.log('Package version set: ' + updatedVersion);             
            });
            // const data = fs.writeFileSync(file, JSON.stringify(packageNodes, 0, 4), 'utf8');
            // updateEnvironmentVersions();
            //file written successfully
        } catch (err) {
            console.error(err)
        }       
    });
}

function updatePackageLockVersion(updatedVersion){
    var file = "./package-lock.json";

    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        let packageNodes = JSON.parse(data);
        
        packageNodes.version = updatedVersion;
    
        try {
            fs.writeFile(file, JSON.stringify(packageNodes, 0, 4), 'utf8', function (err, data) {
                if (err) {
                  return console.log(err);
                }
                console.log('Package lock version set: ' + updatedVersion);                
            });
            //const data = fs.writeFileSync(file, JSON.stringify(packageNodes, 0, 4), 'utf8');
            //file written successfully
        } catch (err) {
            console.error(err)
        }       
    });
}

function updateLocalDevelopmentVersion(updatedVersion, updatedVersionDate) {
    
    const options = {
        files: 'src/environments/environment.ts',
        from: /version: '(.*)'/g,
        to: "version: '" + updatedVersion + "'",
        allowEmptyPaths: false,
    };

    const dateOptions = {
        files: 'src/environments/environment.ts',
        from: /versionDate: '(.*)'/g,
        to: "versionDate: '" + updatedVersionDate + "'",
        allowEmptyPaths: false,
    };

    try {
        let changedVersion = replace.sync(options);
        let changedVersionDate = replace.sync(dateOptions);
        console.log('Dev build version set: ' + updatedVersion);
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
}

function updateProductionVersion(updatedVersion, updatedVersionDate) {
    const options = {
        files: 'src/environments/environment.prod.ts',
        from: /version: '(.*)'/g,
        to: "version: '" + updatedVersion + "'",
        allowEmptyPaths: false,
    };

    const dateOptions = {
        files: 'src/environments/environment.prod.ts',
        from: /versionDate: '(.*)'/g,
        to: "versionDate: '" + updatedVersionDate + "'",
        allowEmptyPaths: false,
    };

    try {
        let changedVersion = replace.sync(options);
        let changedVersionDate = replace.sync(dateOptions);
        console.log('Production build version set: ' + updatedVersion);
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
}

function fixDateTime(n){
    let d = n.toString();
    if(n<10){
      d = "0" + n.toString();
    }
    return d;
  }

