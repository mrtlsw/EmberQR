const QRCodeStyling = require('qr-code-styling');
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM();

(async () => {
  const qrRounded = new QRCodeStyling({
    width: 300, height: 300,
    data: "test",
    jsdom: jsdom.window,
    cornersSquareOptions: { type: 'extra-rounded', color: 'black' }
  });
  const svg = await qrRounded.getRawData("svg");
  console.log("Patched Extra Rounded:", svg.toString().match(/<path[^>]+>/g)[0].substring(0, 150));
})();
