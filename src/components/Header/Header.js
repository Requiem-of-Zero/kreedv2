import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../public/static/images/kreed_logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`bg-gradient-to-t ${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <Image
            src={logo}
            width={100}
            height={100}
            className="cursor-pointer object-contain"
            alt="kreed homepage logo"
          />
        </Link>
        <ul className="hidden space-x-4 md:flex">
          <li className="header__link">
            <Link href="/">Home</Link>
          </li>
          <li className="header__link">
            <Link href="/tv-shows" replace>
              TV Shows
            </Link>
          </li>
          <li className="header__link">
            <Link href="/movies" replace>
              Movies
            </Link>
          </li>
          <li className="header__link">
            <Link href="/trending" replace>
              New & Popular
            </Link>
          </li>
          <li className="header__link">
            <Link href="/my-list" replace>
              My List
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline cursor-pointer" />
        <p className="hidden lg:inline cursor-pointer">Kids</p>
        <BellIcon className="h-6 w-6 sm:inline" />
        {/* <Link href="/account"> */}
        <Image
          src="https://i.pinimg.com/474x/9e/0f/10/9e0f1095b31b781b3a3c5f87461724bd.jpg"
          width={30}
          height={30}
          className="cursor-pointer rounded"
          alt="demo profile image"
          onClick={() => logout()}
        />
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Header;
