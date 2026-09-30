"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {

  return (
    <footer className="bg-[#0F4C5C] pt-16 pb-8">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-white">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="CareBridge Logo"
                width={55}
                height={55}
                className="object-contain"
              />

              <h2 className="font-bold text-2xl">CareBridge</h2>
            </Link>

            <p className="text-sm text-teal-100 mt-4 leading-6">
              Connecting people who need help with those who are willing to
              make a difference.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-xl">Quick Links</h2>

            <ul className="space-y-2 text-teal-100">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#FB8B24] transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/help-requests"
                  className="hover:text-[#FB8B24] transition"
                >
                  Help Requests
                </Link>
              </li>

              <li>
                <Link
                  href="/donate"
                  className="hover:text-[#FB8B24] transition"
                >
                  Donate
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-[#FB8B24] transition"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-xl">Need Help?</h2>

            <p className="text-teal-100 text-sm leading-6">
              If you or someone you know needs support, you can create a help
              request and reach out to our community.
            </p>

            <Link
              href="/get-help"
              className="inline-block mt-2 bg-[#FB8B24] hover:bg-[#E36414] text-white px-5 py-2.5 rounded-lg font-medium transition"
            >
              Get Help
            </Link>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-xl">Contact Us</h2>

            <div className="space-y-2 text-teal-100 text-sm">
              <p>Location: Sylhet, Bangladesh</p>
              <p>Phone: 017xxxxxxxxx</p>
              <p>Email: support@carebridge.com</p>
            </div>

            <div className="flex gap-4 mt-5">
              <a
                href="#"
                className="hover:text-[#FB8B24] transition"
              >
                <AiFillInstagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="hover:text-[#FB8B24] transition"
              >
                <FaFacebookSquare className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="hover:text-[#FB8B24] transition"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-teal-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-teal-100 text-sm">
          <p>© 2026 CareBridge. All rights reserved.</p>

          <div className="flex gap-5 mt-3 md:mt-0">
            <Link
              href="/privacy-policy"
              className="hover:text-[#FB8B24] transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-[#FB8B24] transition"
            >
              Terms
            </Link>

            <Link
              href="/cookies"
              className="hover:text-[#FB8B24] transition"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;