import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>

      <p className="text-2xl font-bold text-gray-800 mb-2">
        Oops — Page Not Found
      </p>
      <p className="text-gray-600 mb-6 text-center max-w-sm">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-full hover:bg-blue-600 transition"
      >
        <ArrowLeft size={18} />
        Go Back Home
      </Link>
    </div>
  );
};
