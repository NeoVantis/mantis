import { Navbar } from 'mantis-ui';

const NavbarPage = () => {
  // Example navigation links
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  // Example logo configuration
  const logo = {
    text: "Mantis UI",
    href: "#",
  };

  // Example button configurations
  const primaryButton = {
    text: "Get Started",
    href: "#",
    className: "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 shadow-lg"
  };

  const secondaryButton = {
    text: "Log in",
    href: "#",
    className: "border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/20 hover:border-emerald-500"
  };

  return (
    <div className="showcase-section">
      <h1>Navbar Component</h1>
      <p>A dynamic and responsive navigation bar with customizable links, logo, and action buttons.</p>

      <div className="showcase-demo">
        <h3>Demo</h3>
        <p>Experience the glass morphism effect - resize your browser to see the mobile menu.</p>

        {/* Scrollable background to show glass effect */}
        <div className="relative h-96 overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-lg">
          {/* Background content that shows through the glass */}
          <div className="absolute inset-0 p-8">
            <div className="grid grid-cols-3 gap-4 h-full">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                <h4 className="text-white font-semibold mb-2">Section 1</h4>
                <p className="text-white/70 text-sm">Content that shows through the glass navbar effect.</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                <h4 className="text-white font-semibold mb-2">Section 2</h4>
                <p className="text-white/70 text-sm">The navbar uses backdrop blur for the glass morphism effect.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                <h4 className="text-white font-semibold mb-2">Section 3</h4>
                <p className="text-white/70 text-sm">Scroll to see how the glass effect works with content.</p>
              </div>
            </div>
            
            {/* Additional scrollable content */}
            <div className="mt-8 space-y-4">
              <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10">
                <h4 className="text-white text-lg font-semibold mb-2">Glass Morphism Effect</h4>
                <p className="text-white/80">The navbar uses CSS backdrop-filter: blur() to create a frosted glass appearance that allows background content to show through with a blur effect.</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10">
                <h4 className="text-white text-lg font-semibold mb-2">Responsive Design</h4>
                <p className="text-white/80">On mobile devices, the navbar transforms into a collapsible menu with smooth animations and the same glass effect.</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10">
                <h4 className="text-white text-lg font-semibold mb-2">Customizable</h4>
                <p className="text-white/80">All aspects of the navbar can be customized including colors, links, logo, and button configurations.</p>
              </div>
            </div>
          </div>

          {/* Navbar positioned over the scrollable content */}
          <div className="sticky top-4 z-10">
            <Navbar
              navLinks={navLinks}
              logo={logo}
              primaryButton={primaryButton}
              secondaryButton={secondaryButton}
              height="py-4"
              width="max-w-5xl"
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Usage Example</h3>
        <div className="bg-gray-900 rounded-lg p-6 text-white font-mono text-sm overflow-x-auto">
          <pre className="whitespace-pre-wrap">
{`import { Navbar } from 'mantis-ui';

const MyNavbar = () => {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const logo = {
    text: "My App",
    href: "#",
  };

  const primaryButton = {
    text: "Get Started",
    href: "#",
    className: "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400"
  };

  return (
    <Navbar
      navLinks={navLinks}
      logo={logo}
      primaryButton={primaryButton}
      height="py-4"        // Custom height (default: "py-3")
      width="max-w-5xl"    // Custom width (default: "max-w-4xl")
    />
  );
};`}
          </pre>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Props</h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
            <div>Prop</div>
            <div>Type</div>
            <div>Default</div>
            <div>Description</div>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">navLinks</div>
              <div className="text-gray-600 font-mono text-sm">NavLink[]</div>
              <div className="text-gray-600 font-mono text-sm">Default links</div>
              <div className="text-gray-700">Array of navigation link objects</div>
            </div>
            <div className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">logo</div>
              <div className="text-gray-600 font-mono text-sm">object</div>
              <div className="text-gray-600 font-mono text-sm">Default logo</div>
              <div className="text-gray-700">Logo configuration with text and href</div>
            </div>
            <div className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">primaryButton</div>
              <div className="text-gray-600 font-mono text-sm">object</div>
              <div className="text-gray-600 font-mono text-sm">Default button</div>
              <div className="text-gray-700">Primary action button configuration</div>
            </div>
            <div className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">secondaryButton</div>
              <div className="text-gray-600 font-mono text-sm">object</div>
              <div className="text-gray-600 font-mono text-sm">Default button</div>
              <div className="text-gray-700">Secondary action button configuration</div>
            </div>
            <div className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">className</div>
              <div className="text-gray-600 font-mono text-sm">string</div>
              <div className="text-gray-600 font-mono text-sm">""</div>
              <div className="text-gray-700">Additional CSS classes</div>
            </div>
            <div className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">height</div>
              <div className="text-gray-600 font-mono text-sm">string</div>
              <div className="text-gray-600 font-mono text-sm">"py-3"</div>
              <div className="text-gray-700">Vertical padding classes (e.g., "py-2", "py-4")</div>
            </div>
            <div className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">width</div>
              <div className="text-gray-600 font-mono text-sm">string</div>
              <div className="text-gray-600 font-mono text-sm">"max-w-4xl"</div>
              <div className="text-gray-700">Maximum width classes (e.g., "max-w-3xl", "max-w-5xl", "w-full")</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarPage;
