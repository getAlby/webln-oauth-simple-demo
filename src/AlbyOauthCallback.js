import { useEffect, useRef, useState, useMemo, useCallback } from "react";

const AlbyOauthCallback = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("use effect");
    if (!window.opener) {
      alert("Opener not available. Please contact support@getalby.com");
      return;
    }
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code");
    const error = params.get("error");

    if (!code) {
      setError("declined");
    }
    if (error) {
      setError(error);
      alert(error);
      return;
    }

    window.opener.postMessage({
      type: 'alby:oauth:success',
      payload: { code },
    });
    console.log("message published");

  }, []);

  return (
    <div>
      {error && (
        <p>Authorization failed: {error}</p>
      )}
      {!error && (
        <p>Connected. you can close this window.</p>
      )}
    </div>
  )

}

export default AlbyOauthCallback;
