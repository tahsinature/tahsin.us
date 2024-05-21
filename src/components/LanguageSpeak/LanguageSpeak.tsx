import React from "react";
import { Fira_Sans } from "next/font/google";
import clsx from "clsx";

import Display from "@/components/LanguageSpeak/display";
import services from "@/services";

const fira_sans = Fira_Sans({ subsets: ["latin"], weight: ["400", "700"] });

const LanguageSpeak = async () => {
  const dummyData = await services.language.getSpeakingLanguage();

  return (
    <div className={clsx(fira_sans.className)}>
      <Display languages={dummyData} />
    </div>
  );
};

export default LanguageSpeak;
