import logo from "../../../public/logo.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src={logo} alt="Mood Sync Logo" height={60} width={60} />
        </Link>

        <span className=" w-0 h-0 opacity-0 sm:text-xl sm:w-max  sm:opacity-100 sm:h-max  font-bold">
          Curated playlists based on your mood
        </span>
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
