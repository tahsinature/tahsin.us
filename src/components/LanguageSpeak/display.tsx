"use client";

import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import clsx from "clsx";

import { Language } from "@/types";
import classes from "./display.module.scss";

const Effect = (props: { mainText: string; trnaslationText?: string; onDone: () => void }) => {
  const [showTranslation, toggleTranslation] = useState(false);

  return (
    <>
      <div>
        <TypeAnimation
          className="font-black text-[1.5rem]"
          sequence={[
            100,
            props.mainText,
            1000,
            () => {
              if (props.trnaslationText) toggleTranslation(true);
              else props.onDone();
            },
          ]}
          repeat={0}
          cursor={false}
        />
      </div>

      <div className="mt-4">
        {showTranslation && props.trnaslationText && (
          <TypeAnimation
            className="italic text-[16px] font-light"
            sequence={[
              props.trnaslationText,
              2000,
              () => {
                props.onDone();
              },
            ]}
            repeat={0}
            cursor={false}
          />
        )}
      </div>
    </>
  );
};

const Display = (props: { languages: Language[] }) => {
  const [language, setLanguage] = useState(props.languages[0]);
  const [showLanguage, setLanguageShow] = useState(true);

  const refreshLanguage = (option: { nextLanguage?: Language | undefined; progress?: string | undefined; finishedLanguage?: Language | undefined }) => {
    setLanguageShow(false);

    let nextLanguage = option.nextLanguage;

    if (!nextLanguage) {
      const index = props.languages.findIndex((lang) => lang.id === language.id);
      nextLanguage = props.languages[index + 1] || props.languages[0];
    }

    setLanguage(nextLanguage);

    setTimeout(() => setLanguageShow(true));
  };

  return (
    <>
      <p>test</p>
      <div className="h-[8rem] pt-5 ml-10">{showLanguage && <Effect mainText={language.subOnLang} trnaslationText={language.subOnEng} onDone={() => refreshLanguage({})} />}</div>

      <div className={classes.Line}>
        {props.languages.map((ele, index) => (
          <div className={classes.LineSingleLang} key={ele.id}>
            <p
              onClick={() => refreshLanguage({ nextLanguage: ele })}
              className={clsx({
                [classes.Active]: ele.id === language.id,
              })}
            >
              {ele.name}
            </p>
            {index === props.languages.length - 1 ? null : <span>/</span>}
          </div>
        ))}
      </div>
    </>
  );
};

export default Display;
