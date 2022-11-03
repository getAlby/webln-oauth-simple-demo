import { useRef, useState } from "react";

function Pay(props) {
  const [preimage, setPreimage] = useState("");
  const paymentRequest = props.paymentRequest;

  const payInvoice = async (e) => {
    e.preventDefault();

    if (!window.webln) {
      console.log("webln is not available");
      return;
    }

    await window.webln.enable();
    const response = await window.webln.sendPayment(paymentRequest);
    console.log(response);
    setPreimage(response.preimage);
  }

  return (
    <div className="mx-auto text-center">
      <p>{paymentRequest}</p>
      <p>{preimage}</p>
      <button className="btn btn-primary" onClick={payInvoice}>Pay</button>
    </div>
  )
}

export default Pay;
