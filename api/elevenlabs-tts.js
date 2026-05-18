const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";
const DEFAULT_MODEL_ID = "eleven_multilingual_v2";
const DEFAULT_OUTPUT_FORMAT = "mp3_44100_128";
const MAX_AFFIRMATION_LENGTH = 700;

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(payload));
}

function getRequestText(body) {
  if (typeof body?.text === "string") {
    return body.text.trim();
  }

  if (typeof body === "string") {
    try {
      const parsedBody = JSON.parse(body);
      return typeof parsedBody.text === "string" ? parsedBody.text.trim() : "";
    } catch (error) {
      return "";
    }
  }

  return "";
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error: "Only POST requests can create affirmation audio." });
    return;
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const modelId = process.env.ELEVENLABS_MODEL_ID || DEFAULT_MODEL_ID;
  const outputFormat = process.env.ELEVENLABS_OUTPUT_FORMAT || DEFAULT_OUTPUT_FORMAT;

  if (!apiKey || !voiceId) {
    sendJson(response, 500, {
      error: "Affirmation audio is not configured yet. Add ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID on the server."
    });
    return;
  }

  const text = getRequestText(request.body);

  if (!text) {
    sendJson(response, 400, { error: "Please choose an affirmation before requesting audio." });
    return;
  }

  if (text.length > MAX_AFFIRMATION_LENGTH) {
    sendJson(response, 400, { error: "This affirmation is too long to read aloud right now." });
    return;
  }

  try {
    const elevenLabsResponse = await fetch(
      `${ELEVENLABS_API_URL}/${encodeURIComponent(voiceId)}?output_format=${encodeURIComponent(outputFormat)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          voice_settings: {
            stability: 0.62,
            similarity_boost: 0.78,
            style: 0.18,
            use_speaker_boost: true
          }
        })
      }
    );

    if (!elevenLabsResponse.ok) {
      let details = "ElevenLabs could not create audio for this affirmation.";

      try {
        const errorData = await elevenLabsResponse.json();
        details = errorData?.detail?.message || errorData?.detail || errorData?.message || details;
      } catch (error) {
        // Keep the friendly fallback if ElevenLabs returns a non-JSON error.
      }

      sendJson(response, elevenLabsResponse.status, { error: details });
      return;
    }

    const audioBuffer = Buffer.from(await elevenLabsResponse.arrayBuffer());

    response.statusCode = 200;
    response.setHeader("Content-Type", elevenLabsResponse.headers.get("content-type") || "audio/mpeg");
    response.setHeader("Cache-Control", "no-store");
    response.end(audioBuffer);
  } catch (error) {
    sendJson(response, 502, { error: "Audio could not be generated right now. Please try again soon." });
  }
};
