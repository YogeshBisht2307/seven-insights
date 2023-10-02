import { NavItems } from "@/types/elements";
import { 
  DashboardIcon,
  ReaderIcon,
  StackIcon,
  PersonIcon,
  FrameIcon,
  GearIcon
} from '@radix-ui/react-icons';


export const sideMenu: NavItems[] = [
  {
    label: "Dashboard",
    icon: <DashboardIcon/>,
    link: "/admin/dashboard",
    isParent: false,
  },
  {
    label: "Posts",
    icon: <ReaderIcon/>,
    link: "/admin/posts",
    isParent: false,
  },
  {
    label: "Categories",
    icon: <StackIcon/>,
    link: "/admin/categories",
    isParent: false,
  },
  {
    label: "Tags",
    icon: <FrameIcon/>,
    link: "/admin/tags",
    isParent: false,
  },
  {
    label: "Users",
    icon: <PersonIcon/>,
    link: "/admin/users",
    isParent: false,
  },
  {
    label: "Settings",
    icon: <GearIcon/>,
    link: "/admin/settings",
    isParent: true,
    subMenu: [
      {
        label: "Profile",
        link: "/admin/settings/profile",
      },
      {
        label: "Preferences",
        link: "/admin/settings/preferences",
      },
    ],
  }
]