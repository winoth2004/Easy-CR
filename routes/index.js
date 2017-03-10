var $ = require('jquery'),
    _ = require('underscore'),
    fs = require('fs'),
    ac = require('autocomplete');

const https = require('https');

exports.page = function(req, res) {
  res.render('index', { layout: 'layout', title: 'Package Reader' });
};

var pkgsAC = ac.connectAutocomplete(),
    packageNames = {},
    packageCodes = {},
    weblabNames = [];

fs.readFile('data/package-codes.dat', function(err, data) {
  var packages = [];

  _.each(data.toString().split('\n'), function(a) {
    var parts = a.trim().split("|"),
        packageName = parts[0],
        packageNameLower = packageName.toLowerCase(),
        packageCode = parts[1];
        packageCodeLower = packageCode.toLowerCase(),
        fullName = packageName;

    packageNames[packageNameLower] = fullName;
    packageCodes[packageCodeLower] = fullName;

    packages.push(packageNameLower);
    packages.push(packageCodeLower);
  });

  pkgsAC.initialize(function(onReady) {
    onReady(packages);
  });
});

fs.readFile('data/weblab-codes.dat', function(err, data) {
  _.each(data.toString().split('\n'), function(weblab) {
    weblabNames.push(weblab);
  });
});

exports.packages = function(req, res) {
  var package = req.query["term"].toLowerCase(),
      results = pkgsAC.search(package);

  var packageResults = _.map(results, function(a) {
    return packageNames[a] || packageCodes[a];
  });

  res.send(packageResults);
};

exports.weblabs = function(req, res) {
  res.send(weblabNames);
};