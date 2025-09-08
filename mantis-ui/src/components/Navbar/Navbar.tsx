import React, { useState } from 'react';

interface NavLink {
  name: string;
  href?: string;
  onClick?: () => void;
}

export interface NavbarProps {
  navLinks?: NavLink[];
  logo?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  primaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
    className?: string;
  };
  secondaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
    className?: string;
  };
  className?: string;
  height?: string;
  width?: string;
}

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
      className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${className}`}
    >
      {children}
    </Comp>
  )
}

// Hamburger Menu Icon
interface HamburgerIconProps {
  isOpen: boolean;
}

const HamburgerIcon = ({ isOpen }: HamburgerIconProps) => (
  <div className="flex flex-col justify-center items-center w-6 h-6">
    <span
      className={`bg-gray-300 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
        }`}
    />
    <span
      className={`bg-gray-300 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"
        }`}
    />
    <span
      className={`bg-gray-300 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
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
  width = "max-w-4xl"
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // For demo purposes, scroll to element without navbar offset
      const elementPosition = targetElement.offsetTop

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }

    // Close mobile menu if open
    if (isMenuOpen) {
      closeMenu()
    }
  }

  const handleNavClick = (link: NavLink, e?: React.MouseEvent) => {
    if (link.onClick) {
      link.onClick()
    } else if (link.href && link.href.startsWith('#')) {
      if (e) handleSmoothScroll(e as React.MouseEvent<HTMLAnchorElement>, link.href)
    }
    if (isMenuOpen) closeMenu()
  }

  return (
    <>
      {/* Glass Navbar - Demo friendly */}
      <nav className={`relative w-full ${className}`}>
        {/* Glass pill container */}
        <div className={`bg-white/20 backdrop-blur-xl rounded-full border border-white/20 shadow-xl px-6 mx-auto ${height} ${width}`}>
          {/* Navigation content */}
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            {logo && (
              <a
                href={logo.href || "#"}
                onClick={logo.onClick}
                className="text-xl font-bold text-emerald-500 tracking-tight hover:scale-105 transition-transform"
              >
                {logo.text}
              </a>
            )}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Nav Links */}
              {navLinks && navLinks.length > 0 && (
                <div className="flex items-center gap-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href || "#"}
                      onClick={(e) => handleNavClick(link, e)}
                      className="text-white/90 text-sm font-medium hover:text-emerald-500 transition-colors duration-300 cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}

              {/* Desktop Buttons */}
              <div className="flex items-center gap-3">
                {secondaryButton && (
                  <Button
                    asChild
                    href={secondaryButton.href}
                    onClick={secondaryButton.onClick}
                    className={secondaryButton.className}
                  >
                    <>
                      <span className="inline-block w-2 h-2 bg-emerald-300 rounded-full" />
                      {secondaryButton.text}
                    </>
                  </Button>
                )}

                {primaryButton && (
                  <Button
                    asChild
                    href={primaryButton.href}
                    onClick={primaryButton.onClick}
                    className={primaryButton.className}
                  >
                    {primaryButton.text}
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button - Only show if there are nav links */}
            {navLinks && navLinks.length > 0 && (
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <HamburgerIcon isOpen={isMenuOpen} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && navLinks && navLinks.length > 0 && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 animate-slide-down">
            <div className={`bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 mx-auto ${width}`}>
              {/* Mobile Nav Links */}
              <div className="space-y-1 mb-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href || "#"}
                    onClick={(e) => handleNavClick(link, e)}
                    className="block text-white/90 text-base font-medium py-3 px-4 rounded-lg hover:bg-white/10 hover:text-emerald-500 transition-all duration-300 cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Mobile Buttons */}
              <div className="space-y-3">
                {secondaryButton && (
                  <a
                    href={secondaryButton.href || "#"}
                    onClick={secondaryButton.onClick}
                    className={`flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-medium rounded-full border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/20 transition-all duration-300 ${secondaryButton.className}`}
                  >
                    <span className="inline-block w-2 h-2 bg-emerald-300 rounded-full" />
                    {secondaryButton.text}
                  </a>
                )}

                {primaryButton && (
                  <a
                    href={primaryButton.href || "#"}
                    onClick={primaryButton.onClick}
                    className={`flex items-center justify-center w-full px-6 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 shadow-lg transition-all duration-300 ${primaryButton.className}`}
                  >
                    {primaryButton.text}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}