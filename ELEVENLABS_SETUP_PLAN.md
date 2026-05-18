# ElevenLabs Text-to-Speech Setup Plan

This project will keep the current browser-based text-to-speech experience first, then add ElevenLabs through a secure backend or serverless function later. Do **not** add a real ElevenLabs API key to frontend files, commits, or GitHub Pages settings that expose client-side code.

## Why the API key cannot go in frontend code

GitHub Pages serves `index.html`, `script.js`, and other static assets directly to every visitor's browser. Any secret placed in those files can be viewed through browser developer tools, page source, downloaded JavaScript, or the repository history.

Putting an ElevenLabs API key in frontend code would let anyone copy the key and use the paid ElevenLabs account from another website, script, or bot. The key must stay on a private server-side runtime where only trusted backend code can read it.

## Recommended backend/serverless option

Use a small serverless function as the secure proxy between the website and ElevenLabs. Recommended options include:

- **Netlify Functions** if the site is later hosted on Netlify.
- **Vercel Serverless Functions** if the site is later hosted on Vercel.
- **Cloudflare Workers** if you want a lightweight edge function with environment secrets.
- **GitHub Pages + separate serverless endpoint** if the frontend remains on GitHub Pages.

For this static GitHub Pages website, the recommended path is to keep the frontend on GitHub Pages and deploy a separate serverless endpoint on Netlify, Vercel, or Cloudflare Workers. The frontend would call that endpoint, and the endpoint would call ElevenLabs.

## Environment variable name

Store the ElevenLabs API key in the backend/serverless platform as:

```text
ELEVENLABS_API_KEY
```

Only the backend/serverless function should read this variable. It should never be committed to the repository or exposed in browser code.

## ElevenLabs `voice_id` needed

Choose the voice in the ElevenLabs dashboard and copy its `voice_id`. The backend will need this value to select the correct voice when calling ElevenLabs text-to-speech.

Recommended environment variable name for the selected voice:

```text
ELEVENLABS_VOICE_ID
```

This is not as sensitive as the API key, but storing it with backend configuration keeps the integration easier to change later.

## How the website will call the backend later

Later, the frontend should send the generated affirmation text to a backend endpoint, for example:

```text
POST https://your-serverless-domain.example/api/tts
Content-Type: application/json

{
  "text": "I am safe to welcome more goodness, support, and possibility into my life."
}
```

The serverless function will:

1. Validate the request body and limit the text length.
2. Read `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID` from private environment variables.
3. Call the ElevenLabs text-to-speech API from the backend only.
4. Return the generated audio to the browser as an audio file/blob or a short-lived URL.
5. Avoid logging full secrets or sensitive request data.

The frontend will then play the returned audio with the browser `Audio` API instead of calling ElevenLabs directly.

## Files that will need to change later

When the ElevenLabs backend is ready, these files will likely need updates:

- `script.js` — replace or extend the browser speech button handler so it calls the secure backend endpoint and plays the returned ElevenLabs audio.
- `index.html` — only if the audio controls, loading message, or accessibility text need new markup.
- `style.css` — only if new loading, disabled, or error states need styling.
- A new backend/serverless function file, depending on the selected platform, such as:
  - `netlify/functions/tts.js`
  - `api/tts.js` for Vercel
  - `functions/tts.js` or a Cloudflare Worker entry file
- Platform environment settings — add `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID` in the host dashboard or CLI secrets manager.

## Security reminders

- Do not commit `.env` files containing real secrets.
- Do not paste API keys into `index.html`, `script.js`, browser console examples, screenshots, or documentation committed to the public repository.
- Rotate the ElevenLabs key immediately if it is ever exposed.
- Keep rate limits and request validation in the backend/serverless function to reduce misuse.
