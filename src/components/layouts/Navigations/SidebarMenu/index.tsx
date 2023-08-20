import List from "@mui/material/List";
import SidebarCollapse from "./SidebarCollapse";
import SidebarItem from "./SidebarItem";
import menuData from "./data";
import { findNestedObj } from "@/utils/helpers";
import { useEffect, useState } from "react";
import useMenuRole from "@/components/hooks/useMenuRole";

const SidebarMenu = ({ openDrawer }: { openDrawer: boolean }) => {
  const { data: menuRoles } = useMenuRole();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (domLoaded === false) {
    return null;
  }

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
      {menuData
        .filter((obj) => findNestedObj(menuRoles, obj.id)?.allow === true)
        .map((item, index) =>
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
