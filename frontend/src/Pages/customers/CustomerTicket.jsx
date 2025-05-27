import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaCreditCard,
  FaUndo,
  FaSearch,
  FaTruck,
  FaDollarSign,
  FaEdit,
  FaQuestionCircle,
} from "react-icons/fa";

const CustomerTicket = () => {
  const { user } = useStateContext();
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto">
        <div className="">
          <div className=" rounded-xl p-6 mb-10 max-w-6xl mx-auto ">
            <div className="mb-5">
              <div className="flex items-center justify-center mb-4">
                <h2 className="text-3xl text-gray-800">FAQs</h2>
              </div>

              <h1 className="text-3xl mb-2 font-bold text-blue-600 text-center">
                Ask us anything
              </h1>

              {/* Subtext */}
              <p className="text-center text-lg text-gray-600 mb-6">
                Have any questions? We're here to assist you.
              </p>

              {/* Search */}
              <div className="relative max-w-md mt-4 mx-auto">
                <FaSearch className="absolute text-xl left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ask your questions..."
                  className="w-full border border-gray-300 text-lg rounded-lg pl-13 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mb-10 max-w-6xl mx-auto  text-justify">
            {/* Card 1 */}
            <div className="p-6 ">
              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-blue-500 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    How do I change my account email?
                  </h3>
                  <p className="text-sm text-gray-600">
                    You can log in to your account and change it from your
                    Profile Edit Profile. Then go to the general tab to change
                    your email.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className=" p-6 ">
              <div className="flex items-start space-x-4">
                <FaCreditCard className="text-blue-500 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    What should I do if my payment fails?
                  </h3>
                  <p className="text-sm text-gray-600">
                    If your payment fails, you can use the (COD) payment option,
                    if available on that order. If your payment is debited from
                    your account after a payment failure, it will be credited
                    back within 7-10 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <FaUndo className="text-blue-500 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    What is your cancellation policy?
                  </h3>
                  <p className="text-sm text-gray-600">
                    You can now cancel an order when it is in packed/shipped
                    status. Any amount paid will be credited into the same
                    payment mode using which the payment was made.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className=" p-6 ">
              <div className="flex items-start space-x-4">
                <FaTruck className="text-blue-500 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    How do I check order delivery status?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Please tap on "My Orders" section under main menu of
                    App/Website/M-site to check your order status.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className=" p-6 ">
              <div className="flex items-start space-x-4">
                <FaDollarSign className="text-blue-500 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    What is Instant Refunds?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Upon successful pickup of the return product at your
                    doorstep, Myntra will instantly initiate the refund to your
                    source account or chosen method of refund. Instant Refunds
                    is not available in a few select pin codes and for all self
                    ship returns.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className=" p-6 ">
              <div className="flex items-start space-x-4">
                <FaEdit className="text-blue-500 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    Can I update my ticket after submitting it?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Yes, you can update your ticket by adding comments or
                    attachments. However, some details may not be editable after
                    submission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTicket;
