const QRCodeStyling = require('qr-code-styling');
const { JSDOM } = require('jsdom');

(async () => {
  const qrClassy = new QRCodeStyling({
    width: 300, height: 300,
    data: "test",
    jsdom: JSDOM,
    cornersSquareOptions: { type: 'extra-rounded', color: 'black' }
  });
  const svgC = await qrClassy.getRawData("svg");
  console.log("Extra:", svgC.toString().match(/<path[^>]+>/)[0].substring(0, 100));
})();
