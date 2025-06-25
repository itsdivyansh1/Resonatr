import ModeToggle from "@/components/modetoggle";
import UserMenu from "@/components/user-menu";
import { auth } from "@/lib/auth";
import {
  BoltIcon,
  BookOpenIcon,
  Layers2Icon,
  PinIcon,
  UserPenIcon,
} from "lucide-react";
import { headers } from "next/headers";

const menuGroups = [
  [
    { icon: <BoltIcon size={16} />, label: "Dashboard", href: "/dashboard" },
    { icon: <Layers2Icon size={16} />, label: "Projects", href: "/projects" },
    { icon: <BookOpenIcon size={16} />, label: "Docs", href: "/docs" },
  ],
  [
    { icon: <PinIcon size={16} />, label: "Bookmarks", href: "/bookmarks" },
    {
      icon: <UserPenIcon size={16} />,
      label: "Edit Profile",
      href: "/settings/profile",
    },
  ],
];

export async function ActionButtons() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex items-center gap-3">
      <ModeToggle />
      <UserMenu
        name={session?.user.name ?? "Guest"} // or any fallback name you prefer
        email={session?.user.email ?? "No email"}
        avatarUrl={
          session?.user.image || "https://example.com/default-avatar.png"
        }
        menuGroups={menuGroups}
      />
    </div>
  );
}
