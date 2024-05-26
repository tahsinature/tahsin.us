import Link from "next/link";
import { Twitter, Instagram, Facebook, Youtube, GitHub, Mail } from "react-feather";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import SignatureSVG from "@/components/SVGs/SignatureSVG";

const borderColor = {
  light: "border-gray-200",
  dark: "border-gray-800",
};
const Footer = () => {
  return (
    <div className={`py-5 mt-5 ${borderColor.light} dark:${borderColor.dark} border-t-2`}>
      <div className="container">
        <div className="flex sm:flex-row flex-col items-center justify-around">
          <div>
            <h3>Tahsin</h3>
            <div className="mb-4">
              <small>
                Software Engineer at{" "}
                <a href="https://www.carfax.com" target="_blank" rel="noreferrer">
                  CARFAX
                </a>
              </small>
              <SignatureSVG className="mt-2" />
            </div>
          </div>

          <div className="sm:mt-auto mt-2 mb-3 sm:w-auto w-full">
            <ul className=" flex justify-center md:gap-2 gap-4">
              <Button className="py-1 px-2" size={"sm"} variant={"ghost"}>
                <GitHub size={"1rem"} />
              </Button>
              <Button className="py-1 px-2 hover:text-[#FF0000]" size={"sm"} variant={"ghost"}>
                <Youtube size={"1rem"} />
              </Button>
              <Button className="py-1 px-2 hover:text-[#4267B2]" size={"sm"} variant={"ghost"}>
                <Facebook size={"1rem"} />
              </Button>
              <Button className="py-1 px-2 hover:text-[#E1306C]" size={"sm"} variant={"ghost"}>
                <Instagram size={"1rem"} />
              </Button>
              <Button className="py-1 px-2 hover:text-[#1DA1F2]" size={"sm"} variant={"ghost"}>
                <Twitter size={"1rem"} />
              </Button>
            </ul>
            <Link href="mailto:hello@tahsin.us">
              <Button className="w-full sm:mt-2 mt-5 text-[0.7rem]" variant={"outline"}>
                <Mail size={"1rem"} className="mr-2" />
                hello@tahsin.us
              </Button>
            </Link>
            <Image src="/favicon.ico" alt="hero" width={500} height={500} className="w-[50px] h-[50px] object-cover mt-3 m-auto border-solid border-2  duration-1000 hover:border-gray-400 border-transparent rounded-[50px]" />
          </div>
        </div>

        <div className="w-full text-center sm:mt-5 mt-0">
          <small className="mt-8 text-gray-600">All rights reserved © Tahsin {new Date().getFullYear()}</small>
        </div>
      </div>
    </div>
  );
};

export default Footer;
