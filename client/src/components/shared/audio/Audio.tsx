const AudioReader = () => {
  /* // Welcome to AssemblyAI! Get started with the API by transcribing
  // a file using JavaScript.
  //
  // In this example, we'll transcribe a local file. Get started by
  // downloading the snippet, then update the 'filename' variable
  // to point to the local path of the file you want to upload and
  // use the API to transcribe.
  //
  // IMPORTANT: Update line 100 to point to a local file.
  //
  // Have fun!

  const fs = require("fs");

  // Your API token is already set in this variable
  const API_TOKEN = "efcbd72b3faf4c129aec026e3e65c699";

  // Function to upload a local file to the AssemblyAI API
  async function upload_file(api_token, path) {
    console.log(`Uploading file: ${path}`);

    // Read the file data
    const data = fs.readFileSync(path);
    const url = "https://api.assemblyai.com/v2/upload";

    try {
      // Send a POST request to the API to upload the file, passing in the headers and the file data
      const response = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/octet-stream",
          Authorization: api_token,
        },
      });

      // If the response is successful, return the upload URL
      if (response.status === 200) {
        const responseData = await response.json();
        return responseData["upload_url"];
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return null;
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      return null;
    }
  }

  // Async function that sends a request to the AssemblyAI transcription API and retrieves the transcript
  async function transcribeAudio(api_token, audio_url) {
    console.log("Transcribing audio... This might take a moment.");

    // Set the headers for the request, including the API token and content type
    const headers = {
      authorization: api_token,
      "content-type": "application/json",
    };

    // Send a POST request to the transcription API with the audio URL in the request body
    const response = await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      body: JSON.stringify({ audio_url }),
      headers,
    });

    // Retrieve the ID of the transcript from the response data
    const responseData = await response.json();
    const transcriptId = responseData.id;

    // Construct the polling endpoint URL using the transcript ID
    const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

    // Poll the transcription API until the transcript is ready
    while (true) {
      // Send a GET request to the polling endpoint to retrieve the status of the transcript
      const pollingResponse = await fetch(pollingEndpoint, { headers });
      const transcriptionResult = await pollingResponse.json();

      // If the transcription is complete, return the transcript object
      if (transcriptionResult.status === "completed") {
        return transcriptionResult;
      }
      // If the transcription has failed, throw an error with the error message
      else if (transcriptionResult.status === "error") {
        throw new Error(`Transcription failed: ${transcriptionResult.error}`);
      }
      // If the transcription is still in progress, wait for a few seconds before polling again
      else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  }

  // Upload a file and create a transcript using the AssemblyAI API
  async function main() {
    console.log("Welcome to AssemblyAI!");

    // -----------------------------------------------------------------------------
    // Update the file path here, pointing to a local audio or video file.
    // If you don't have one, download a sample file: https://storage.googleapis.com/aai-web-samples/espn-bears.m4a
    // You may also remove the upload step and update the 'audio_url' parameter in the
    // 'transcribeAudio' function to point to a remote audio or video file.
    // -----------------------------------------------------------------------------
    const path = "./espn-bears.m4a";
    const uploadUrl = await upload_file(API_TOKEN, path);

    // If the upload fails, log an error and return
    if (!uploadUrl) {
      console.error(new Error("Upload failed. Please try again."));
      return;
    }

    // Transcribe the audio file using the upload URL
    const transcript = await transcribeAudio(API_TOKEN, uploadUrl);

    // Print the completed transcript object
    console.log("Transcript:", transcript.text);
  }
 */
  /* main(); */
  return (
    <div>
      <input type="file" accept="audio/*" />
    </div>
  );
};

export default AudioReader;
