import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { MdOutlineSearch } from "react-icons/md";
import { GoPlus } from "react-icons/go";

import { useStateContext } from "../../contexts/ContextProvider";

// Validation schema
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

//kunyareng agent data
const data = [
  {
    fullName: "Ako si Agent",
    email: "agent1@gmail.com",
    contactNumber: "09876543210",
    password: "Alk@*KJ(dasd",
  },

  {
    fullName: "Ako si Agent2",
    email: "agent2@gmail.com",
    contactNumber: "09123456789",
    password: "p@ssw0rd",
  },
];

export const Agent = () => {
  const { activeMenu } = useStateContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEdit = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsViewModalOpen(false);
  };

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

      <div className="flex flex-col sm:flex-row justify-end gap-5 mt-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <GoPlus className="w-5 h-5" />
          <span className="text-sm">Add Agent</span>
        </button>

        {/* Search Bar */}
        <form action="" className="w-full sm:w-auto max-w-md">
          <div className="relative flex items-center text-gray-400 focus-within:text-gray-400">
            <MdOutlineSearch className="w-5 h-5 absolute ml-3 pointer-events-none" />
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

      <div className="max-w mt-6 p-6 py-10 border border-gray-100 shadow-sm rounded-xl bg-white space-y-2">
        {/* Headers - visible on desktop */}
        <div className="hidden md:grid grid-cols-[repeat(4,_1fr)] text-center font-semibold text-gray-600 text-sm py-2">
          <div>Full Name</div>
          <div>Email</div>
          <div>Contact Number</div>
          <div>Password</div>
        </div>

        {/* Data */}
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => handleRowClick(item)}
            className="bg-[#EEF0FF] rounded-md text-sm text-gray-700 py-3 px-4 cursor-pointer hover:bg-[#dfe3ff] transition
                 grid md:grid-cols-[repeat(4,_1fr)] items-center gap-2"
          >
            <div className="hidden md:block truncate text-center">
              {item.fullName}
            </div>
            <div className="hidden md:block truncate text-center">
              {item.email}
            </div>
            <div className="hidden md:block truncate text-center">
              {item.contactNumber}
            </div>
            <div className="hidden md:block truncate text-center">
              {item.password}
            </div>

            <div className="md:hidden space-y-1">
              <div>
                <span className="font-semibold">Full Name:</span>{" "}
                {item.fullName}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {item.email}
              </div>
              <div>
                <span className="font-semibold">Contact:</span>{" "}
                {item.contactNumber}
              </div>
              <div>
                <span className="font-semibold">Password:</span> {item.password}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Agent Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 px-4">
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>

          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 md:p-12 space-y-6 overflow-y-auto max-h-[90vh]">
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

              <div className="flex flex-col md:flex-row justify-end gap-3 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Agent
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm border rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Agent Table Modal*/}
      {isViewModalOpen && selectedUser && (
        <div className="fixed inset-0 flex justify-center items-center z-50 px-4">
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>

          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 md:p-12 space-y-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg font-semibold">Agent Information</h2>

            <div className="space-y-4 text-sm">
              <div className="border p-2 rounded-md px-4">
                {selectedUser.fullName}
              </div>
              <div className="border p-2 rounded-md px-4">
                {selectedUser.email}
              </div>
              <div className="border p-2 rounded-md px-4">
                {selectedUser.contactNumber}
              </div>
              <div className="border p-2 rounded-md px-4">
                {selectedUser.password}
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-end gap-3 mt-6">
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => alert("Delete logic here")}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={closeViewModal}
                className="px-4 py-2 text-sm border rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Agent Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 flex justify-center items-center z-50 px-4">
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>

          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 md:p-12 space-y-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg font-semibold">Edit Agent</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  defaultValue={selectedUser.fullName}
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
                  defaultValue={selectedUser.email}
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
                  defaultValue={selectedUser.contactNumber}
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
                  defaultValue={selectedUser.password}
                  {...register("password")}
                  className="w-full border p-2 rounded-md px-4 text-sm"
                />
                {errors.password && (
                  <p className="mt-1.5 text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-end gap-3 mt-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 text-sm border rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Agent;
