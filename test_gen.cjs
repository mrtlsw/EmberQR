const QRCodeStyling = require('qr-code-styling');
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM();

(async () => {
  const qr = new QRCodeStyling({
    width: 300, height: 300, data: "test",
    jsdom: jsdom.window,
    cornersSquareOptions: { type: 'rounded' },
    cornersDotOptions: { type: 'rounded' }
  });
  const svg = await qr.getRawData("svg");
  console.log(svg.toString().substring(0, 400));
})();
