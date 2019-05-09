const fs = require('fs');
const path = require('path');
const svgo = require('svgo');
const {exec} = require('child_process');
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
    nosecolor = ["E48C15", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"];

var skincolorvaluesw = ["-test", "", "-1F3FB", "-1F3FC", "-1F3FD", "-1F3FE", "-1F3FF"];
    skincolorw = ["FFFF00", "FCC21B", "FADCBC", "E0BB95", "CC9970", "AD6F43", "8E726A"],
    handcolorw = ["FFCC00", "FAC036", "FADCBC", "E0BB95", "CC9970", "AD6F43", "8E726A"],
    hand2colorw = ["00CCFF", "E39E49", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"],
    haircolorw = ["FF0000", "FFA000", "312D2D", "BFA055", "6D4C41", "47352D", "232020"],
    neckcolorw = ["00FF00", "E59900", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"],
    othercolorw = ["0000FF", "E59600", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"],
    nosecolorw = ["FF00FF", "E48C15", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"],

console.log("Converting X-marked emojis");

var xfiles = fs.readdirSync("src/all").filter(fn => fn.match(/([x])/i));
xfiles.forEach(function (item, index) {
  for (var i = 0; i < 6; i++) {
    let newname = item.replace(/x/g, skincolorvalues[i]);
    fs.copyFileSync(`src/all/${item}`, `svgs/${newname}`);
    var newfile = fs.readFileSync(`svgs/${newname}`, "utf8");
        allskin = new RegExp (skincolor[0], "gi"),
        allhand = new RegExp (handcolor[0], "gi"),
        allhand2 = new RegExp (hand2color[0], "gi"),
        allhair = new RegExp (haircolor[0], "gi"),
        allneck = new RegExp (neckcolor[0], "gi"),
        allnose = new RegExp (nosecolor[0], "gi"),
        allother = new RegExp (othercolor[0], "gi"),
        newfile2 = newfile.replace(allskin, skincolor[i]),
        newfile2 = newfile2.replace(allhand, handcolor[i]),
        newfile2 = newfile2.replace(allhand2, hand2color[i]),
        newfile2 = newfile2.replace(allhair, haircolor[i]),
        newfile2 = newfile2.replace(allneck, neckcolor[i]),
        newfile2 = newfile2.replace(allnose, nosecolor[i]),
        newfile2 = newfile2.replace(allother, othercolor[i]);
    fs.writeFileSync(`svgs/${newname}`, newfile2);
  }
});

console.log("Converting Z-marked emojis");

var wfiles = fs.readdirSync("svgs").filter(fn => fn.match(/([w])/i));
wfiles.forEach(function (item, index) {
  for (var i = 1; i < 7; i++) {
    let newnamew = item.replace(/w/g, skincolorvaluesw[i]);
    fs.copyFileSync(`svgs/${item}`, `svgs/${newnamew}`);
    var newfilew = fs.readFileSync(`svgs/${newnamew}`, "utf8");
        allskinw = new RegExp (skincolorw[0], "gi"),
        allhandw = new RegExp (handcolorw[0], "gi"),
        allhand2w = new RegExp (hand2colorw[0], "gi"),
        allhairw = new RegExp (haircolorw[0], "gi"),
        allneckw = new RegExp (neckcolorw[0], "gi"),
        allnosew = new RegExp (nosecolorw[0], "gi"),
        allotherw = new RegExp (othercolorw[0], "gi"),
        newfile2w = newfilew.replace(allskinw, skincolorw[i]),
        newfile2w = newfile2w.replace(allhandw, handcolorw[i]),
        newfile2w = newfile2w.replace(allhand2w, hand2colorw[i]),
        newfile2w = newfile2w.replace(allhairw, haircolorw[i]),
        newfile2w = newfile2w.replace(allneckw, neckcolorw[i]),
        newfile2w = newfile2w.replace(allnosew, nosecolorw[i]),
        newfile2w = newfile2w.replace(allotherw, othercolorw[i]);
    fs.writeFileSync(`svgs/${newnamew}`, newfile2w);
  }
});

console.log("Deleting Z-marked emojis");

var wfiles = fs.readdirSync("svgs").filter(fn => fn.match(/([w])/i));
wfiles.forEach(function (item, index) {
  fs.unlinkSync(`svgs/${item}`)
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

console.log("Converting SVGs to PNGs");

exec('magick convert -size 128x128 -background "rgba(255,255,255,0)" -set filename:f "%t" svg:./svgs/*.svg png:./pngs/128/"%[filename:f].png"');

console.log("Finishing the build...");
