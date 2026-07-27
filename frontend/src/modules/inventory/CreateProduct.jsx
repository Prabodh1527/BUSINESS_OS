import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Boxes,
  IndianRupee,
  User,
} from "lucide-react";


export default function CreateProduct() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    supplier: "",
    status: "In Stock",
  });



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Product added successfully");

    console.log(formData);

    navigate("/inventory");

  };



  return (

    <div className="space-y-6 p-8">


      {/* Header */}

      <div>

        <Link
          to="/inventory"
          className="mb-3 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={16}/>
          Back to Inventory
        </Link>


        <h1 className="text-3xl font-bold text-white">
          Add Product
        </h1>


        <p className="mt-1 text-slate-400">
          Add a new product to your inventory.
        </p>


      </div>





      {/* Form */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">


        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-2"
        >



          {/* Product Name */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Product Name
            </label>


            <div className="relative">

              <Package
                size={18}
                className="absolute left-3 top-3.5 text-slate-500"
              />


              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
                required
              />


            </div>

          </div>





          {/* Category */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Category
            </label>


            <div className="relative">

              <Boxes
                size={18}
                className="absolute left-3 top-3.5 text-slate-500"
              />


              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Hair Care, Skin Care..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
                required
              />


            </div>


          </div>





          {/* Stock */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Stock Quantity
            </label>


            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
              required
            />


          </div>





          {/* Price */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Price
            </label>


            <div className="relative">

              <IndianRupee
                size={18}
                className="absolute left-3 top-3.5 text-slate-500"
              />


              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
                required
              />


            </div>


          </div>





          {/* Supplier */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Supplier
            </label>


            <div className="relative">

              <User
                size={18}
                className="absolute left-3 top-3.5 text-slate-500"
              />


              <input
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                placeholder="Supplier name"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
              />


            </div>


          </div>





          {/* Status */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Status
            </label>


            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
            >

              <option>
                In Stock
              </option>

              <option>
                Low Stock
              </option>

              <option>
                Out of Stock
              </option>


            </select>


          </div>





          {/* Buttons */}

          <div className="flex justify-end gap-4 md:col-span-2">


            <Link
              to="/inventory"
              className="rounded-xl border border-slate-700 px-6 py-3 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Link>



            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-500"
            >
              Save Product
            </button>


          </div>



        </form>


      </div>


    </div>

  );

}