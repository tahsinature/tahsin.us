import { Client } from "@notionhq/client";
import config from "@server/config";

const cmsClient = new Client({ auth: config.cms.token });

export default cmsClient;
