"use client";

import { useRouter } from "next/navigation";
import { ExitIcon, AvatarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ProfileMenuProps } from "@/types/props";


export default function ProfileMenu({ supabase }: ProfileMenuProps) {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <AvatarIcon className="absolute h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100 text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="hover:!bg-primary hover:!text-primary-foreground">
          <span>Hi User</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:!bg-primary hover:!text-primary-foreground flex justify-between">
          <span onClick={() => signOut()}>Log out</span>
          <ExitIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
