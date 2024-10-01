"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import UserAvatar from "./UserAvatar";
import SigninButton from "./SigninButton";

export default function Navbar() {
  const isAuthenticated = true;
  // console.log("is authenticated: " + isAuthenticated);

  return (
    <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between items-center">
      <Link href={"/"}>Saqib APIs</Link>
      {isAuthenticated ? <UserAvatar /> : <SigninButton />}
    </div>
  );
}

// export default Navbar;
