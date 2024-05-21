import Image from "next/image";
import Link from "next/link";

const Page1 = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center grow">
      <h1 className="text-9xl font-extrabold  tracking-widest">404</h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">Page Not Found</div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link href="/">Go Home</Link>
          </span>
        </a>
      </button>
    </div>
  );
};

const Page2 = () => {
  return (
    <div className=" grow px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
      <div className="wf-ull lg:w-1/2">
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Page not found</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesn&apos;t exist.</p>

        <div className="flex items-center mt-6 gap-x-3">
          <Link href="/">
            <button className="px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">Take me home</button>
          </Link>
        </div>
      </div>

      <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
        <Image src="/svg/404-page-2.svg" alt="illustration" width={500} height={500} />
      </div>
    </div>
  );
};

const NotFound = () => {
  const pages = [Page1, Page2];
  const randomPage = pages[Math.floor(Math.random() * pages.length)];

  return randomPage();
};

export default NotFound;
