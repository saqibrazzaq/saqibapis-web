import React from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Folders,
  Timer,
  GitPullRequestArrow,
  BookA,
  HardDriveUpload,
  Unplug,
  WalletMinimal,
  FolderInput,
  FolderOutput,
  CircleUserRound,
  MapPinned,
  MapPin,
  User,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Command className="bg-secondary rounded-none">
      <CommandInput placeholder="Search..." />
      <CommandList className="max-h-full">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Home">
          <CommandItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <Link href={"/dashboard"}>Dashboard</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Person">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <Link href={"/persons/search"}>Persons</Link>
          </CommandItem>
          <CommandItem>
            <MapPin className="mr-2 h-4 w-4" />
            <Link href={"/countries/search"}>Countries</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
