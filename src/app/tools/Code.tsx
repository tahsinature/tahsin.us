"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import Screen from "@/components/Tools/Screen/Screen";
import Terminal from "@/components/Tools/Terminal";
import { Button } from "@/components/ui/button";
import { ProgrammingLanguage } from "@/types";

type Line = {
  text: string;
  noPrompt?: boolean;
};

type Language = {
  name: string;
  program: string;
  lines: Line[];
  logo: string;
  output: string;
};

const Code = ({ programmingLanguage }: { programmingLanguage: ProgrammingLanguage[] }) => {
  const [language, setLanguage] = useState<ProgrammingLanguage | null>(programmingLanguage[0]);
  const [loading, setLoading] = useState(true);

  const handleChange = (language: ProgrammingLanguage) => {
    setLanguage(null);
    setLoading(true);
    setTimeout(() => {
      setLanguage(language);
    });
  };

  return (
    <div>
      <div>
        <div className="mb-3 flex gap-2 flex-wrap">
          {programmingLanguage.map((l) => (
            <Button key={l.name} onClick={() => handleChange(l)} variant={"outline"} className={clsx({ "border-green-400": language && language.name === l.name }, "border-2")}>
              <Image src={l.logo[0]} alt={l.name} width={20} height={20} className="mr-2" />
              {l.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="font-mono text-sm">
        {language && <div className="w-full">{loading ? <Terminal onEnd={() => setLoading(false)} lines={JSON.parse(language.code)} /> : <Screen windowName={language.program} isLoading={loading} output={language.output} />}</div>}
      </div>
    </div>
  );
};

export default Code;
