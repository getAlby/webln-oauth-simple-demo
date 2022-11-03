await window.webln.enable();
const response = await window.webln.sendPayment(paymentRequest);
console.log(response);
alert(`paid: ${response.preimage}`)