const extractJson = async (text) => {
    if (!text) return null;

    const cleanedText = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    const firstbrace = cleanedText.indexOf("{");
    const lastbrace = cleanedText.lastIndexOf("}");

    if (firstbrace === -1 || lastbrace === -1) {
        return null;
    }

    const jsonString = cleanedText.slice(firstbrace, lastbrace + 1);

    try {
        return JSON.parse(jsonString);
    } catch (err) {
        return null;
    }
};

export default extractJson;