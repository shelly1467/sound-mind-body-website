# Sound Mind & Body Website

A simple website for adding YouTube affirmation videos.

## ElevenLabs affirmation audio

The homepage affirmation result card includes a “Listen to This Affirmation” button that calls the local `/api/elevenlabs-tts` serverless function. Keep the ElevenLabs API key on the server only; do not place it in `script.js` or any browser-exposed file.

Set these environment variables in your hosting provider before deploying the audio feature:

- `ELEVENLABS_API_KEY` — required. Your ElevenLabs API key.
- `ELEVENLABS_VOICE_ID` — required. The ElevenLabs voice ID to read affirmations.
- `ELEVENLABS_MODEL_ID` — optional. Defaults to `eleven_multilingual_v2`.
- `ELEVENLABS_OUTPUT_FORMAT` — optional. Defaults to `mp3_44100_128`.

The serverless function posts the current topic and affirmation text to ElevenLabs text-to-speech and returns an MP3 file to the browser for in-page playback.
