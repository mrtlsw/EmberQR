const QRCodeStyling = require('qr-code-styling');
const { JSDOM } = require('jsdom');

(async () => {
  const qrRounded = new QRCodeStyling({
    width: 300, height: 300,
    data: "test",
    jsdom: JSDOM,
    cornersSquareOptions: { type: 'rounded', color: 'black' }
  });
  const svg = await qrRounded.getRawData("svg");
  console.log("Rounded Square:", svg.toString().match(/<path[^>]+>/g)[0].substring(0, 150));
})();
