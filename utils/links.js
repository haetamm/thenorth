import { AiOutlineFileSearch } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiOutlinePuzzle } from "react-icons/hi";
import { FaGithub, FaHome } from "react-icons/fa";
import { MdNotStarted, MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { RiBook2Fill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";

export const images = [
  `https://dummyimage.com/2000x700/84D2C5/080202.png&text=Pasang+Iklan%3F`,
  `https://dummyimage.com/2000x700/E4C988/080202.png&text=Hubungi`,
  `https://dummyimage.com/2000x700/C27664/080202.png&text=(021) 3849065`,
];

export const linksInGuest = [
  {
    href: "https://github.com/THaetami",
    icon: FaGithub,
    label: "View on GitHub",
  },
  {
    href: "#",
    icon: MdNotStarted,
    label: "Get Started",
  },
];

export const sponsorLinks = [
  { src: "/icons/air_bnb.svg", width: 130, height: 130 },
  { src: "/icons/google.svg", width: 110, height: 110 },
  { src: "/icons/microsoft.svg", width: 140, height: 140 },
  { src: "/icons/spotify.svg", width: 130, height: 130 },
  { src: "/icons/mailchip.svg", width: 140, height: 140 },
];

export const downloadLinks = [
  {
    src: "https://cdn-icons-png.flaticon.com/512/888/888857.png",
    alt: "Google Play Store",
    store: "Google Play Store",
    url: "#",
  },
  {
    src: "https://cdn-icons-png.flaticon.com/512/888/888841.png",
    alt: "Apple Store",
    store: "Apple Store",
    url: "#",
  },
];

export const footerLinks = [
  { text: "About us", url: "#" },
  { text: "Contact us", url: "#" },
  { text: "Privacy Policy", url: "#" },
];

export const navLinks = [
  { href: "/home", icon: IoHomeOutline, label: "Home" },
  { href: "#", icon: MdOutlineDashboardCustomize, label: "Categories" },
  { href: "#", icon: HiOutlinePuzzle, label: "About" },
];

export const authLinks = [
  { href: "/guest/login", label: "Login" },
  { href: "/guest/register", label: "Register" },
];

export const menuItems = [
  {
    label: "Home",
    icon: <FaHome size={24} />,
    link: "/home",
    visible: true,
  },
  {
    label: "Categories",
    icon: <MdOutlineDashboardCustomize size={24} />,
    link: "#",
    visible: true,
  },
  {
    label: "About",
    icon: <HiOutlinePuzzle size={24} />,
    link: "#",
    visible: true,
  },
  {
    label: "Administrator",
    icon: <MdOutlineAdminPanelSettings size={24} />,
    link: "/admin",
    visible: (token, role) => token && role === "ADMIN",
  },
];

export const dropdownItems = (openModal) => [
  {
    href: "/profile",
    icon: CgProfile,
    label: "My Profile",
  },
  {
    href: "/admin",
    icon: MdOutlineAdminPanelSettings,
    label: "Administrator",
    role: "ADMIN",
  },
  {
    href: "#",
    icon: IoMdLogOut,
    label: "Logout",
    onClick: () => openModal(),
  },
];

export const sidebarItems = [
  {
    href: "/home",
    label: "Home",
    icon: FaHome,
    isActive: (pathname) => pathname === "/home",
  },
  {
    href: "#",
    label: "Explore",
    icon: AiOutlineFileSearch,
    isActive: () => false,
  },
  {
    href: "/my",
    label: "Threads",
    icon: RiBook2Fill,
    isActive: (pathname) => pathname.startsWith("/my"),
  },
];
