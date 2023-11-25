import logo from "../../../public/logo.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavProps {
  sticky: boolean;
}

export const Nav = ({ sticky }: NavProps) => {
  const router = useRouter();

  const reset = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <nav className={` w-full z-20 top-0 start-0 ${sticky && "fixed"}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={logo}
            alt="logo of mood sync "
            height={60}
            width={60}
            className="animate-fadeIn"
          />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
          <button
            onClick={reset}
            type="button"
            className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset Playlist
          </button>
        </div>
      </div>
    </nav>
  );
};
