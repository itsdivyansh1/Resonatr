import ModeToggle from "@/components/modetoggle";
import NavLink from "@/components/navlink";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import Image from "next/image";
import Link from "next/link";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact-us", label: "Contact us" },
];

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

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="border-b bg-background text-foreground">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavLink href={link.href} label={link.label} />
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>

            {/* Logo + Desktop Nav */}
            <div className="flex items-center gap-6">
              <Link href="/" className="text-primary hover:text-primary/90">
                <Image src="/vercel.svg" width={40} height={40} alt="Logo" />
              </Link>

              <NavigationMenu className="hidden md:block">
                <NavigationMenuList className="gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavLink href={link.href} label={link.label} />
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            {session ? (
              <UserMenu
                name={session.user.name}
                email={session.user.email}
                avatarUrl={session.user.image || "undefined"}
                menuGroups={menuGroups}
              />
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="text-sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="text-sm">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
