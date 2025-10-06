"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f0f2f5] border-t border-gray-200 py-6 mt-2">
      <div className="max-w-3xl mx-auto px-4 text-center text-gray-500 text-sm">
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-2">
          <li><a href="#" className="hover:underline">English (US)</a></li>
          <li><a href="#" className="hover:underline">Filipino</a></li>
          <li><a href="#" className="hover:underline">Bisaya</a></li>
        </ul>
        <div className="mb-2">
          © {new Date().getFullYear()} MORESCO-II
        </div>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <li><a href="#" className="hover:underline">Privacy</a></li>
          <li><a href="#" className="hover:underline">Terms</a></li>
          <li><a href="#" className="hover:underline">Help</a></li>
        </ul>
      </div>
    </footer>
  );
}