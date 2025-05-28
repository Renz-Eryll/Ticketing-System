import React from "react";
import QtechLogo from "../assets/qtechlogo.png";

export const TermsAndConditions = () => {
  return (
    <div
      className={`transition-all duration-300 bg-gray-100 overflow-auto scroll-smooth`}
    >
      <div className="bg-blue-500 text-white px-15 lg:px-35 py-15 lg:py-25 mb-3 flex flex-col lg:flex-row items-center justify-between shadow-md bg-contain bg-center">
        <div className="flex flex-col items-center space-y-2  mx-auto mt-2">
          <h1 className="text-2xl lg:text-4xl font-bold text-center lg:text-left">
            Terms and Conditions
          </h1>
        </div>
      </div>
      <div className=" p-8 max-w-5xl mx-auto text-justify">
        <div className="flex">
          <div className="text-xl  flex justify-center text-justify">
            Welcome to the Qtech Business Solution, Inc. Ticketing System. By
            accessing or using our platform, you agree to comply with and be
            bound by the following Terms and Conditions. Please read them
            carefully.
          </div>
        </div>
        <div className="pt-5 flex text-justify">
          <div className="text-md text-justify">
            <div className="pt-10">
              <h2 className="text-xl font-semibold text-gray-800">
                1. Use of Service
              </h2>
              <p className="pt-3 text-gray-600">
                • This platform is intended for submitting inquiries, concerns,
                or support requests related to the services of Qtech Business
                Solution, Inc.
              </p>
              <p className="pt-3 text-gray-600">
                • Any misuse of the system for spam, abusive language, or
                unrelated issues is strictly prohibited.
              </p>
            </div>

            <div className="pt-10">
              <h2 className="text-xl  font-semibold text-gray-800">
                2. Account Registration
              </h2>
              <p className="pt-3 text-gray-600">
                • You must provide accurate and complete information when
                creating an account.
              </p>
              <p className="pt-3 text-gray-600">
                • You are responsible for maintaining the confidentiality of
                your login credentials.
              </p>
            </div>
            <div className="pt-10">
              <h2 className="text-xl font-semibold text-gray-800">
                3. Data Collection
              </h2>
              <p className="pt-3 text-gray-600">
                • We collect basic personal information such as your name and
                email address solely for the purpose of providing support.
              </p>
              <p className="pt-3 text-gray-600">
                • All data will be handled securely and in accordance with our
                Privacy Policy.
              </p>
            </div>
            <div className="pt-10">
              <h2 className="text-xl font-semibold text-gray-800">
                4. Response Time
              </h2>
              <p className="pt-3 text-gray-600">
                • We aim to respond to all submitted tickets within a reasonable
                timeframe, but response times may vary depending on volume and
                issue complexity.
              </p>
            </div>
            <div className="pt-10">
              <h2 className="text-xl font-semibold text-gray-800">
                5. System Changes
              </h2>
              <p className="pt-3 text-gray-600">
                • Qtech Business Solution, Inc. reserves the right to update,
                modify, or discontinue any part of the system at any time
                without prior notice.
              </p>
            </div>
            <div className="pt-10">
              <h2 className="text-xl font-semibold text-gray-800">
                6. Limitation of Liability
              </h2>
              <p className="pt-3 text-gray-600">
                • Qtech Business Solution, Inc. is not liable for any loss or
                damage arising from the use or inability to use the support
                system, unless caused by gross negligence on our part.  
              </p>
            </div>
            <div className="pt-10">
              <h2 className="text-xl font-semibold text-gray-800">
                7. Intellectual Property
              </h2>
              <p className="pt-3 text-gray-600">
                • All content and materials within this platform, including
                system design and branding, are the intellectual property of
                Qtech Business Solution, Inc.
              </p>
            </div>
            <div className="pt-10">
              <h2 className="text-xl font-semibold text-gray-800">
                8. Confidentiality
              </h2>
              <p className="pt-3 text-gray-600">
                • All information shared through the support ticketing system
                shall be treated as confidential. Both Qtech Business Solution,
                Inc. and the user are expected to handle sensitive information
                responsibly.
              </p>
            </div>
            <div className="pt-10">
              <h5 className="text-xl font-semibold text-gray-800">
                9. Third-Party Services
              </h5>
              <p className="pt-3 text-gray-600">
                • The ticketing system may integrate with third-party tools or
                services. Qtech Business Solution, Inc. is not responsible for
                any data handled by these external platforms, and users are
                encouraged to review their respective privacy policies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#0C0C24] text-white mt-10 p-8 pl-35 grid md:grid-cols-3 gap-8">
        <div>
          <img src={QtechLogo} alt="Qtech Logo" className="h-24 mb-2" />
          <p>Follow us on :</p>
          <div className="flex gap-2 mt-2">
            <a
              href="https://www.facebook.com/qtechbsi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                className="text-white hover:text-blue-500 transition"
              >
                <path
                  fill="currentColor"
                  d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                />
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/qtechbsi?igsh=bDlwbWUyN2pldW40"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                className="text-white hover:text-pink-500 transition"
              >
                <path
                  fill="currentColor"
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                />
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-2">Service Offered</h4>
          <ul className="text-sm space-y-1">
            <li>Software Development Outsourcing</li>
            <li>Website Development and Hosting</li>
            <li>ICT Hardware Infrastructure Set up and Maintenance</li>
            <li>Systems Development and Database Administration</li>
            <li>Systems Integration</li>
            <li>
              ICT Human Resource Outsourcing Enterprise Application Integration
            </li>
            <li>ICT Training</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Office Address</h4>
          <p>Birch St. LM, Tayabas City - Quezon</p>
          <p>P: (042) 731 7482</p>
          <p>M: 09175063284 | 09228423284</p>
          <p>M: wecare@qtechbsi.com</p>
        </div>
      </footer>

      <div className="text-center text-xs py-2 bg-[#0C0C24] text-gray-400">
        © All Copyrights reserved
      </div>
    </div>
  );
};

export default TermsAndConditions;
