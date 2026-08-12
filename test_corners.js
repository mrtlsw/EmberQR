import QRCodeStyling from 'qr-code-styling';

const fs = require('fs');
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM();

const qr = new QRCodeStyling({
  width: 300, height: 300,
  data: "test",
  jsdom: jsdom,
  dotsOptions: { type: 'square' },
  cornersSquareOptions: { type: 'rounded' }
});

qr.getRawData("svg").then((buffer) => {
  fs.writeFileSync('test_corners.svg', buffer);
  console.log("Done");
});
