import { Acme, Angkor, Fira_Sans as NormalText } from "next/font/google";

const normalText = NormalText({ weight: ["400"], subsets: ["latin"] });
const openSourceHeader = Angkor({ weight: ["400"], subsets: ["latin"] });
const openSourceProjectTitle = Acme({ weight: ["400"], subsets: ["latin"] });

const fonts = {
  // fontHeader: Angkor({ weight: ["400"], subsets: ["latin"] }),
  // fontProjectTitle: Acme({ weight: ["400"], subsets: ["latin"] }),
  normalText,
  pageSpecific: {
    openSource: {
      fontHeader: openSourceHeader,
      fontProjectTitle: openSourceProjectTitle,
    },
  },
};

export default fonts;
