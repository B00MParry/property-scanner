import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-900 shadow">
      <div className="w-full max-w-screen-xl mx-auto p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/">
            <span className="text-white self-center mb-4 block md:mb-0 md:ml-2 font-display text-2xl whitespace-nowrap tracking-wider">
            ☄️ Property Scanner
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-4 text-sm font-medium text-white sm:mb-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-4 border-gray-300 sm:mx-auto" />
        <span className="block text-sm text-white sm:text-center">
          © 2023 <span className="hover:underline">Property Scanner™</span>. All Rights
          Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
