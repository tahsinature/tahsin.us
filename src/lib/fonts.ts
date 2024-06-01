import { Acme, Angkor, Fira_Sans as NormalText, VT323 as CalculatorText } from "next/font/google";
import { Edu_TAS_Beginner as PickUpLineText } from "next/font/google";

const normalText = NormalText({ weight: ["400"], subsets: ["latin"] });
const openSourceHeader = Angkor({ weight: ["400"], subsets: ["latin"] });
const openSourceProjectTitle = Acme({ weight: ["400"], subsets: ["latin"] });
const pickUpLine = PickUpLineText({ weight: ["400"], subsets: ["latin"] });
const calculatorFont = CalculatorText({ weight: ["400"], subsets: ["latin"] });

// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

const fonts = {
  // fontHeader: Angkor({ weight: ["400"], subsets: ["latin"] }),
  // fontProjectTitle: Acme({ weight: ["400"], subsets: ["latin"] }),
  normalText,
  calculatorFont,
  pageSpecific: {
    openSource: {
      fontHeader: openSourceHeader,
      fontProjectTitle: openSourceProjectTitle,
    },
    home: {
      pickUpLine,
    },
  },
};

export default fonts;
