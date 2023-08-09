import List from "@mui/material/List";
// import { useSession } from "next-auth/react";
import SidebarCollapse from "./SidebarCollapse";
import SidebarItem from "./SidebarItem";
import menuData from "./data";

const SidebarMenu = ({ openDrawer }: { openDrawer: boolean }) => {
  // const { data: sessionData } = useSession();
  // const { setOpenMenu } = useAppStore();

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      /* subheader={
        openDrawer && (
          <ListSubheader component="div" id="nested-list-subheader">
            All Menu
          </ListSubheader>
        )
      } */
    >
      {menuData.map((item, index) =>
        item.children.length > 0 ? (
          <SidebarCollapse
            key={`list-col-${index}`}
            openDrawer={openDrawer}
            item={item}
          />
        ) : (
          <SidebarItem
            key={`list-item-${index}`}
            openDrawer={openDrawer}
            item={item}
          />
        )
      )}
    </List>
  );
};

export default SidebarMenu;
