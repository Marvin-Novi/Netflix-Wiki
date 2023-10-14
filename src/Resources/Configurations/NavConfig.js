import { Routes } from "../../Constants/Environment";
import { Text } from "../../Constants/Messages";

export const menuItems = [
    {
      title: Text.Browse,
      url: Routes.BROWSE,
    },
    {
      title: Text.Profile,
      url: Routes.PROFILE,
      submenu: [
        {
          title: Text.Profile,
          url: Routes.PROFILE,
        },     
        {
          title: Text.Log_out,
          url: Routes.LOGOUT,
        }
      ]
    },
    {
      title: Text.About_us,
      url: Routes.ABOUT_US,
    },
    {
      title: Text.Contact,
      url: Routes.CONTACT,
    }
  ];