import { MyInfoDto } from "@/models/MyInfoDto";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { extractInitials } from "@/lib/userHelper";

const MyInfoCard = ({ myInfo }: { myInfo?: MyInfoDto }) => {
  return (
    <div className="flex flex-col gap-2 min-w-80">
      <div className="flex justify-between items-center">
        <div className="font-normal">{myInfo?.organisationName}</div>
        <div>
          <Button variant={"link"}>Sign Out</Button>
        </div>
      </div>
      <div className="flex  gap-4">
        <div>
          <Avatar className="w-24 h-24">
            <AvatarImage src={""} alt="avatar image" />
            <AvatarFallback className="text-black text-5xl font-normal">
              {extractInitials(myInfo?.name)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xl font-bold">{myInfo?.name}</div>
          <div className="font-normal">{myInfo?.userName}</div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoCard;
