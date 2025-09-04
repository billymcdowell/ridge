import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ridge Web Components Library - Modern UI Components for the Web",
  description: "A modern web component library built with Lit and TypeScript, providing reusable, accessible UI components for modern web applications.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-16 pb-20">
        <div className="text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700">
              🚧 MVP Status - Early Development
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Ridge Web Components
            <span className="block text-indigo-600 dark:text-indigo-400">Library</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            A modern web component library built with <strong>Lit</strong> and <strong>TypeScript</strong>, 
            designed to provide reusable, accessible UI components for modern web applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 transition-colors">
              View Storybook
            </button>
          </div>
        </div>
      </div>

      {/* Current Features Section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🚀 Current MVP Features</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ridge is currently in MVP phase with core functionality ready for experimentation and feedback.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="text-green-500 text-2xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Button Component</h3>
              <p className="text-gray-600 dark:text-gray-300">Fully functional button component with 5 variants, 3 sizes, and interactive states.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="text-green-500 text-2xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">TypeScript Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Full type safety and IntelliSense support for enhanced developer experience.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="text-green-500 text-2xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Storybook Integration</h3>
              <p className="text-gray-600 dark:text-gray-300">Interactive component documentation and testing environment.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="text-green-500 text-2xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Build System</h3>
              <p className="text-gray-600 dark:text-gray-300">Vite-powered build with UMD and ES module outputs for maximum compatibility.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="text-green-500 text-2xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Development Environment</h3>
              <p className="text-gray-600 dark:text-gray-300">Hot reload and development server for rapid iteration.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="text-green-500 text-2xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Accessibility First</h3>
              <p className="text-gray-600 dark:text-gray-300">ARIA attributes and keyboard navigation built into every component.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Button Features Showcase */}
      <div className="bg-indigo-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🎯 Button Component Features</h2>
            <p className="text-gray-600 dark:text-gray-300">Our flagship component with comprehensive functionality</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Variants & Sizes</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• <strong>5 Variants:</strong> Primary, Secondary, Outline, Ghost, Danger</li>
                <li>• <strong>3 Sizes:</strong> Small, Medium, Large</li>
                <li>• <strong>Interactive States:</strong> Hover, active, disabled, loading</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Advanced Features</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• <strong>Link Support:</strong> Can render as anchor tags with href</li>
                <li>• <strong>Custom Events:</strong> Dispatches `button-click` events</li>
                <li>• <strong>Visual Effects:</strong> Ripple animation and loading spinner</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">📦 Quick Start</h2>
            <p className="text-gray-600 dark:text-gray-300">Get up and running with Ridge in minutes</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Installation</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  <span className="text-green-400">$</span> npm install ridge-ui
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Basic Usage</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="text-blue-300">&lt;script <span className="text-yellow-300">type</span>=<span className="text-green-300">"module"</span>&gt;</div>
                  <div className="ml-2 text-purple-300">import <span className="text-green-300">'ridge-ui'</span>;</div>
                  <div className="text-blue-300">&lt;/script&gt;</div>
                  <br />
                  <div className="text-blue-300">&lt;rdg-button <span className="text-yellow-300">variant</span>=<span className="text-green-300">"primary"</span>&gt;</div>
                  <div className="ml-2">Click me!</div>
                  <div className="text-blue-300">&lt;/rdg-button&gt;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🚧 Development Roadmap</h2>
            <p className="text-gray-600 dark:text-gray-300">Our journey towards a comprehensive component library</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-2 flex items-center dark:text-white">
                <span className="text-green-500 mr-2">🔄</span>
                Phase 1 - Current MVP
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Foundation components and development infrastructure</p>
              <div className="text-sm text-green-600 dark:text-green-400">✅ Button component, TypeScript, Storybook, Build system</div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-2 flex items-center dark:text-white">
                <span className="text-blue-500 mr-2">📋</span>
                Phase 2 - Form Components
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Essential form controls and validation</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">Input components, Form validation, Checkbox/Radio, Select/Dropdown</div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-2 flex items-center dark:text-white">
                <span className="text-purple-500 mr-2">🎯</span>
                Phase 3 - Advanced Components
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Layout, navigation, and data display components</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">Layout components, Navigation, Feedback, Data display, Advanced components</div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🏗 Technology Stack</h2>
            <p className="text-gray-600 dark:text-gray-300">Built with modern, proven technologies</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2 dark:text-white">Lit Framework</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Lightweight web components</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-3xl mb-3">📘</div>
              <h3 className="font-semibold mb-2 dark:text-white">TypeScript</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Type safety & IntelliSense</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2 dark:text-white">Vite</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Fast development & building</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold mb-2 dark:text-white">Storybook</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Component documentation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-indigo-600 dark:bg-indigo-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-indigo-100 dark:text-indigo-200 mb-8 max-w-2xl mx-auto">
            Ridge is in active development and we welcome contributions, feedback, and suggestions. 
            Join us in building the future of web components!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-100 transition-colors">
              View on GitHub
            </button>
            <button className="px-8 py-3 border-2 border-indigo-400 text-white font-semibold rounded-lg hover:border-indigo-300 dark:border-indigo-300 dark:hover:border-indigo-200 transition-colors">
              Read Documentation
            </button>
          </div>
          
          <div className="mt-8 text-indigo-200 dark:text-indigo-300 text-sm">
            <p>⚠️ Note: Ridge is currently in MVP development phase. APIs may change between versions until we reach v1.0.</p>
            <p className="mt-2">Built with ❤️ using modern web standards</p>
          </div>
        </div>
      </div>
    </div>
  );
}
