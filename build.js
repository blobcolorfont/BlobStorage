// Import the packages for file system business (fs), callback-to-promise conversion (util), fancy logging (ora), SVG rendering (sharp) and SVG optimizing (SVGO).
const fs = require('fs')
const util = require('util')
const ora = require('ora')
const sharp = require('sharp')
const SVGO = require('svgo')

const oraInstance = ora('Starting the build process.').start()

// Set up the SVGO instance with the settings.
const svgoInstance = new SVGO({
  plugins: [
    { convertColors: false },
    { removeViewBox: false },
    { removeRasterImages: true },
    { removeDimensions: true }
  ]
})

// Promisify all callbacks!
const pCopyFile = util.promisify(fs.copyFile)
const pReadDir = util.promisify(fs.readdir)
const pReadFile = util.promisify(fs.readFile)
const pStat = util.promisify(fs.stat)
const pUnlink = util.promisify(fs.unlink)
const pWriteFile = util.promisify(fs.writeFile)

// Set the list of skin colors to be converted into, the order is:
// Generic tone, Type I & II tone, Type III tone, Type IV tone, Type V tone, Type VI tone and W-Marked colors.
const skinColorValues = ['', '-1F3FB', '-1F3FC', '-1F3FD', '-1F3FE', '-1F3FF', '-ERROR']
const skinColor = ['FCC21B', 'FADCBC', 'E0BB95', 'CC9970', 'AD6F43', '8E726A', 'FFFF00']
const handColor = ['FAC036', 'FADCBC', 'E0BB95', 'CC9970', 'AD6F43', '8E726A', 'FFCC00']
const secondaryHandColor = ['E48C15', 'DBA689', 'C48E6A', '99674F', '7A4C32', '563E37', 'FF00FF']
const hairColor = ['FFA000', '312D2D', 'BFA055', '6D4C41', '47352D', '232020', 'FF0000']
const neckColor = ['E59900', 'DBA689', 'C48E6A', '99674F', '7A4C32', '563E37', '00FF00']
const noseAndEarColor = ['E59600', 'DBA689', 'C48E6A', '99674F', '7A4C32', '563E37', '0000FF']

// This is used to convert a targetted set of skin colors to all the other variants.
async function convertSVGTo (file, targetIndex, marker) {
  const convertedFilepaths = []
  for (let index = 0; index <= 5; index++) {
    const convertedFilename = file.replace(new RegExp(marker, 'g'), skinColorValues[index])

    await pCopyFile(file, convertedFilename)
    let data = await pReadFile(convertedFilename, 'utf8')

    data = data
      .replace(new RegExp(skinColor[targetIndex], 'g'), skinColor[index])
      .replace(new RegExp(handColor[targetIndex], 'g'), handColor[index])
      .replace(new RegExp(secondaryHandColor[targetIndex], 'g'), secondaryHandColor[index])
      .replace(new RegExp(hairColor[targetIndex], 'g'), hairColor[index])
      .replace(new RegExp(neckColor[targetIndex], 'g'), neckColor[index])
      .replace(new RegExp(noseAndEarColor[targetIndex], 'g'), noseAndEarColor[index])

    await pWriteFile(convertedFilename, data)
    convertedFilepaths.push(convertedFilename)
  }

  await pUnlink(file)
  return convertedFilepaths
}

// This is used to optimize the SVGs.
async function optimizeSVG (path) {
  const data = await pReadFile(path)

  const optimizedSvg = await svgoInstance.optimize(data)
  await pWriteFile(path, optimizedSvg.data)
}

// Renders the SVGs into PNGs.
async function renderSVG (path) {
  const data = await pReadFile(path)
  const filename = await path.match(/[A-Za-z0-9_\-.]+$/g).shift().replace('svg', 'png')

  oraInstance.text = `Rendering ${path}`

  sharp(Buffer.from(data, 'utf8'), { density: 128 })
    .png().toFile(`output/png/128/${filename}`)
}

// Render multiple SVGs into PNGs with an array of filepaths.
async function renderSVGsFromArray (filepaths) {
  filepaths.forEach(async filepath => {
    await renderSVG(filepath)
  })
}

// This is used for all the found SVGs.
async function prepareFile (path) {
  let filepaths = [path]
  const filename = await path.match(/[A-Za-z0-9_\-.]+$/g).shift()

  await pCopyFile(path, `output/svg/${filename}`)
  await optimizeSVG(`output/svg/${filename}`)
  if (filename.includes('x')) {
    filepaths = await convertSVGTo(`output/svg/${filename}`, 0, 'x')

    filepaths.forEach(async xFilename => {
      if (xFilename.includes('w')) {
        filepaths = await convertSVGTo(`${xFilename}`, 6, 'w')
        oraInstance.stop('Finishing build...')
        await renderSVGsFromArray(filepaths)
      } else { await renderSVGsFromArray(filepaths) }
    })
  } else { await renderSVGsFromArray(filepaths) }
}

// This is the function that searchs for SVGs and more folders.
async function inspectFolderRecursively (directory) {
  oraInstance.text = `Inspecting ${directory}`
  await pReadDir(directory).then(async files => {
    files.forEach(async file => {
      // Set the filepath variable for better reusing.
      const filepath = `${directory}/${file}`
      pStat(filepath).then(async stat => {
        // If the file is a folder and isn't marked as a draft folder, inspect it.
        if (stat.isDirectory() && !filepath.includes('!')) {
          await inspectFolderRecursively(filepath)
        }

        // If the file is a file and not a folder, prepare it.
        if (stat.isFile()) {
          oraInstance.text = `Preparing ${filepath}`
          await prepareFile(filepath)
        }
      })
    })
  })
}

// Begin every single thing with this magic function.
inspectFolderRecursively('src')
