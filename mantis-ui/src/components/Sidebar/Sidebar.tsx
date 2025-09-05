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

//  SidebarItemComponent is separated as its own component to ensure proper usage of React hooks (like useState).
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
    'text-gray-700',
    'no-underline',
    'border-none',
    'bg-transparent',
    'cursor-pointer',
    'transition-colors',
    'text-sm',
    'font-medium',
    'text-left',
    'min-h-10',
    'hover:bg-gray-100',
    'hover:text-gray-900',
  ];

  const itemStateClasses = [];
  if (item.isActive) {
    itemStateClasses.push('bg-blue-100', 'text-blue-900', 'hover:bg-blue-200');
  }

  const itemPaddingClasses = isCollapsed
    ? ['justify-center', 'p-3']
    : level === 0
      ? ['px-4', 'py-3', 'gap-3']
      : ['pl-8', 'pr-4', 'py-3', 'gap-3', 'text-xs'];

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
            <span className={`flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
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
            <span className={`flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
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
        <div className="bg-gray-50 border-l-2 border-blue-600 ml-4">
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
    'bg-white',
    'border-r',
    'border-gray-200',
    'h-screen',
    'relative',
    'transition-all',
    'duration-200',
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
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-4 border-b border-gray-200 bg-gray-50 min-h-16`}>
          {!isCollapsed && header}
          {collapsible && (
            <button
              className="flex items-center justify-center bg-transparent border-none p-2 rounded-md cursor-pointer text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
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

      <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden">
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
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </aside>
  );
};
