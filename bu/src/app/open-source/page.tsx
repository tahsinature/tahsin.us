import services from "@/services";
import { Card, CardFooter, Image } from "@nextui-org/react";
import clsx from "clsx";
import fonts from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { Kbd } from "@nextui-org/react";
import Tags from "@/components/Blog/Tags";

const OpenSource = async () => {
  const projects = await services.notionDbCalls.projects.getProjects();
  const thingsIHaveCreated = projects.filter((project) => {
    return project.types.some((type) => type.name.toLowerCase().includes("creation"));
  });

  const hobbyProjects = projects.filter((project) => {
    return project.types.some((type) => type.name.toLowerCase().includes("hobby"));
  });

  const impacts = projects.filter((project) => {
    return project.types.some((type) => type.name.toLowerCase().includes("impact"));
  });

  const HobbyProject = () => (
    <>
      <h2 className={clsx(fonts.pageSpecific.openSource.fontHeader.className, "text-center my-10 text-lg")}>Some Hobby Projects</h2>
      <div className="flex gap-5 justify-evenly flex-wrap">
        {hobbyProjects.map((project) => (
          <div key={project.id} className="w-[200px] flex flex-col items-center group cursor-pointer">
            <Image alt={`${project.name} preview`} className="object-cover rounded-sm border group-hover:border-green-600 h-full" src={project.preview[0]} />
            <p className={clsx("mt-2 group-hover:text-green-600 transition-all", fonts.pageSpecific.openSource.fontProjectTitle.className)}>{project.name}</p>
          </div>
        ))}
      </div>
    </>
  );

  const ImpactProject = () => (
    <>
      <h2 className={clsx(fonts.pageSpecific.openSource.fontHeader.className, "text-center my-10 text-lg")}>Other impacts in the community</h2>
      <ul>
        {impacts.map((project) => (
          <li key={project.id} className="flex items-start border-b last:border-none py-2">
            <div>
              <Tags tags={project.tags} />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, magni. Delectus, sapiente.
                {project.name}
                <span className="ml-2">
                  {project.links.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="text-[12px]">
                      <Button size="sm" variant={"outline"}>
                        {link.name}
                      </Button>
                    </a>
                  ))}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div>
      <h2 className={clsx(fonts.pageSpecific.openSource.fontHeader.className, "text-center my-10 text-lg")}>{"Things I've created"}</h2>
      <p className="mb-3">The things I have created completely on my own.</p>
      <ul className="list-disc list-inside">
        {thingsIHaveCreated.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>

      <hr className="mt-10" />

      <h2 className={clsx(fonts.pageSpecific.openSource.fontHeader.className, "text-center my-10 text-lg")}>Contribution</h2>
      <p>The things I have contributed to.</p>
      <ul>
        <li>a</li>
        <li>b</li>
        <li>c</li>
      </ul>

      <hr className="mt-10" />

      <HobbyProject />

      <hr className="mt-10" />

      <ImpactProject />
    </div>
  );
};

export default OpenSource;

export const dynamic = "force-dynamic";
