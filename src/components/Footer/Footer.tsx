import { GithubIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="container pb-5 mt-20">
      {/* ========== Mobile Side Bar Footer Start========= */}

      <h3>Tahsin</h3>
      <div className="mb-4">
        <small>
          Software Engineer at{" "}
          <a href="https://www.carfax.com" target="_blank" rel="noreferrer">
            CARFAX
          </a>
        </small>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <Link href="https://github.com/tahsinature" target="_blank" rel="noreferrer">
            <GithubIcon />
          </Link>
          <Link href="https://github.com/tahsinature" target="_blank" rel="noreferrer">
            <GithubIcon />
          </Link>
          <Link href="https://github.com/tahsinature" target="_blank" rel="noreferrer">
            <GithubIcon />
          </Link>
        </div>
        <div>Sign</div>
      </div>

      <hr className="my-6 border-gray-300" />
      <div className="w-full text-center">
        <small className="mt-8 text-gray-600">All rights reserved © Tahsin {new Date().getFullYear()}</small>
      </div>

      {/* ========== Mobile Side Bar Footer End ========= */}
    </div>
  );
};

export default Footer;
