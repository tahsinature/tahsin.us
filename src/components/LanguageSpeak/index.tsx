import React from "react";
import { Fira_Sans } from "next/font/google";
import clsx from "clsx";
import Display from "@/components/LanguageSpeak/display";
import { Language } from "@/types";

const fira_sans = Fira_Sans({ subsets: ["latin"], weight: ["400", "700"] });

const dummyData: Language[] = [
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

const HumanLanguages = () => {
  return (
    <div className={clsx(fira_sans.className)}>
      <Display languages={dummyData} />
    </div>
  );
};

export default HumanLanguages;
