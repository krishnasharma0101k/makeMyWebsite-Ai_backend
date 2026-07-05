const extractJson = async (text) => {
    if (!text) {
        return
}

    const cleanedText = text    
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

     const firstbrace = cleanedText.indexOf("{");
     const secondbrace = cleanedText.lastIndexOf("}");
     if (firstbrace === -1 || secondbrace === -1) {
        return null

        const jsonString = cleanedText.slice(firstbrace, secondbrace + 1);
        return JSON.parse(jsonString);
     }
}

export default extractJson;