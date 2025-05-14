// src/components/layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // You can make these dynamic later
  const footerLinks = {
    features: [
      { name: "Trip Management", href: "#" },
      { name: "Expense Tracking", href: "#" },
      { name: "Balance Calculation", href: "#" },
      { name: "Group Invitations", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">EpicMiles</h3>
            <p className="text-gray-400">Making group travel finances simple and stress-free since 2023.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              {footerLinks.features.map(link => (
                <li key={link.name}><Link to={link.href} className="hover:text-white">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              {footerLinks.company.map(link => (
                <li key={link.name}><Link to={link.href} className="hover:text-white">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              {footerLinks.legal.map(link => (
                <li key={link.name}><Link to={link.href} className="hover:text-white">{link.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} EpicMiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;