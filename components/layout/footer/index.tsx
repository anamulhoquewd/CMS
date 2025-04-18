import { Button } from "@/components/ui/button";
import { Github, SquareCode } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-4 w-full shrink-0 items-center">
      <p className="text-xs text-gray-500">
        © {currentYear} Avanmul Hoque. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex items-center gap-4 sm:gap-6 text-xs text-gray-500">
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Contact Us</span>
        <Link target="_blank" href="https://github.com/anamulhoquewd/CMS">
          <Button className="cursor-pointer" size={"icon"} variant="outline">
            <Github />
          </Button>
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
