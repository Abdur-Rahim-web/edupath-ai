import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold text-indigo-600"
            >
              EduPath AI
            </Link>

            <p className="mt-4 text-slate-600 text-sm leading-7 max-w-md">
              Empowering learners through AI-powered personalized education.
              Discover high-quality online courses, track your learning
              journey, and grow your career with EduPath AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  href="/"
                  className="text-slate-600 hover:text-indigo-600"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/explore"
                  className="text-slate-600 hover:text-indigo-600"
                >
                  Explore Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-indigo-600"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-indigo-600"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">
              Support
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  href="/faq"
                  className="text-slate-600 hover:text-indigo-600"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-slate-600 hover:text-indigo-600"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-slate-600 hover:text-indigo-600"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-indigo-600"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="text-slate-600 hover:text-indigo-600"
                >
                  Register
                </Link>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} EduPath AI. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">

            <Link
              href="/about"
              className="text-slate-500 hover:text-indigo-600"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-slate-500 hover:text-indigo-600"
            >
              Contact
            </Link>

            <Link
              href="/faq"
              className="text-slate-500 hover:text-indigo-600"
            >
              FAQ
            </Link>

            <Link
              href="/terms"
              className="text-slate-500 hover:text-indigo-600"
            >
              Terms
            </Link>

            <Link
              href="/privacy"
              className="text-slate-500 hover:text-indigo-600"
            >
              Privacy
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;