import { Language } from "@/types";

export const getSpeakingLanguage = async (): Promise<Language[]> => {
  return [
    {
      id: "1",
      name: "English",
      subOnLang: "I'm pretty fluent in English.",
    },
    {
      id: "2",
      name: "Arabic",
      subOnLang: "أنا أتكلم العربية بطلاقة.",
      subOnEng: "I'm pretty fluent in Arabic.",
    },
    {
      id: "3",
      name: "Bengali",
      subOnLang: "আমি বাংলা ভাষায় খুব ভাল বলতে পারি।",
      subOnEng: "I'm pretty fluent in Bengali.",
    },
    {
      id: "4",
      name: "Tamil",
      subOnLang: "நான் தமிழில் மிகவும் தெரியும்.",
      subOnEng: "I'm pretty fluent in Tamil.",
    },
  ];
};
