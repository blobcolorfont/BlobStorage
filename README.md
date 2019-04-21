# BlobStorage
This is the repository where the unpolished SVGs for the Blob Color Font project are stored.<br>
The emoji are either based on or directly from the [Noto Color Emoji](https://github.com/googlei18n/noto-emoji/) before the Oreo update.<br>
Using SVGO is recommended before using them for anything.<br>

## Usage
The BlobStorage is being used in the [BlobCompiler](https://github.com/blobcolorfont/BlobCompiler/) project, where it will build a SVGinOT font with all the emojis here.<br>
Our emojis can be used outside the font project as long as you credit us.

## Building /svg/
To build the svgs along with the skin-colored variants, you need [Node.js](https://nodejs.org/en/) and the [svgo](https://www.npmjs.com/package/svgo) package installed.<br>
After both are installed, execute ``node build.js`` and the /svg/ folder will be built from /src/

## License
All the image resources released under this repository are licensed under the [Apache license, version 2.0](./LICENSE).