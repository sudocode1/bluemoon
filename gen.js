const sizeOf = require('image-size');
const sha256 = require('js-sha256').sha256;
const canvas = require('canvas');
const {gzip} = require('node-gzip');


if (!process.argv[2]) {
    console.error('You must provide an image.');
    process.exit();
}

let imageToRead = process.argv[2];
let dimensions = sizeOf(imageToRead);

let canv = canvas.createCanvas(dimensions.width, dimensions.height);
let ctx = canv.getContext('2d');
 
const image = require('fs').readFileSync(imageToRead);
const img = new canvas.Image();
img.onload = () => ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
img.onerror = err => { throw err };
img.src = image;

let pixelString = '';

let nextY = 0;
let nextX = 0;

while(nextY < dimensions.height) {
    ctx
        .getImageData(nextX, nextY, 1, 1)
        .data.forEach(val => pixelString += val.toString().replace(/\d/g, x => [x, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'][x]) + ',');

    nextX++;

    if (nextX > dimensions.width) {
        nextX = 0;
        nextY++;
    }
}


// You can uncomment this part if you want the base64 version to be saved to a file, however due to the size it is not recommended.
// require('fs').writeFileSync('./base64.txt', Buffer.from(pixelString, 'utf8').toString('base64'));

gzip(Buffer.from(pixelString, 'utf8').toString('base64')).then(compressed => {
    require('fs').writeFileSync(`./${process.argv[2]}.gzip`, compressed);
});

console.log('sha256:', sha256(Buffer.from(pixelString, 'utf8').toString('base64')));
console.log('\x1b[31mIt is not recommended to use sha256 as it is not always unique (although that is unlikely). You should use the gzip file instead.\x1b[0m');
