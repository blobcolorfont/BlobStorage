const fs = require('fs');
const path = require('path');
const svgo = require('svgo');
const optimizer = new svgo({
        plugins: [{
          cleanupAttrs: true,
        }, {
          removeDoctype: true,
        },{
          removeXMLProcInst: true,
        },{
          removeComments: true,
        },{
          removeMetadata: true,
        },{
          removeTitle: true,
        },{
          removeDesc: true,
        },{
          removeUselessDefs: true,
        },{
          removeEditorsNSData: true,
        },{
          removeEmptyAttrs: true,
        },{
          removeHiddenElems: true,
        },{
          removeEmptyText: true,
        },{
          removeEmptyContainers: true,
        },{
          removeViewBox: false,
        },{
          cleanupEnableBackground: true,
        },{
          convertStyleToAttrs: true,
        },{
          convertColors: true,
        },{
          convertPathData: true,
        },{
          convertTransform: true,
        },{
          removeUnknownsAndDefaults: true,
        },{
          removeNonInheritableGroupAttrs: true,
        },{
          removeUselessStrokeAndFill: true,
        },{
          removeUnusedNS: true,
        },{
          cleanupIDs: true,
        },{
          cleanupNumericValues: true,
        },{
          moveElemsAttrsToGroup: true,
        },{
          moveGroupAttrsToElems: true,
        },{
          collapseGroups: true,
        },{
          removeRasterImages: false,
        },{
          mergePaths: true,
        },{
          convertShapeToPath: true,
        },{
          sortAttrs: true,
        },{
          removeDimensions: true,
        }]
});

var skincolorvalues = ["", "-1F3FB", "-1F3FC", "-1F3FD", "-1F3FE", "-1F3FF"];
    skincolor = ["FCC21B", "FADCBC", "E0BB95", "CC9970", "AD6F43", "8E726A"],
    handcolor = ["FAC036", "FADCBC", "E0BB95", "CC9970", "AD6F43", "8E726A"],
    hand2color = ["E39E49", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"],
    haircolor = ["FFA000", "312D2D", "BFA055", "6D4C41", "47352D", "232020"],
    neckcolor = ["E59900", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"],
    othercolor = ["E59600", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"],
    nosecolor = ["E48C15", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"],

console.log("Converting X-marked emojis");

var xfiles = fs.readdirSync("src/all").filter(fn => fn.match(/([x])/i));
xfiles.forEach(function (item, index) {
  for (var i = 0; i < 6; i++) {
    let newname = item.replace(/x/g, skincolorvalues[i]);
    fs.copyFileSync(`src/all/${item}`, `svgs/${newname}`);
    var newfile = fs.readFileSync(`svgs/${newname}`, "utf8");
    var allskin = new RegExp (skincolor[0], "gi");
    var allhand = new RegExp (handcolor[0], "gi");
    var allhand2 = new RegExp (hand2color[0], "gi");
    var allhair = new RegExp (haircolor[0], "gi");
    var allneck = new RegExp (neckcolor[0], "gi");
    var allnose = new RegExp (nosecolor[0], "gi");
    var allother = new RegExp (othercolor[0], "gi");
    var newfile2 = newfile.replace(allskin, skincolor[i]);
    var newfile2 = newfile2.replace(allhand, handcolor[i]);
    var newfile2 = newfile2.replace(allhand2, hand2color[i]);
    var newfile2 = newfile2.replace(allhair, haircolor[i]);
    var newfile2 = newfile2.replace(allneck, neckcolor[i]);
    var newfile2 = newfile2.replace(allnose, nosecolor[i]);
    var newfile2 = newfile2.replace(allother, othercolor[i]);
    fs.writeFileSync(`svgs/${newname}`, newfile2);
  }
});

console.log("Copying regular emojis");

var files = fs.readdirSync("src/all").filter(fn => fn.match(/^((?!x).)*$/i));
files.forEach(function (item, index) {
  fs.copyFileSync(`src/all/${item}`, `svgs/${item}`);
});

var ofiles = fs.readdirSync("svgs");
ofiles.forEach(function (item, index) {
  var optifile = fs.readFile(`svgs/${item}`, "utf8", (err, data) => {
    optimizer.optimize(data, {path: `svgs/${item}`}).then(function(result) {
      fs.writeFileSync(`svgs/${item}`, result.data);
    });
  });
});

console.log("Done!");
