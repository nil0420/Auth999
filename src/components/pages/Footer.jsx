import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaApple, FaGoogle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="w-full px-6">
        {/* Footer Links Section */}
        <div className="flex flex-wrap justify-between mb-12 space-y-8 sm:space-y-0">
          {/* About */}
          <div className="w-full sm:w-1/4 flex flex-col">
            <h3 className="font-semibold mb-4 text-lg">About</h3>
            <ul className="space-y-4">
              <li><a href="" className="hover:text-red-600 transition">About Us</a></li>
              <li><a href="" className="hover:text-red-600 transition">Careers</a></li>
              <li><a href="" className="hover:text-red-600 transition">Press</a></li>
              <li><a href="" className="hover:text-red-600 transition">Contact</a></li>
            </ul>
          </div>

          {/* Help Center */}
          <div className="w-full sm:w-1/4 flex flex-col">
            <h3 className="font-semibold mb-4 text-lg">Help Center</h3>
            <ul className="space-y-4">
              <li><a href="" className="hover:text-red-600 transition">FAQ</a></li>
              <li><a href="" className="hover:text-red-600 transition">Help Articles</a></li>
              <li><a href="" className="hover:text-red-600 transition">Account & Billing</a></li>
              <li><a href="" className="hover:text-red-600 transition">Accessibility</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full sm:w-1/4 flex flex-col">
            <h3 className="font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-4">
              <li><a href="" className="hover:text-red-600 transition">Terms of Use</a></li>
              <li><a href="" className="hover:text-red-600 transition">Privacy Policy</a></li>
              <li><a href="" className="hover:text-red-600 transition">Cookie Preferences</a></li>
              <li><a href="" className="hover:text-red-600 transition">Corporate Information</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full sm:w-1/4 flex flex-col">
            <h3 className="font-semibold mb-4 text-lg">Follow Us</h3>
            <ul className="flex space-x-6">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF size={24} className="hover:text-red-600 transition" /></a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} className="hover:text-red-600 transition" /></a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} className="hover:text-red-600 transition" /></a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube size={24} className="hover:text-red-600 transition" /></a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="bg-gray-800 text-white p-8 rounded-lg mb-12">
          <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
          <p className="text-sm mb-4">Get the latest updates and offers directly to your inbox.</p>
          <div className="flex w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-l-lg bg-gray-700 text-white focus:outline-none"
            />
            <button className="bg-red-600 text-white p-3 rounded-r-lg hover:bg-red-700 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* App Store & Google Play Links */}
        <div className="mt-12 flex justify-center space-x-8 w-full">
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <FaApple size={40} className="hover:text-red-600 transition" />
          </a>
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <FaGoogle size={40} className="hover:text-red-600 transition" />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; 2024 FooFlix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
