# ElevenLabs Setup Plan

This site should not call ElevenLabs directly from GitHub Pages frontend code.

## Key Requirements

- Do not put the ElevenLabs API key in frontend JavaScript, HTML, CSS, or any other public file.
- Store the ElevenLabs key as a private environment variable named `ELEVENLABS_API_KEY`.
- Add a secure backend or serverless function later to make ElevenLabs API requests.
- The website's Listen button can call that secure backend later instead of calling ElevenLabs from the browser.
- Choose and save a `voice_id` from ElevenLabs for the affirmation voice that should be used.

## Future Flow

1. User clicks the website's Listen button.
2. Frontend sends the affirmation text to a secure backend/serverless endpoint.
3. Backend reads `ELEVENLABS_API_KEY` from private environment variables.
4. Backend calls ElevenLabs with the selected `voice_id`.
5. Backend returns playable audio to the website.
