const fs = require('fs');
const sharp = require('sharp');
const svgo = require('svgo');
const svgoInstance = new svgo({
  plugins: [
    {cleanupAttrs: true}, 
    {removeDoctype: true},
    {removeXMLProcInst: true},
    {removeComments: true},
    {removeMetadata: true},
    {removeTitle: true},
    {removeDesc: true},
    {removeUselessDefs: true},
    {removeEditorsNSData: true},
    {removeEmptyAttrs: true},
    {removeHiddenElems: true},
    {removeEmptyText: true},
    {removeEmptyContainers: true},
    {removeViewBox: false},
    {cleanupEnableBackground: true},
    {convertStyleToAttrs: true},
    {convertColors: true},
    {convertPathData: true},
    {convertTransform: true},
    {removeUnknownsAndDefaults: true},
    {removeNonInheritableGroupAttrs: true},
    {removeUselessStrokeAndFill: true},
    {removeUnusedNS: true},
    {cleanupIDs: true},
    {cleanupNumericValues: true},
    {moveElemsAttrsToGroup: true},
    {moveGroupAttrsToElems: true},
    {collapseGroups: true},
    {removeRasterImages: false},
    {mergePaths: true},
    {convertShapeToPath: true},
    {sortAttrs: true},
    {removeDimensions: true}
  ]
});

const skincolorvalues = ["", "-1F3FB", "-1F3FC", "-1F3FD", "-1F3FE", "-1F3FF"],
    skincolor = ["FCC21B", "FADCBC", "E0BB95", "CC9970", "AD6F43", "8E726A"],
    handcolor = ["FAC036", "FADCBC", "E0BB95", "CC9970", "AD6F43", "8E726A"],
    hand2color = ["E48C15", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"],
    haircolor = ["FFA000", "312D2D", "BFA055", "6D4C41", "47352D", "232020"],
    neckcolor = ["E59900", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"],
    othercolor = ["E59600", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"];

const skincolorvaluesw = ["-test", "", "-1F3FB", "-1F3FC", "-1F3FD", "-1F3FE", "-1F3FF"],
    skincolorw = ["FFFF00", "FCC21B", "FADCBC", "E0BB95", "CC9970", "AD6F43", "8E726A"],
    handcolorw = ["FFCC00", "FAC036", "FADCBC", "E0BB95", "CC9970", "AD6F43", "8E726A"],
    hand2colorw = ["FF00FF", "E48C15", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"],
    haircolorw = ["FF0000", "FFA000", "312D2D", "BFA055", "6D4C41", "47352D", "232020"],
    neckcolorw = ["00FF00", "E59900", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"],
    othercolorw = ["0000FF", "E59600", "DBA689", "C48E6A", "99674F", "7A4C32", "563E37"];

const srcfolders = fs.readdirSync("src");
srcfolders.forEach((name) => {
    const path = `src/${name}`;
    const subfolderfiles = fs.readdirSync(path);
    subfolderfiles.forEach((name) => {
        fs.copyFileSync(`${path}/${name}`, `svg/${name}`)
    });
});

console.log("Converting X-marked emojis");
const xfiles = fs.readdirSync("svg").filter(fn => fn.match(/([x])/i));
xfiles.forEach(function (item) {
  for (let i = 0; i < 6; i++) {
    let newname = item.replace(/x/g, skincolorvalues[i]);
    fs.copyFileSync(`svg/${item}`, `svg/${newname}`);
    let newfile = fs.readFileSync(`svg/${newname}`, "utf8");
        allskin = new RegExp (skincolor[0], "gi"),
        allhand = new RegExp (handcolor[0], "gi"),
        allhand2 = new RegExp (hand2color[0], "gi"),
        allhair = new RegExp (haircolor[0], "gi"),
        allneck = new RegExp (neckcolor[0], "gi"),
        allother = new RegExp (othercolor[0], "gi"),
        newfile = newfile.replace(allskin, skincolor[i]),
        newfile = newfile.replace(allhand, handcolor[i]),
        newfile = newfile.replace(allhand2, hand2color[i]),
        newfile = newfile.replace(allhair, haircolor[i]),
        newfile = newfile.replace(allneck, neckcolor[i]),
        newfile = newfile.replace(allother, othercolor[i]);
    fs.writeFileSync(`svg/${newname}`, newfile);
  };
  if (i = 5) { fs.unlinkSync(`svg/${item}`) };
});

console.log("Converting Z-marked emojis");
const wfiles = fs.readdirSync("svg").filter(fn => fn.match(/([w])/i));
wfiles.forEach(function (item) {
  for (let i = 1; i < 7; i++) {
    let newnamew = item.replace(/w/g, skincolorvaluesw[i]);
    fs.copyFileSync(`svg/${item}`, `svg/${newnamew}`);
    let newfilew = fs.readFileSync(`svg/${newnamew}`, "utf8");
        allskinw = new RegExp (skincolorw[0], "gi"),
        allhandw = new RegExp (handcolorw[0], "gi"),
        allhand2w = new RegExp (hand2colorw[0], "gi"),
        allhairw = new RegExp (haircolorw[0], "gi"),
        allneckw = new RegExp (neckcolorw[0], "gi"),
        allotherw = new RegExp (othercolorw[0], "gi"),
        newfilew = newfilew.replace(allskinw, skincolorw[i]),
        newfilew.replace(allhandw, handcolorw[i]),
        newfilew = newfilew.replace(allhand2w, hand2colorw[i]),
        newfilew = newfilew.replace(allhairw, haircolorw[i]),
        newfilew = newfilew.replace(allneckw, neckcolorw[i]),
        newfilew = newfilew.replace(allotherw, othercolorw[i]);
    fs.writeFileSync(`svg/${newnamew}`, newfilew);
  };
  if (i = 6) { fs.unlinkSync(`svg/${item}`) };
});

console.log("Optimizing SVGs and exporting to 128x PNGs");
const ofiles = fs.readdirSync("svg");
ofiles.forEach(function (item) {
  const data = fs.readFileSync(`svg/${item}`);
  svgoInstance.optimize(data, {path: `svg/${item}`}).then(function(result) {
    fs.writeFileSync(`svg/${item}`, result.data);

    sharp(Buffer.from(result.data, 'utf8'), {
      density: 128
    })
    .png()
    .toFile(`./png/128/${item.replace('svg', 'png')}`)
  })
});

console.log("Finishing the build...");
