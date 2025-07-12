import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart,
  Globe
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Content Generator', path: '/content-generator' },
      { name: 'Worksheet Generator', path: '/worksheet-generator' },
      { name: 'Visual Aid Generator', path: '/visual-aid-generator' },
      { name: 'Voice Assessment', path: '/voice-assessment' },
      { name: 'Image Analyzer', path: '/image-analyzer' }
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Documentation', path: '/docs' },
      { name: 'Training Videos', path: '/training' },
      { name: 'Community Forum', path: '/community' },
      { name: 'Contact Support', path: '/support' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Mission', path: '/mission' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press Kit', path: '/press' },
      { name: 'Blog', path: '/blog' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Data Security', path: '/security' },
      { name: 'Accessibility', path: '/accessibility' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/sahayak' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/sahayak' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/sahayak' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/sahayak' }
  ];

  const languages = [
    'English', 'हिंदी', 'বাংলা', 'తెలుగు', 'मराठी', 'தமிழ்', 'ગુજરાતી', 'اردو'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Sahayak</span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering rural teachers with AI-powered tools to create localized content, 
              personalized worksheets, and engaging educational materials in regional languages.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>support@sahayak.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+91 1800-SAHAYAK</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, Karnataka, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Language Support Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex items-center justify-center mb-6">
            <Globe className="w-5 h-5 mr-2" />
            <h3 className="text-lg font-semibold">Supported Languages</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {languages.map((language, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-1">10,000+</div>
              <div className="text-gray-400 text-sm">Teachers Empowered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400 mb-1">50,000+</div>
              <div className="text-gray-400 text-sm">Content Generated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-1">15+</div>
              <div className="text-gray-400 text-sm">Languages Supported</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400 mb-1">25,000+</div>
              <div className="text-gray-400 text-sm">Student Assessments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4 md:mb-0">
              <span>© {currentYear} Sahayak. All rights reserved.</span>
              <span>•</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for rural education</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Powered by AI</span>
              <span>•</span>
              <span>Built for Teachers</span>
              <span>•</span>
              <span>Designed for Rural India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

