import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../contexts/ContextProvider";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline, MdOutlineSearch } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contactNumber: yup
    .string()
    .required("Contact Number is required")
    .matches(/^\d{10,11}$/, "Must be 10 or 11 digits"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const Agent = () => {
  const { activeMenu } = useStateContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Submitted Agent:", data);

    reset();
    setIsAddModalOpen(false);
  };

  return (
    <div
      className={`
mx-5 md:mx-5 lg:mx-5
transition-all duration-300 
${activeMenu ? "lg:pl-75" : "lg:pl-25"}
`}
    >
      <div className="text-3xl font-bold text-[#1D4ED8] mb-2">Agent</div>
      <div className="text-sm font-semibold text-gray-500">
        Manage agent account
      </div>

      <div className="flex justify-end gap-5 mt-15">
        <div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <GoPlus className="w-5 h-5" />
            <span className="text-sm">Add Agent</span>
          </button>
        </div>

        {isAddModalOpen && (
          <div className="fixed inset-0 bg-opacity-80 backdrop-blur-xs flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Agent</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName")}
                    className="w-full border p-2 rounded-md px-4 text-sm"
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-red-500 text-xs">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full border p-2 rounded-md px-4 text-sm"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Contact Number"
                    {...register("contactNumber")}
                    className="w-full border p-2 rounded-md px-4 text-sm"
                  />
                  {errors.contactNumber && (
                    <p className="mt-1.5 text-red-500 text-xs">
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="w-full border p-2 rounded-md px-4 text-sm"
                  />
                  {errors.password && (
                    <p className="mt-1.5 text-red-500 text-xs">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-sm border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="items-center gap-2">
          <form action="" className="w-full max-w-md">
            <div className="relative flex item-center text-gray-400 focus-within:text-gray-400">
              <MdOutlineSearch className="w-5 h-5 absolute mt-1.5 ml-3 pointer-events-none" />
              <input
                name="search"
                type="search"
                placeholder="Search keyword..."
                aria-label="Search"
                className="pl-10 w-full py-2 placeholder-gray-400 text-xs outline-1 outline-gray-400 rounded-md"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mt-6">
        <table className="min-w-full border shadow-sm rounded-lg overflow-hidden text-xs sm:text-xs md:text-sm ">
          <thead className="bg-gray-50 text-gray-800">
            <tr>
              <th className="px-4 py-3.5 border border-gray-300">Full Name</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">
                Contact Number
              </th>
              <th className="px-4 py-2 border border-gray-300">Password</th>
              <th className="px-4 py-2 border border-gray-300">Edit</th>
              <th className="px-4 py-2 border border-gray-300">Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="px-4 py-2 border border-gray-300">Agent Name</td>
              <td className="px-4 py-2 border border-gray-300">
                agent@gmail.com
              </td>
              <td className="px-4 py-2 border border-gray-300">09876543210</td>
              <td className="px-4 py-2 border border-gray-300">
                adH*$&JFkqklasdn
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <div className="flex items-center justify-center">
                  <BiSolidEdit className="text-lg" />
                </div>
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <div className="flex items-center justify-center">
                  <MdDeleteOutline className="text-xl" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Agent Name</td>
              <td className="px-4 py-2 border border-gray-300">
                agent@gmail.com
              </td>
              <td className="px-4 py-2 border border-gray-300">09876543210</td>
              <td className="px-4 py-2 border border-gray-300">
                adH*$&JFkqklasdn
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <div className="flex items-center justify-center">
                  <BiSolidEdit className="text-lg" />
                </div>
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <div className="flex items-center justify-center">
                  <MdDeleteOutline className="text-xl" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
