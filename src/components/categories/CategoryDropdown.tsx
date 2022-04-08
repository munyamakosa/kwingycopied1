import navigations from "@data/navigations";
import React from "react";
import CategoryMenuItem from "./category-menu-item/CategoryMenuItem";
import { StyledCategoryDropdown } from "./CategoryDropdownStyle";

export interface CategoryDropdownProps {
  open: boolean;
  position?: "absolute" | "relative";
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  open,
  position,
}) => {
  return (
    <StyledCategoryDropdown open={open} position={position}>
      {navigations.map((item) => {
        return (
          <CategoryMenuItem
            title={item.title}
            href={item.href}
            icon={item.icon}
            key={item.title}
          ></CategoryMenuItem>
        );
      })}
    </StyledCategoryDropdown>
  );
};

CategoryDropdown.defaultProps = {
  position: "absolute",
};

export default CategoryDropdown;
