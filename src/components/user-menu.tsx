"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type MenuItem = {
  icon: ReactNode;
  label: string;
  href: string;
};

type MenuGroup = MenuItem[];

type UserMenuProps = {
  name: string;
  email: string;
  avatarUrl?: string;
  menuGroups: MenuGroup[];
};

export default function UserMenu({
  name,
  email,
  avatarUrl,
  menuGroups,
}: UserMenuProps) {
  const router = useRouter();

  const onLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.refresh();
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={avatarUrl} alt="Profile image" />
            <AvatarFallback>
              {name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64" align="end">
        {/* User info */}
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Menu Groups */}
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <DropdownMenuGroup>
              {group.map((item, itemIdx) => (
                <DropdownMenuItem asChild key={itemIdx}>
                  <Link href={item.href}>
                    <span className="opacity-60">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            {groupIdx < menuGroups.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}

        {/* Logout */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} variant="destructive">
          <LogOutIcon size={16} className="opacity-60" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
