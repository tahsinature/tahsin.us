import Code from "@/app/tools/Code";
import Tags from "@/components/Blog/Tags";
import LanguageSpeak from "@/components/LanguageSpeak/LanguageSpeak";
import services from "@/services";
import { Tool } from "@/types";

const CategoryBlock = ({ tool }: { tool: Tool }) => {
  return (
    <div className="rounded-sm overflow-hidden border">
      <div className="bg-[rgba(0,0,0,0.1)] px-2 py-3">
        <p className="text-sm">{tool.categoryName}</p>
      </div>

      <div className="px-2 py-4">
        <Tags tags={tool.tags} />
      </div>
    </div>
  );
};

const Page = async () => {
  const programmingLanguages = await services.notionDbCalls.programmingLanguage.getProgrammingLanguages();
  const tools = await services.notionDbCalls.toolsIUse.getCategories();

  return (
    <div>
      <div>
        <div className="divider mb-10">
          <h2 className="text-lg">Programming Languages</h2>
        </div>

        <Code programmingLanguage={programmingLanguages} />

        <div className="mt-5">
          <p className="text-sm text-center">All the technologies, frameworks and tools I use mostly are based on these languages.</p>
        </div>
      </div>

      <div className="mt-20">
        <div className="mb-10">
          <div className="divider">
            <h2 className="text-lg">Langaugee I speak</h2>
          </div>
        </div>

        <LanguageSpeak />
      </div>

      <div className="mt-20">
        <div className="mb-10">
          <div className="divider">
            <h2 className="text-lg">Tools I Use</h2>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">{tools.map((tool) => tool.tags.length > 0 && <CategoryBlock key={tool.categoryName} tool={tool} />)}</div>
      </div>
    </div>
  );
};

export default Page;
