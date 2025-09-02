import React, { useState } from 'react';
import './Sidebar.css';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  children?: SidebarItem[];
  isActive?: boolean;
}

export interface SidebarProps {
  /** Sidebar items */
  items: SidebarItem[];
  /** Whether sidebar is collapsible */
  collapsible?: boolean;
  /** Whether sidebar is initially collapsed */
  defaultCollapsed?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Sidebar width when expanded */
  width?: string;
  /** Sidebar width when collapsed */
  collapsedWidth?: string;
  /** Additional CSS classes */
  className?: string;
  /** Sidebar header content */
  header?: React.ReactNode;
  /** Sidebar footer content */
  footer?: React.ReactNode;
}

// Separate component for sidebar items to properly use hooks
const SidebarItemComponent: React.FC<{
  item: SidebarItem;
  level: number;
  isCollapsed: boolean;
}> = ({ item, level, isCollapsed }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  
  const handleItemClick = () => {
    if (hasChildren && !isCollapsed) {
      setIsExpanded(!isExpanded);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  const itemClasses = [
    'mantis-sidebar__item',
    item.isActive ? 'mantis-sidebar__item--active' : '',
    hasChildren ? 'mantis-sidebar__item--expandable' : '',
    isExpanded ? 'mantis-sidebar__item--expanded' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="mantis-sidebar__item-wrapper" style={{ paddingLeft: `${level * 1}rem` }}>
      {item.href ? (
        <a
          href={item.href}
          className={itemClasses}
          title={isCollapsed ? item.label : undefined}
        >
          {item.icon && (
            <span className="mantis-sidebar__item-icon">
              {item.icon}
            </span>
          )}
          {!isCollapsed && (
            <span className="mantis-sidebar__item-label">
              {item.label}
            </span>
          )}
          {hasChildren && !isCollapsed && (
            <span className="mantis-sidebar__item-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </a>
      ) : (
        <button
          className={itemClasses}
          onClick={handleItemClick}
          title={isCollapsed ? item.label : undefined}
        >
          {item.icon && (
            <span className="mantis-sidebar__item-icon">
              {item.icon}
            </span>
          )}
          {!isCollapsed && (
            <span className="mantis-sidebar__item-label">
              {item.label}
            </span>
          )}
          {hasChildren && !isCollapsed && (
            <span className="mantis-sidebar__item-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </button>
      )}
      
      {hasChildren && isExpanded && !isCollapsed && (
        <div className="mantis-sidebar__submenu mantis-animate-slide-in-down">
          {item.children!.map(child => (
            <SidebarItemComponent 
              key={child.id}
              item={child} 
              level={level + 1} 
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  collapsible = false,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onCollapseChange,
  width = '16rem',
  collapsedWidth = '4rem',
  className = '',
  header,
  footer,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  
  const handleToggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(newCollapsed);
    }
    onCollapseChange?.(newCollapsed);
  };

  const baseClasses = 'mantis-sidebar';
  const collapsedClass = isCollapsed ? 'mantis-sidebar--collapsed' : '';
  const collapsibleClass = collapsible ? 'mantis-sidebar--collapsible' : '';

  const sidebarClasses = [
    baseClasses,
    collapsedClass,
    collapsibleClass,
    className
  ].filter(Boolean).join(' ');

  const sidebarStyle = {
    width: isCollapsed ? collapsedWidth : width,
  };

  return (
    <aside className={sidebarClasses} style={sidebarStyle}>
      {header && (
        <div className="mantis-sidebar__header">
          {header}
          {collapsible && (
            <button
              className="mantis-sidebar__toggle"
              onClick={handleToggleCollapse}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      )}
      
      <nav className="mantis-sidebar__nav">
        {items.map(item => (
          <SidebarItemComponent 
            key={item.id}
            item={item} 
            level={0} 
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
      
      {footer && !isCollapsed && (
        <div className="mantis-sidebar__footer">
          {footer}
        </div>
      )}
    </aside>
  );
};
