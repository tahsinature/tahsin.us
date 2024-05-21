import { Keyframes, Frame } from "./react-keyframes";
import { useState } from "react";

const sleepDuration = 200;

const getTypingDuration = ({ min = 40, max = 120 } = {}) => min + (max - min) * Math.random();

type Line = {
  text: string;
  noPrompt?: boolean;
  noCaret?: boolean;
};

const Line = ({ text, noPrompt = false, noCaret = false }: { text?: string; noPrompt?: boolean; noCaret?: boolean }) => {
  return (
    <>
      {!noPrompt && <span>{`$ `}</span>}
      {text}
      {!noCaret && <span className="bg-[#F81CE5] inline-block w-2 h-4 relative bottom-[1px] align-middle" />}
    </>
  );
};

const Terminal = ({ onEnd, lines }: { onEnd: () => void; lines: Line[] }) => {
  const [lineCount, setLineCount] = useState(0);

  const handleLineEnd = () => {
    setLineCount((c) => c + 1);

    if (lineCount === lines.length - 1) {
      setTimeout(() => {
        onEnd();
      }, 1000);
    }
  };

  const renderLine = (line: Line) => {
    const frames = [];

    if (!line.noPrompt) {
      // starting frame
      frames.push(
        <Frame duration={sleepDuration} key={`${line.text}-first`}>
          <Line />
        </Frame>
      );

      // typing out the line
      for (let i = 0; i < line.text.length; i++) {
        const isLastLetter = i === line.text.length - 1;
        const duration = isLastLetter ? sleepDuration : getTypingDuration({ max: 50 });
        frames.push(
          <Frame duration={duration} key={`${line.text}-${i}`}>
            <Line text={line.text.slice(0, i + 1)} noCaret={line.noPrompt} noPrompt={line.noPrompt} />
          </Frame>
        );
      }

      // ending frame
      frames.push(
        <Frame key={`${line.text}-last`}>
          <Line text={line.text} noCaret noPrompt={line.noPrompt} />
        </Frame>
      );
    } else {
      frames.push(
        <Frame key={`${line.text}-last`}>
          <Line text={line.text} noCaret noPrompt={line.noPrompt} />
        </Frame>
      );
    }

    return (
      <Keyframes component="p" onEnd={handleLineEnd}>
        {frames}
      </Keyframes>
    );
  };

  const getRenderedLines = () => {
    const renderedLines = [];

    for (let i = 0; i <= lineCount; i++) {
      if (lines[i]) renderedLines.push(<div key={i}>{renderLine(lines[i])}</div>);
    }

    return renderedLines;
  };

  return (
    <div className={"overflow-hidden transition-all"}>
      <div className="bg-[#F2F2D1] dark:bg-[#191723] min-h-[200px] border leading-[1.5] text-sm whitespace-pre-wrap break-all rounded-sm flex flex-col relative">
        <div className={"h-[34px] sm:h-[28px] flex items-center text-center"}>
          <span className="w-[10px] sm:w-[12px] h-[10px] sm:h-[12px] rounded-lg inline-block bg-[#FF5F56] ml-3" />
          <span className="w-[10px] sm:w-[12px] h-[10px] sm:h-[12px] rounded-lg inline-block bg-[#FFBD2E] ml-2" />
          <span className="w-[10px] sm:w-[12px] h-[10px] sm:h-[12px] rounded-lg inline-block bg-[#27C93F] ml-2" />
        </div>
        <div className={"p-[12px] flex-1"}>{getRenderedLines()}</div>
      </div>
    </div>
  );
};

export default Terminal;
