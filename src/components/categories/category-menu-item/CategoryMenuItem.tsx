import Link from "next/link";
import React from "react";
import Icon from "../../icon/Icon";
import { StyledCategoryMenuItem } from "./CategoryMenuItemStyle";

interface CategoryMenuItemProps {
  href: string;
  icon?: string;
  title: string;
  caret?: boolean;
}

const CategoryMenuItem: React.FC<CategoryMenuItemProps> = ({
  href,
  icon,
  title,
  children,
}) => {
  return (
    <StyledCategoryMenuItem>
      <Link href={href}>
        <div className="category-dropdown-link">
          {icon && <Icon variant="small">{icon}</Icon>}
          <span className="title">{title}</span>
        </div>
      </Link>
      {children}
    </StyledCategoryMenuItem>
  );
};

CategoryMenuItem.defaultProps = {
  caret: true,
};

export default CategoryMenuItem;
