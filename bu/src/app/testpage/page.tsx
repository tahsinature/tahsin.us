import fs from "fs";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const Page = () => {
  const currentDir = fs.readdirSync("./src/app/testpage");
  const totalPath = currentDir.map((path) => {
    return path.replace(".tsx", "");
  });

  return (
    <Navbar>
      <NavbarContent className="flex flex-wrap gap-4" justify="center">
        {totalPath.map((path) => {
          return (
            <NavbarItem key={path}>
              <Link color="foreground" href={`/testpage/${path}`}>
                {path}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>
    </Navbar>
  );
};

export default Page;
