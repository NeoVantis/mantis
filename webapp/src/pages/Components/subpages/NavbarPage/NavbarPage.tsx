import React from 'react';
import { Navbar } from 'mantis-ui';

const NavbarPage: React.FC = () => {
  const navLinks = [
    { name: 'Home', href: '#home', position: 'right' as const },
    { name: 'About', href: '#about', position: 'right' as const },
    { name: 'Services', href: '#services', position: 'right' as const },
    { name: 'Contact', href: '#contact', position: 'right' as const },
  ];

  const logo = {
    text: 'Mantis UI',
    href: '#',
    position: 'left' as const,
    priority: 1,
  };

  const primaryButton = {
    text: 'Sign Up',
    href: '#signup',
    position: 'right' as const,
    priority: 5,
    className: 'bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 py-2 font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105',
  };

  const secondaryButton = {
    text: 'Login',
    href: '#login',
    position: 'right' as const,
    priority: 4,
    className: 'bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2 font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105',
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Navbar Component</h1>
      <p className="mb-6">
        The Navbar component supports customizable positioning and priorities for groups and individual nav links.
        Below is a comprehensive guide to all available props and their usage.
      </p>

      <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-8">
        <div className="h-96 overflow-y-auto">
          {/* Navbar inside the scrollable area */}
          <div className="sticky top-4 z-10">
            <Navbar
              navLinks={navLinks}
              logo={logo}
              primaryButton={primaryButton}
              secondaryButton={secondaryButton}
            />
          </div>

          {/* Scrollable Content */}
          <div className="space-y-8 p-8">
            <section id="home" className="min-h-64 bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">Welcome</h2>
                <p className="text-lg">Scroll to see the glass effect</p>
              </div>
            </section>

            <section id="about" className="min-h-64 bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">About Us</h2>
                <p className="text-base max-w-xl mx-auto">
                  Mantis UI provides beautiful components with glassmorphism effects that create stunning visual experiences.
                </p>
              </div>
            </section>

            <section id="services" className="min-h-64 bg-gradient-to-br from-purple-400 to-purple-600 text-white flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-1">Components</h3>
                    <p className="text-sm">Pre-built React components</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-1">Design System</h3>
                    <p className="text-sm">Consistent design patterns</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-1">Glassmorphism</h3>
                    <p className="text-sm">Modern visual effects</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="min-h-64 bg-gradient-to-br from-red-400 to-red-600 text-white flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">Features</h2>
                <ul className="text-base space-y-1 max-w-xl mx-auto">
                  <li>✅ Responsive design</li>
                  <li>✅ TypeScript support</li>
                  <li>✅ Customizable positioning</li>
                  <li>✅ Glassmorphism effects</li>
                  <li>✅ Smooth animations</li>
                  <li>✅ Mobile-friendly</li>
                </ul>
              </div>
            </section>

            <section className="min-h-64 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">Customization</h2>
                <p className="text-base max-w-xl mx-auto">
                  Position elements anywhere: left, center, or right with customizable priorities.
                </p>
              </div>
            </section>

            <section className="min-h-64 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">Get Started</h2>
                <p className="text-base max-w-xl mx-auto">
                  Start building beautiful interfaces with Mantis UI components.
                </p>
              </div>
            </section>

            <section id="contact" className="min-h-64 bg-gradient-to-br from-pink-400 to-pink-600 text-white flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">Contact Us</h2>
                <p className="text-base max-w-xl mx-auto">
                  Ready to build something amazing? Let's get started!
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Props Documentation Table */}
      <div className="mb-8 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Props Reference</h2>
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-64">Example</th>
              </tr>
            </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">navLinks</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NavLink[]</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Array of navigation links with customizable positioning and styling
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 font-mono text-xs overflow-x-auto max-w-xs">
                <div className="whitespace-nowrap overflow-x-auto">
                  {`[{ name: 'Home', href: '#home', position: 'left', className: 'text-blue-600 hover:text-blue-800' }]`}
                </div>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">logo</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">object</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Logo configuration with text, href, positioning, and custom styling
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 font-mono text-xs overflow-x-auto max-w-xs">
                <div className="whitespace-nowrap overflow-x-auto">
                  {`{ text: 'Logo', href: '/', position: 'left', priority: 1, className: 'text-purple-600 hover:text-purple-800' }`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">primaryButton</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">object</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Primary button (e.g., Sign Up) with styling and positioning
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 font-mono text-xs overflow-x-auto max-w-xs">
                <div className="whitespace-nowrap overflow-x-auto">
                  {`{ text: 'Sign Up', href: '#signup', position: 'right', priority: 1, className: '...' }`}
                </div>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">secondaryButton</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">object</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Secondary button (e.g., Login) with styling and positioning
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 font-mono text-xs overflow-x-auto max-w-xs">
                <div className="whitespace-nowrap overflow-x-auto">
                  {`{ text: 'Login', href: '#login', position: 'right', priority: 2, className: '...' }`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">className</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Additional CSS classes for the navbar container
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 font-mono text-xs overflow-x-auto max-w-xs">
                <div className="whitespace-nowrap overflow-x-auto">
                  'shadow-2xl border-2'
                </div>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">height</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'py-3'</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Vertical padding for the navbar (Tailwind classes)
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 font-mono text-xs overflow-x-auto max-w-xs">
                <div className="whitespace-nowrap overflow-x-auto">
                  'py-4'
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">width</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'max-w-4xl'</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Maximum width of the navbar (Tailwind classes)
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 font-mono text-xs overflow-x-auto max-w-xs">
                <div className="whitespace-nowrap overflow-x-auto">
                  'max-w-6xl'
                </div>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">mobileMenuClassName</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">undefined</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Additional CSS classes for the mobile menu container
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 font-mono text-xs overflow-x-auto max-w-xs">
                <div className="whitespace-nowrap overflow-x-auto">
                  'bg-gray-800/90 text-white'
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Usage Examples</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-800 mb-2">Basic Usage</h4>
            <pre className="text-sm text-blue-800 font-mono bg-white p-3 rounded overflow-x-auto whitespace-pre-wrap break-all">
{`<Navbar
  navLinks={[
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' }
  ]}
  logo={{ text: 'MyApp', href: '/' }}
  primaryButton={{ text: 'Sign Up', href: '/signup' }}
/>`}
            </pre>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
            <h4 className="font-semibold text-green-800 mb-2">Advanced Positioning</h4>
            <pre className="text-sm text-green-800 font-mono bg-white p-3 rounded overflow-x-auto whitespace-pre-wrap break-all">
{`<Navbar
  navLinks={[
    { name: 'Home', href: '#home', position: 'left' },
    { name: 'About', href: '#about', position: 'center' },
    { name: 'Contact', href: '#contact', position: 'right' }
  ]}
  logo={{ text: 'Logo', href: '/', position: 'left', priority: 1 }}
  primaryButton={{ text: 'Sign Up', href: '/signup', position: 'right', priority: 2 }}
  secondaryButton={{ text: 'Login', href: '/login', position: 'right', priority: 1 }}
/>`}
            </pre>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
            <h4 className="font-semibold text-purple-800 mb-2">Custom Styling</h4>
            <pre className="text-sm text-purple-800 font-mono bg-white p-3 rounded overflow-x-auto whitespace-pre-wrap break-all">
{`<Navbar
  navLinks={[
    { name: 'Home', href: '#home', className: 'text-blue-600 hover:text-blue-800' },
    { name: 'About', href: '#about', className: 'text-green-600 hover:text-green-800' }
  ]}
  logo={{ text: 'Logo', href: '/', className: 'text-purple-600 hover:text-purple-800' }}
  primaryButton={{
    text: 'Get Started',
    href: '/start',
    position: 'right',
    priority: 1,
    className: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-3 font-bold shadow-lg'
  }}
  className="shadow-2xl"
  height="py-4"
  width="max-w-7xl"
/>`}
            </pre>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
            <h4 className="font-semibold text-orange-800 mb-2">Mobile Menu Customization</h4>
            <pre className="text-sm text-orange-800 font-mono bg-white p-3 rounded overflow-x-auto whitespace-pre-wrap break-all">
{`<Navbar
  navLinks={navLinks}
  logo={logo}
  primaryButton={primaryButton}
  secondaryButton={secondaryButton}
  mobileMenuClassName="bg-gray-800/95 text-white border-gray-700"
  className="bg-gray-900/80 text-white"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarPage;
