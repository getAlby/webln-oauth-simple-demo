import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { auth, WebLNProvider } from "alby-js-sdk";
import Pay from './Pay';

import albyLogo from './alby-logo-figure.svg';
import albyLogoHead from './alby-logo-head.svg';

function App({ songsUrl, uploadUrl }) {

  function initAlbyWebln() {
    console.log('loading');
    if (window.webln) {
      return;
    }

    let token = {};
    const tokenData = window.localStorage.getItem("albyToken");
    if (tokenData) {
      token = JSON.parse(tokenData);
    }
    const authClient = new auth.OAuth2User({
      client_id: process.env["ALBY_CLIENT_ID"],
      client_secret: process.env["ALBY_CLIENT_SECRET"],
      callback: `${document.location.protocol}//${document.location.host}/albycallback`,
      //callback: 'http://localhost:8080/callback',
      scopes: ["payments:send"],
      token: token,
    });
    const provider = new WebLNProvider({auth: authClient});
    provider.on('enable', () => {
      const tokenData = JSON.stringify(provider.auth.token);
      window.localStorage.setItem("albyToken", tokenData);
    });
    provider.on('sendPayment', (result) => {
      toast(`paid. preimage: ${result.payment_preimage}`);
    });
    window.webln = provider;
    
  }
  useEffect(() => {
    if (!window.webln) {
      initAlbyWebln();
      console.error("You're missing a webln browser");
    }
  }, []);


  const paymentRequest = "lnbc210n1p3kzvu6pp58gxlha0m3pnkh2nef4jlmxtz7m4vu06x7ymnlaelxjqt6fpv5rnqdq8v3jk6mccqzpgxqyz5vqsp5kht26p9dt4rqqy8cmwtz9kpg5khg8q6wfkyfv2wx486qweqlvh9s9qyyssq98sk0z3zqc22vldskwuy30k6krkdtgannr39uhr07ahxc9k36fn9ykq2em4det0eeh949hng6q2vy8h04vp0hex4gtjpp0sumg4q26cqdar3l9"; // fetchInvoice({amount: 21}); // get the invoice from the recipient's node 

  return (
    <>
      <div><Toaster /></div>
      <div className="from-primary to-secondary text-primary-content bg-gradient-to-br min-h-screen pt-6">
        <div className="text-center p-4">
          <p className="text-2xl text-bold mb-2">
            <img src={albyLogoHead} className="w-6 h-6 inline mr-2" />Alby WebLN Demo  🚀
          </p>
        </div>
        <div><Pay paymentRequest={paymentRequest} /></div>

        <div className="text-center">
          <a href="https://getalby.com" target="_blank"><img src={albyLogo} alt="Powered by Alby" className="inline" /></a>
        </div>
      </div>

    </>
  )

}

export default App;
