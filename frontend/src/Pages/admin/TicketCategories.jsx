import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineInventory,
  MdBarChart,
  MdOutlinePointOfSale,
  MdAdd,
} from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import Layout from "../../layout/Layout";

const categories = [
  {
    title: "Qtech Inventory Support System",
    icon: <MdOutlineInventory className="text-3xl" />,
    category: "Inventory Support",
    // gradient: "from-blue-700 to-green-800",
  },
  {
    title: "POS for Retail and F&B",
    icon: <MdOutlinePointOfSale className="text-3xl" />,
    category: "POS Retail",
    // gradient: "from-blue-700 to-yellow-800",
  },
  {
    title: "Qtech Utility Billing System",
    icon: <RiBillLine className="text-3xl" />,
    category: "Utility Billing",
    // gradient: "from-pink-700 to-green-800",
  },
  {
    title: "QSA (Quick and Simple Accounting)",
    icon: <MdBarChart className="text-3xl" />,
    category: "Accounting System",
    // gradient: "from-green-700 to-gray-800",
  },
  {
    title: "Philippine HR, Payroll and Time Keeping System",
    icon: <BsCashCoin className="text-3xl" />,
    category: "HR Payroll System",
    // gradient: "from-blue-700 to-green-800",
  },
];

const AddCategoryModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      gradient: 'from-blue-700 to-green-800' 
    });
    setFormData({
      title: '',
      category: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1D4ED8] text-white rounded-lg hover:bg-[#1E40AF]"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const TicketCategories = () => {
  const { activeMenu, user, login } = useStateContext();
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categoriesList, setCategoriesList] = useState(categories);

  if (!login && !user) {
    return <navigate to="/" />;
  }

  const handleCategoryClick = (category) => {
    navigate("/admin/tickets", { state: { category } });
  };

  const handleAddCategory = (newCategory) => {
    setCategoriesList([...categoriesList, {
      ...newCategory,
      icon: <MdOutlineInventory className="text-3xl" />, 
    }]);
  };

  return (
    <Layout>
      <div
        className={`mx-5 md:mx-5 lg:mx-5 mt-10 md:mt-3 transition-all duration-300 ${
          activeMenu ? "lg:pl-75" : "lg:pl-25"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold text-[#1D4ED8]">Categories</div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1D4ED8] text-white rounded-lg hover:bg-[#1E40AF] transition-colors"
          >
            <MdAdd className="text-xl" />
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categoriesList.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex items-center gap-4 min-w-[250px]"
              onClick={() => handleCategoryClick(item.category)}
            >
              <div className="rounded-xl bg-blue-100 p-3">
                {item.icon}
              </div>
              <div>
                <div className="text-black font-semibold">{item.title}</div>
                <div className="text-2xl font-extrabold text-black">1000</div>
              </div>
            </div>
          ))}
        </div>

        <AddCategoryModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddCategory}
        />
      </div>
    </Layout>
  );
};
