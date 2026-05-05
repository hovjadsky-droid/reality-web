export default async function handler(req, res) {
  const { code } = req.query;
  const client_id = process.env.OAUTH_CLIENT_ID;
  const client_secret = process.env.OAUTH_CLIENT_SECRET;

  if (!code) {
    const params = new URLSearchParams({
      client_id,
      scope: "repo,user",
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

    if (!token) {
      return res.status(400).send("No token received: " + JSON.stringify(data));
    }

    const message = "authorization:github:success:" + JSON.stringify({ token, provider: "github" });
    const safeMessage = JSON.stringify(message);

    return res.send(`<!DOCTYPE html>
<html>
<body>
<script>
  (function() {
    var message = ${safeMessage};
    function receiveMessage(e) {
      window.opener.postMessage(message, e.origin);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
</body>
</html>`);
  } catch (err) {
    return res.status(500).send("OAuth error: " + err.message);
  }
}
