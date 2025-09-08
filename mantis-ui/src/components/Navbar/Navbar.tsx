import React, { useState } from 'react';

interface NavLink {
  name: string;
  href?: string;
  onClick?: () => void;
  position?: 'left' | 'center' | 'right';
  className?: string;
}

export interface NavbarProps {
  navLinks?: NavLink[];
  logo?: {
    text: string;
    href?: string;
    onClick?: () => void;
    position?: 'left' | 'center' | 'right';
    priority?: number;
    className?: string;
  };
  primaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
    className?: string;
    position?: 'left' | 'center' | 'right';
    priority?: number;
  };
  secondaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
    className?: string;
    position?: 'left' | 'center' | 'right';
    priority?: number;
  };
  className?: string;
  height?: string;
  width?: string;
  mobileMenuClassName?: string;
}

type NavbarItem = {
  type: 'logo' | 'navlink' | 'primaryButton' | 'secondaryButton';
  position: 'left' | 'center' | 'right';
  priority: number;
  data: any; // To hold the specific props
};

// Helper function to collect and group navbar items
const groupNavbarItems = (props: NavbarProps): Record<'left' | 'center' | 'right', NavbarItem[]> => {
  const items: NavbarItem[] = [];

  // Add logo
  if (props.logo) {
    items.push({
      type: 'logo',
      position: props.logo.position || 'left',
      priority: props.logo.priority || 1,
      data: props.logo,
    });
  }

  // Add nav links
  if (props.navLinks) {
    props.navLinks.forEach((link, index) => {
      items.push({
        type: 'navlink',
        position: link.position || 'center',
        priority: index + 1, // Default priority based on order
        data: link,
      });
    });
  }

  // Add primary button
  if (props.primaryButton) {
    items.push({
      type: 'primaryButton',
      position: props.primaryButton.position || 'right',
      priority: props.primaryButton.priority || 1,
      data: props.primaryButton,
    });
  }

  // Add secondary button
  if (props.secondaryButton) {
    items.push({
      type: 'secondaryButton',
      position: props.secondaryButton.position || 'right',
      priority: props.secondaryButton.priority || 2,
      data: props.secondaryButton,
    });
  }

  // Group by position and sort by priority
  const grouped: Record<'left' | 'center' | 'right', NavbarItem[]> = {
    left: [],
    center: [],
    right: [],
  };

  items.forEach((item) => {
    grouped[item.position].push(item);
  });

  // Sort each group by priority (lower number first)
  Object.keys(grouped).forEach((key) => {
    grouped[key as keyof typeof grouped].sort((a, b) => a.priority - b.priority);
  });

  return grouped;
};

// Reusable Button
interface ButtonProps {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

const Button = ({ asChild, children, className, href = "#", onClick }: ButtonProps) => {
  const Comp = asChild ? "a" : "button"
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${className || ''}`}
    >
      {children}
    </Comp>
  )
}

// Hamburger Menu Icon
interface HamburgerIconProps {
  isOpen: boolean;
  className?: string;
}

const HamburgerIcon = ({ isOpen, className = "bg-gray-300" }: HamburgerIconProps) => (
  <div className="flex flex-col justify-center items-center w-6 h-6">
    <span
      className={`block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${className} ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
        }`}
    />
    <span
      className={`block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${className} ${isOpen ? "opacity-0" : "opacity-100"
        }`}
    />
    <span
      className={`block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${className} ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
        }`}
    />
  </div>
)

export default function Navbar({
  navLinks,
  logo,
  primaryButton,
  secondaryButton,
  className,
  height = "py-3",
  width = "max-w-4xl",
  mobileMenuClassName
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Unified click handler
  const handleClick = (item: NavbarItem, e?: React.MouseEvent) => {
    if (item.data.onClick) {
      item.data.onClick()
    } else if (item.data.href && item.data.href.startsWith('#')) {
      if (e) {
        e.preventDefault()
        const targetId = item.data.href.replace('#', '')
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          const elementPosition = targetElement.offsetTop
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })
        }
      }
    }
    if (isMenuOpen) closeMenu()
  }

  const groupedItems = groupNavbarItems({ navLinks, logo, primaryButton, secondaryButton })

  // Render item based on type
  const renderItem = (item: NavbarItem, isMobile = false) => {
    switch (item.type) {
      case 'logo':
        return (
          <a
            key={`logo-${item.priority}`}
            href={item.data.href || "#"}
            onClick={(e) => handleClick(item, e)}
            className={`text-xl font-bold tracking-tight hover:scale-105 transition-transform ${item.data.className || ''}`}
          >
            {item.data.text}
          </a>
        )
      case 'navlink':
        return (
          <a
            key={`navlink-${item.data.name}-${item.priority}`}
            href={item.data.href || "#"}
            onClick={(e) => handleClick(item, e)}
            className={`text-base font-semibold transition-colors duration-300 cursor-pointer ${isMobile ? 'block text-lg py-3 px-4 rounded-lg' : ''} ${item.data.className || ''}`}
          >
            {item.data.name}
          </a>
        )
      case 'primaryButton':
        if (isMobile) {
          return (
            <a
              key={`primary-${item.priority}`}
              href={item.data.href || "#"}
              onClick={() => handleClick(item)}
              className={`flex items-center justify-center w-full px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${item.data.className || ''}`}
            >
              {item.data.text}
            </a>
          )
        }
        return (
          <Button
            key={`primary-${item.priority}`}
            asChild
            href={item.data.href}
            onClick={() => handleClick(item)}
            className={item.data.className}
          >
            {item.data.text}
          </Button>
        )
      case 'secondaryButton':
        if (isMobile) {
          return (
            <a
              key={`secondary-${item.priority}`}
              href={item.data.href || "#"}
              onClick={() => handleClick(item)}
              className={`flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${item.data.className || ''}`}
            >
              <span className="inline-block w-2 h-2 rounded-full" />
              {item.data.text}
            </a>
          )
        }
        return (
          <Button
            key={`secondary-${item.priority}`}
            asChild
            href={item.data.href}
            onClick={() => handleClick(item)}
            className={item.data.className}
          >
            <>
              <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full" />
              {item.data.text}
            </>
          </Button>
        )
      default:
        return null
    }
  }

  // Check if there are any items for mobile menu
  const hasMobileItems = groupedItems.left.length > 0 || groupedItems.center.length > 0 || groupedItems.right.length > 0

  return (
    <>
      {/* Glass Navbar - Demo friendly */}
      <nav className={`relative w-full mt-4 ${className}`}>
        {/* Glass pill container */}
        <div className={`bg-white/50 backdrop-blur-xl rounded-full border border-white/30 shadow-xl px-6 mx-auto ${height} ${width}`}>
          {/* Navigation content */}
          <div className="flex items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              {groupedItems.left.map(item => renderItem(item))}
            </div>

            {/* Center Section */}
            <div className="hidden lg:flex items-center gap-4">
              {groupedItems.center.map(item => renderItem(item))}
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center gap-4">
              {groupedItems.right.map(item => renderItem(item))}
            </div>

            {/* Mobile Menu Button */}
            {hasMobileItems && (
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                <HamburgerIcon isOpen={isMenuOpen} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && hasMobileItems && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 animate-slide-down">
            <div className={`bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-6 mx-auto ${width} ${mobileMenuClassName || ''}`}>
              {/* Mobile Items - sorted by position and priority */}
              <div className="space-y-1">
                {[...groupedItems.left, ...groupedItems.center, ...groupedItems.right].map(item => renderItem(item, true))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}