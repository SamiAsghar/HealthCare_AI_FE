// pages/api/playTranslation.ts
export const playTranslation = async (translation: string, ) => {
    try {
      const response = await fetch(`${process.env.BE_API}/text-to-speech`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: translation,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to play translation");
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  };