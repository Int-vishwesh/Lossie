import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2d132e] text-white py-6 mt-12">
      <div className="container mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="space-x-4">
          <Link href="/about" className="hover:underline">  
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
      <p className="text-sm text-center mt-2 -mb-2 text-orange-200">
          &copy; {new Date().getFullYear()} Lossie. All rights reserved.
        </p>
    </footer>
  );
}