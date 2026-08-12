import QRCodeStyling from 'qr-code-styling';
const qr = new QRCodeStyling({
  width: 300, height: 300,
  data: "test",
  dotsOptions: { gradient: { type: 'linear', rotation: 0, colorStops: [{offset: 0, color: 'red'}, {offset: 1, color: 'blue'}] } }
});
console.log("Before:", qr._options.dotsOptions.gradient);
qr.update({ dotsOptions: { gradient: null } });
console.log("After:", qr._options.dotsOptions.gradient);
