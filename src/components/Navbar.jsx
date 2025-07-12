import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  BookOpen, 
  User, 
  LogOut, 
  Sun, 
  Moon,
  GraduationCap
} from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Welcome to Sahayak!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Sign in failed. Please try again.');
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Sign out failed');
      console.error('Sign out error:', error);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: BookOpen },
    { name: 'Content Generator', path: '/content-generator', icon: BookOpen },
    { name: 'Worksheet Generator', path: '/worksheet-generator', icon: BookOpen },
    { name: 'Visual Aid Generator', path: '/visual-aid-generator', icon: BookOpen },
    { name: 'Voice Assessment', path: '/voice-assessment', icon: BookOpen },
    { name: 'Image Analyzer', path: '/image-analyzer', icon: BookOpen },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Sahayak</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user && navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={user.photoURL || '/default-avatar.png'}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.displayName}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleSignIn}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 p-0"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {user && navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </div>
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center justify-between px-3 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="flex items-center space-x-2"
                  >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>Toggle Theme</span>
                  </Button>
                </div>
                
                {user ? (
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-2 mb-3">
                      <img
                        src={user.photoURL || '/default-avatar.png'}
                        alt={user.displayName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {user.displayName}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center space-x-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                ) : (
                  <div className="px-3 py-2">
                    <Button
                      onClick={handleSignIn}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

