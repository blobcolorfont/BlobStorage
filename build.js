const fs = require('fs');
const sharp = require('sharp');
const svgo = require('svgo');
const svgoInstance = new svgo({
  plugins: [
     {removeViewBox: false},
     {removeRasterImages: true},
     {removeDimensions: true}
  ]
});

//Set the skin color values, the order is:
//Generic tone, Type I & II tone, Type III tone, Type IV tone, Type V tone, Type VI tone and W-Marked colors.
const skinColorValues = ['', '-1F3FB', '-1F3FC', '-1F3FD', '-1F3FE', '-1F3FF', '-ERROR'];
      skinColor = ['FCC21B', 'FADCBC', 'E0BB95', 'CC9970', 'AD6F43', '8E726A', 'FFFF00'];
      handColor = ['FAC036', 'FADCBC', 'E0BB95', 'CC9970', 'AD6F43', '8E726A', 'FFCC00'];
      secondaryHandColor = ['E48C15', 'DBA689', 'C48E6A', '99674F', '7A4C32', '563E37', 'FF00FF'];
      hairColor = ['FFA000', '312D2D', 'BFA055', '6D4C41', '47352D', '232020', 'FF0000'];
      neckColor = ['E59900', 'DBA689', 'C48E6A', '99674F', '7A4C32', '563E37', '00FF00'];
      noseAndEarColor = ['E59600', 'DBA689', 'C48E6A', '99674F', '7A4C32', '563E37', '0000FF'];

//Search for all the SVGs from /src/
const srcFolders = fs.readdirSync('src');
srcFolders.forEach(name => {
    const srcCategoryFolderPath = `src/${name}`;
    const srcCategoryFolders = fs.readdirSync(srcCategoryFolderPath);
    srcCategoryFolders.filter(item => item.match(/svg/)).forEach(name => {
      fs.copyFileSync(`${srcCategoryFolderPath}/${name}`, `svg/${name}`);
    })
    srcCategoryFolders.filter(item => item.match(/^(?!.*\.svg).*$/)).forEach(name => {
      const srcSubcategoryFolderPath = `${srcCategoryFolderPath}/${name}`;
      const srcSubcategoryFolders = fs.readdirSync(srcSubcategoryFolderPath)
      srcSubcategoryFolders.filter(item => item.match(/svg/)).forEach(name => {
        fs.copyFileSync(`${srcSubcategoryFolderPath}/${name}`, `svg/${name}`);
      })
    })
});


//Transform all SVGs with a "x" on its filename into skin-colored & generic versions.
console.log('Converting X-marked emojis');
const xFiles = fs.readdirSync('svg').filter(fn => fn.match(/([x])/));
xFiles.forEach(item => {
  for (let x = 0; x <= 5; x++) {
    const newXFilename = item.replace(/x/g, skinColorValues[x]);
    fs.copyFileSync(`svg/${item}`, `svg/${newXFilename}`);
    let newXFile = fs.readFileSync(`svg/${newXFilename}`, 'utf8')
      .replace(new RegExp(skinColor[0], 'g'), skinColor[x])
      .replace(new RegExp(handColor[0], 'g'), handColor[x])
      .replace(new RegExp(secondaryHandColor[0], 'g'), secondaryHandColor[x])
      .replace(new RegExp(hairColor[0], 'g'), hairColor[x])
      .replace(new RegExp(neckColor[0], 'g'), neckColor[x])
      .replace(new RegExp(noseAndEarColor[0], 'g'), noseAndEarColor[x]);
    fs.writeFileSync(`svg/${newXFilename}`, newXFile);
  }
  if (x = 5) { fs.unlinkSync(`svg/${item}`) }
});

//Transform all SVGs with a "w" on its filename into ones with more than 2 skin tones.
console.log('Converting W-marked emojis');
const wFiles = fs.readdirSync('svg').filter(fn => fn.match(/([w])/));
wFiles.forEach(item => {
  for (let w = 0; w <= 5; w++) {
    const newWFilename = item.replace(/w/g, skinColorValues[w]);
    fs.copyFileSync(`svg/${item}`, `svg/${newWFilename}`);
    let newWFile = fs.readFileSync(`svg/${newWFilename}`, 'utf8')
      .replace(new RegExp(skinColor[6], 'g'), skinColor[w])
      .replace(new RegExp(handColor[6], 'g'), handColor[w])
      .replace(new RegExp(secondaryHandColor[6], 'g'), secondaryHandColor[w])
      .replace(new RegExp(hairColor[6], 'g'), hairColor[w])
      .replace(new RegExp(neckColor[6], 'g'), neckColor[w])
      .replace(new RegExp(noseAndEarColor[6], 'g'), noseAndEarColor[w]);
    fs.writeFileSync(`svg/${newWFilename}`, newWFile);
  }
  if (w = 5) { fs.unlinkSync(`svg/${item}`) }
});

//Feeds all SVGs to SVGO and then exports the PNGs.
console.log('Optimizing SVGs and exporting to 128x PNGs');
const oFiles = fs.readdirSync('svg');
oFiles.forEach(item => {
  const data = fs.readFileSync(`svg/${item}`);
  svgoInstance.optimize(data, {path: `svg/${item}`}).then(result => {
    fs.writeFileSync(`svg/${item}`, result.data);

    sharp(Buffer.from(result.data, 'utf8'), {
      density: 128
    })
    .png()
    .toFile(`./png/128/${item.replace('svg', 'png')}`)
  }).catch(err => console.log(err))
});

//This message lets the person know that the only thing left is optimizing, after it stops running, it's safe to close the terminal.
console.log('Finishing the build...');
