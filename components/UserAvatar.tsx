"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { MyInfoDto } from "@/models/MyInfoDto";
import { SaqibAPIsClient } from "@/axios/SaqibAPIsClient";
import MyInfoCard from "./MyInfoCard";
import { extractInitials } from "@/lib/userHelper";

function UserAvatar() {
  const [userPhoto, setUserPhoto] = useState("");
  const [myInfo, setMyInfo] = useState<MyInfoDto>();

  useEffect(() => {
    function loadUserPhoto() {}
    loadUserPhoto();
  }, []);

  useEffect(() => {
    function loadMyInfo() {
      SaqibAPIsClient.get("/api/me")
        .then((res) => {
          // console.log(res.data);
          setMyInfo(res.data);
        })
        .catch((error: AxiosError) => console.log(error.response?.data));
    }
    loadMyInfo();
  }, []);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="">
          <Avatar>
            <AvatarImage src={userPhoto} alt="avatar image" />
            <AvatarFallback className="text-black">{extractInitials(myInfo?.name)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <MyInfoCard myInfo={myInfo} />
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserAvatar;
