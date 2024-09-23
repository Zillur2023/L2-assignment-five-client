export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-400">
                Your one-stop shop for premium fitness equipment and accessories.
                We are dedicated to helping you achieve your fitness goals with
                high-quality products and exceptional customer service.
              </p>
            </div>
            {/* Links Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            {/* Customer Service Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Return Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            {/* Contact Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-gray-400 mb-2">123 Fitness Avenue, Suite 100</p>
              <p className="text-gray-400 mb-2">New York, NY 10001</p>
              <p className="text-gray-400 mb-2">Email: support@fitnessstore.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-6">
                <a href="#" aria-label="Facebook" className="hover:text-gray-400">
                  {/* Replace with proper icons */}
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.964 0 0 .964 0 2.675v18.65C0 23.036.964 24 2.675 24h10.676V14.706h-2.903v-3.6h2.903V8.856c0-2.875 1.76-4.438 4.33-4.438 1.228 0 2.286.091 2.595.132v3.01l-1.78.001c-1.4 0-1.67.667-1.67 1.64v2.151h3.348l-.436 3.6h-2.911V24h5.704c1.711 0 2.675-.964 2.675-2.675V2.675C24 .964 23.036 0 22.675 0z" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-gray-400">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.176-.897-.955-2.173-1.555-3.594-1.555-2.717 0-4.92 2.204-4.92 4.92 0 .385.044.76.126 1.124C7.688 8.094 4.064 6.13 1.64 3.161c-.423.723-.666 1.561-.666 2.475 0 1.708.87 3.213 2.191 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.697 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.621-.03-.921-.086.622 1.941 2.428 3.355 4.566 3.396-1.675 1.309-3.787 2.091-6.077 2.091-.394 0-.779-.023-1.161-.068 2.168 1.391 4.743 2.203 7.513 2.203 9.016 0 13.947-7.463 13.947-13.945 0-.21-.004-.42-.013-.63.959-.695 1.8-1.562 2.46-2.549z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-gray-400">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.976 1.248 2.242 1.31 3.608.059 1.267.071 1.647.071 4.85s-.012 3.584-.071 4.85c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.059-1.646.071-4.85.071s-3.584-.012-4.85-.071c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.059-1.267-.071-1.647-.071-4.85s.012-3.584.071-4.85c.062-1.366.335-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.267-.059 1.647-.071 4.85-.071m0-2.163c-3.257 0-3.667.013-4.947.072-1.275.059-2.66.319-3.659 1.318s-1.26 2.384-1.318 3.659c-.059 1.281-.072 1.691-.072 4.947s.013 3.667.072 4.947c.059 1.275.319 2.66 1.318 3.659s2.384 1.26 3.659 1.318c1.281.059 1.691.072 4.947.072s3.667-.013 4.947-.072c1.275-.059 2.66-.319 3.659-1.318s1.26-2.384 1.318-3.659c.059-1.281.072-1.691.072-4.947s-.013-3.667-.072-4.947c-.059-1.275-.319-2.66-1.318-3.659s-2.384-1.26-3.659-1.318c-1.281-.059-1.691-.072-4.947-.072zm0 5.838c-3.193 0-5.788 2.595-5.788 5.788s2.595 5.788 5.788 5.788 5.788-2.595 5.788-5.788-2.595-5.788-5.788-5.788zm0 9.533c-2.07 0-3.745-1.675-3.745-3.745s1.675-3.745 3.745-3.745 3.745 1.675 3.745 3.745-1.675 3.745-3.745 3.745zm6.406-10.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">© 2024 Fitness Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  