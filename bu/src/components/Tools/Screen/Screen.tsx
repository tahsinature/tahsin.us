// import Marquee from "react-fast-marquee";
import clsx from "clsx";
import moment from "moment";

import "./font.css";

const CodeRunner = ({ windowName, output }: { windowName: string; output: string }) => {
  return (
    <div className="window bg-white rounded-sm w-[90%] h-[50%] flex flex-col justify-start items-center relative overflow-hidden">
      <div className="bg-gray-200 w-full">
        <p className="text-sm text-center text-red-700">{windowName}</p>
      </div>
      <div className="flex justify-center items-center h-full px-1 py-5">
        {/* <Marquee gradient={false} speed={40} loop={1} delay={2} pauseOnHover={true}> */}
        <p className="text-red-700">{output}</p>
        {/* </Marquee> */}
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="window bg-[rgba(255,255,255,0.5)]  rounded-sm w-[50%] h-[50%] flex justify-center items-center relative overflow-hidden p-1 py-3">
      <p>⌛︎</p>
    </div>
  );
};

const Screen = ({ windowName, isLoading, output }: { windowName: string; isLoading: boolean; output: string }) => {
  const bgColor = "bg-[#414141] dark:bg-[#bfbfbf] text-white";

  return (
    <div className="screen h-full border rounded-sm overflow-hidden flex flex-col font-[chi]">
      <menu className={clsx(bgColor, "px-2 py-1 border-b-1")}>
        <li className="inline pl-2"></li>
        <li className="inline pl-2 float-right">
          <time dateTime="">{moment().format("HH:mm")}</time>
        </li>
      </menu>

      <div className={clsx("desktop flex justify-center items-center grow py-4", bgColor)}>{isLoading ? <Loading /> : <CodeRunner windowName={windowName} output={output} />}</div>
    </div>
  );
};

export default Screen;
