import React, { useState } from 'react';

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

  // Item classes with Tailwind
  const itemBaseClasses = [
    'flex',
    'items-center',
    'w-full',
    'text-mantis-gray-700',
    'no-underline',
    'border-none',
    'bg-transparent',
    'cursor-pointer',
    'transition-mantis-colors',
    'text-mantis-sm',
    'font-medium',
    'text-left',
    'min-h-10',
    'hover:bg-mantis-gray-100',
    'hover:text-mantis-gray-900',
  ];

  const itemStateClasses = [];
  if (item.isActive) {
    itemStateClasses.push('bg-mantis-primary', 'text-mantis-white', 'hover:bg-mantis-primary-dark');
  }

  const itemPaddingClasses = isCollapsed 
    ? ['justify-center', 'p-mantis-3']
    : level === 0 
    ? ['px-mantis-4', 'py-mantis-3', 'gap-mantis-3']
    : ['pl-mantis-6', 'pr-mantis-4', 'py-mantis-3', 'gap-mantis-3', 'text-mantis-xs'];

  const itemClasses = [
    ...itemBaseClasses,
    ...itemStateClasses,
    ...itemPaddingClasses,
  ].filter(Boolean).join(' ');

  return (
    <div className="relative">
      {item.href ? (
        <a
          href={item.href}
          className={itemClasses}
          title={isCollapsed ? item.label : undefined}
        >
          {item.icon && (
            <span className="flex items-center justify-center flex-shrink-0 w-5 h-5">
              {item.icon}
            </span>
          )}
          {!isCollapsed && (
            <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
              {item.label}
            </span>
          )}
          {hasChildren && !isCollapsed && (
            <span className={`flex items-center justify-center flex-shrink-0 transition-transform duration-mantis-base ${isExpanded ? 'rotate-90' : ''}`}>
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
            <span className="flex items-center justify-center flex-shrink-0 w-5 h-5">
              {item.icon}
            </span>
          )}
          {!isCollapsed && (
            <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
              {item.label}
            </span>
          )}
          {hasChildren && !isCollapsed && (
            <span className={`flex items-center justify-center flex-shrink-0 transition-transform duration-mantis-base ${isExpanded ? 'rotate-90' : ''}`}>
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
        <div className="bg-mantis-gray-50 border-l-2 border-mantis-primary ml-mantis-4">
          {item.children!.map((child: SidebarItem) => (
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

  // Base sidebar classes with Tailwind
  const sidebarClasses = [
    'flex',
    'flex-col',
    'bg-mantis-white',
    'border-r',
    'border-mantis-gray-200',
    'h-screen',
    'relative',
    'transition-all',
    'duration-mantis-base',
    'md:relative',
    'md:translate-x-0',
    // Mobile responsive classes
    'fixed',
    'top-0',
    'left-0',
    'z-50',
    '-translate-x-full',
    className,
  ].filter(Boolean).join(' ');

  const sidebarStyle = {
    width: isCollapsed ? collapsedWidth : width,
  };

  return (
    <aside className={sidebarClasses} style={sidebarStyle}>
      {header && (
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-mantis-4 border-b border-mantis-gray-200 bg-mantis-gray-50 min-h-16`}>
          {!isCollapsed && header}
          {collapsible && (
            <button
              className="flex items-center justify-center bg-transparent border-none p-mantis-2 rounded-mantis-md cursor-pointer text-mantis-gray-600 transition-mantis-colors hover:bg-mantis-gray-200 hover:text-mantis-gray-900"
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
      
      <nav className="flex-1 py-mantis-2 overflow-y-auto overflow-x-hidden">
        {items.map((item: SidebarItem) => (
          <SidebarItemComponent 
            key={item.id}
            item={item} 
            level={0} 
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
      
      {footer && !isCollapsed && (
        <div className="p-mantis-4 border-t border-mantis-gray-200 bg-mantis-gray-50">
          {footer}
        </div>
      )}
    </aside>
  );
};
