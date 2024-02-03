import { WorkPlace } from "@/types";

export const getWorkPlaces = async (): Promise<WorkPlace[]> => {
  return [
    {
      timeRange: "Jun 2023 - Present",
      company: "CARFAX",
      position: "Software Engineer",
      logo: "images.logogs.work.carfax",
      url: "https://carfax.com/",
      location: "Ontario, Canada",
      specialization: "Java, AWS, React",
    },
    {
      timeRange: "Jun 2022 - May 2023",
      company: "EnPowered",
      position: "FullStack Engineer",
      logo: "images.logogs.work.enpowered",
      url: "getenpowered.com",
      location: "Ontario, Canada",
      specialization: "AWS, JavaScript",
    },
    {
      timeRange: "Feb 2022 - Jun 2022",
      company: "Rakuten Travel Xchange",
      position: "FullStack Engineer",
      logo: "images.logogs.work.rtx",
      url: "https://solutions.travel.rakuten.com/",
      location: "Singapore (Remote)",
      specialization: "Express, Vue 3",
    },
    {
      timeRange: "Jul 2021 - Jan 2022",
      company: "Bountie",
      position: "FullStack Engineer",
      logo: "images.logogs.work.bountie.justLogo",
      url: "https://www.bountie.io/",
      location: "Singapore (Remote)",
      specialization: "Go, Node.js, TypeScript",
    },
    {
      timeRange: "Jul 2021 - Present",
      company: "TerasWork",
      position: "FullStack Engineer",
      logo: "images.logogs.work.teras",
      url: "http://www.history.com",
      location: "Indonesia (Remote)",
      specialization: "Go, React",
    },
    {
      timeRange: "Feb 2019 - Jun 2021",
      company: "HaloJasa",
      position: "Sr. Software Engineer",
      logo: "images.logogs.work.halojasa",
      url: "https://halojasa.com/",
      location: "Indonesia",
      specialization: "Microservices, TypeScript, gRPC",
    },
  ];
};
