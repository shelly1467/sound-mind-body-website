exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: "Method Not Allowed"
    };
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey || !voiceId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "ElevenLabs environment variables are missing." })
    };
  }

  let text = "";

  try {
    const body = JSON.parse(event.body || "{}");
    text = String(body.text || "").trim();
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body." })
    };
  }

  if (!text) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing affirmation text." })
    };
  }

  try {
    const elevenLabsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!elevenLabsResponse.ok) {
      const errorText = await elevenLabsResponse.text();
      return {
        statusCode: elevenLabsResponse.status,
        body: JSON.stringify({ error: "ElevenLabs request failed.", details: errorText })
      };
    }

    const audioBuffer = Buffer.from(await elevenLabsResponse.arrayBuffer());

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store"
      },
      body: audioBuffer.toString("base64"),
      isBase64Encoded: true
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to generate affirmation audio." })
    };
  }
};
