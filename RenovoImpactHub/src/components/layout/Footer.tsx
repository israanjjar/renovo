import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-2">Renovo</h3>
            <p className="text-sm text-gray-300">
              Community-driven impact for a sustainable future.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Links</h4>
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href="/transparency"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Transparency
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Contact</h4>
            <p className="text-sm text-gray-300">hello@renovo.earth</p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Renovo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
