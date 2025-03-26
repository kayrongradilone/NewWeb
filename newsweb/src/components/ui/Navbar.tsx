"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Switch } from "./switch";
import Link from "next/link";
import { Button } from "./button";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

const Navbar = () => {
 
  const pathname = usePathname();
  const { isDarkMode, toggleTheme }: any = useContext(ThemeContext);

  const navBarLinks = [
    { name: "Notícias", href: "/news", dropdown: false },
    {
      name: "Serviços",
      href: "#",
      dropdown: true,
      subLinks: [
        { name: "Desenvolvimento Web", href: "/services/web-development" },
        { name: "APP Mobile", href: "/services/app" },
      ],
    },
    { name: "Contatos", href: "/contacts", dropdown: false },
    { name: "Sobre", href: "/about", dropdown: false },
  ];

  return (
    <header
      className={`py-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } transition-colors shadow-md border duration-300`}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">News Web</Link>
        </div>

        {/* Navegação */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex space-x-8">
            {navBarLinks.map((link) =>
              link.dropdown ? (
                <NavigationMenuItem key={link.name}>
                  <NavigationMenuTrigger className="dark:bg-gray-900 dark:text-white">
                    {link.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white shadow-md p-4 flex flex-col">
                    {link.subLinks?.map((subLink) => (
                      <NavigationMenuLink
                        key={subLink.name}
                        href={subLink.href}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {subLink.name}
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={link.name}>
                  <NavigationMenuLink
                    href={link.href}
                    className={`${
                      pathname === link.href ? "text-red-500" : "text-gray-600"
                    } hover:text-gray-800`}
                  >
                    {link.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Dark Mode e Botão de Login */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center" onClick={toggleTheme}>
            <span className="mr-2">Modo Escuro</span>
            <Switch></Switch>
          </div>
          <Link href="/login">
            <Button className="px-6 ml-6" variant="default">
              Login
            </Button>
          </Link>
        </div>

        {/* Menu Hamburguer Mobile */}
        <MobileMenu />
      </nav>
    </header>
  );
};

export default Navbar;
