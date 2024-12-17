// pages/api/uploadAudio.ts
export const uploadAudio = async (audioBlob: { blob: Blob }, selectedLanguage: string) => {
    const formData = new FormData();
    formData.append("file", audioBlob.blob, "recording.mp3");
    formData.append("target_language", selectedLanguage);
  
    try {
      const response = await fetch(`${process.env.BE_API}/transcribe-and-translate`, {
        method: "POST",
        body: formData,
      });
      const { transcription, translation } = await response.json();
      return { transcription, translation };
    } catch (error) {
      throw error;
    }
  };