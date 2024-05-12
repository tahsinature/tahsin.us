import { Avatar } from "@nextui-org/react";
import moment from "moment";
import * as React from "react";

export default function Home() {
  return (
    <div className="text-center m-auto">
      <Avatar className="m-auto" />
      <h1 className="text-xl font-bold">Mohammad Tahsin</h1>
      <p className="text-sm">Software Engineer</p>

      <p className="text-justify mt-5 text-sm">
        I am a solutions-oriented person who enjoys being challenged and engaged with projects that require me to work outside my comfort and knowledge set & a passionate and pragmatic programmer with{" "}
        {moment.duration(moment().diff(moment().set("year", 2018).startOf("year"))).humanize()} of professional experience, specializing in microservices & full-stack development using modern & robust technologies. Sometimes I work on things I find
        interesting, or things I think other people might find interesting. It’s nice when those things overlap.
      </p>
    </div>
  );
}
