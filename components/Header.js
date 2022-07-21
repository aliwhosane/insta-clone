import React from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";

function header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className="shadow-sm border-b  bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl  mx-5  xl:mx-auto">
        {/* left */}
        <div className="relative hidden lg:inline-grid w-24">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* middle */}
        <div className="max-w-xs">
          <div className="mt-1 relative p-3 rounder-md ">
            <div className="absolute inset-y-0  pl-3 flex  items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* right */}
        <div className="flex items-center justify-end space-x-4">
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          {session ? (
            <>
              <HomeIcon className="navBtn" />
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn  rotate-45" />
                <div className="absolute -top-2 -right-3 text-xs rounded-full bg-red-500 flex items-center justify-center w-5 h-5 text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <img
                onClick={() => signOut()}
                src={session?.user?.image || faker.image.avatar()}
                alt=""
                className="h-10 w-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button className="text-sm text-blue-400" onClick={signIn}>
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default header;
