import React from "react";

interface FooterLink {
  title: string;
  url: string;
}

interface FooterProps {
  links?: FooterLink[];
  copyright?: string;
}

const Footer: React.FC<FooterProps> = ({
  links = [
    { title: "Terms", url: "#" },
    { title: "Privacy", url: "#" },
    { title: "Contact", url: "#" },
  ],
  copyright = "© 2025 YUZU Lottery. All rights reserved.",
}) => {
  return (
    <footer className="py-8 mt-8 text-center">
      <div className="flex justify-center gap-4 mb-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="text-white hover:text-yuzu-green"
          >
            {link.title}
          </a>
        ))}
      </div>
      <div className="text-sm text-gray-400">{copyright}</div>
    </footer>
  );
};

export default Footer;
