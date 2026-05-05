export default async function handler(req, res) {
  const { code } = req.query;
  const client_id = process.env.OAUTH_CLIENT_ID;
  const client_secret = process.env.OAUTH_CLIENT_SECRET;

  if (!code) {
    const params = new URLSearchParams({
      client_id,
      scope: "repo,user",
      redirect_uri: `https://${req.headers.host}/api/auth`,
    });
    return res.redirect(`https://github.com/login/oauth/authorize?${params}`);
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ client_id, client_secret, code }),
    });

    const data = await response.json();
    const token = data.access_token;

    const script = `
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage %o", e);
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({ token, provider: "github" })}',
              e.origin
            );
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })()
      </script>`;

    return res.send(script);
  } catch (err) {
    return res.status(500).send("OAuth error: " + err.message);
  }
}
