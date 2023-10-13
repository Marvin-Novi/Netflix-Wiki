import { Routes } from "../../Constants/Environment";
import { Text } from "../../Constants/Messages";

export const menuItems = [
    {
      title: Text.Browse,
      url: Routes.Browse,
    },
    {
      title: Text.Profile,
      url: Routes.Profile,
      submenu: [
        {
          title: Text.Profile,
          url: Routes.Profile,
        },     
        {
          title: Text.Log_out,
          url: Routes.Logout,
        }
      ]
    },
    {
      title: Text.About_us,
      url: Routes.AboutUs,
    },
    {
      title: Text.Contact,
      url: Routes.Contact,
    }
  ];