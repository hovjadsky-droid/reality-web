export const config = { runtime: "edge" };

export default async function handler(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const client_id = process.env.OAUTH_CLIENT_ID;
  const client_secret = process.env.OAUTH_CLIENT_SECRET;

  if (!code) {
    const params = new URLSearchParams({
      client_id,
      scope: "repo,user",
    });
    return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
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
      return new Response("No token received: " + JSON.stringify(data), { status: 400 });
    }

    const message = "authorization:github:success:" + JSON.stringify({ token, provider: "github" });
    const safeMessage = JSON.stringify(message);

    const html = `<!DOCTYPE html>
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
</html>`;

    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (err) {
    return new Response("OAuth error: " + err.message, { status: 500 });
  }
}
