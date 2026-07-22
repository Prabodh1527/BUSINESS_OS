import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Search,
  Trash2,
  Edit,
  X,
  Save,
} from "lucide-react";


const initialUsers = [

  {
    id: 1,
    name: "Prabodh",
    email: "owner@glowstudio.com",
    role: "Owner",
    status: "Active",
  },

  {
    id: 2,
    name: "Rahul Kumar",
    email: "rahul@glowstudio.com",
    role: "Manager",
    status: "Active",
  },

  {
    id: 3,
    name: "Priya Sharma",
    email: "priya@glowstudio.com",
    role: "Employee",
    status: "Active",
  },

  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha@glowstudio.com",
    role: "Employee",
    status: "Inactive",
  },

];



export default function Users() {


  const [users, setUsers] = useState(initialUsers);

  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");

  const [editingUser, setEditingUser] = useState(null);



  const [form, setForm] = useState({

    name: "",
    email: "",
    role: "Employee",
    status: "Active",

  });





  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };





  const openAddForm = () => {

    setEditingUser(null);

    setForm({

      name: "",
      email: "",
      role: "Employee",
      status: "Active",

    });

    setShowForm(true);

  };






  const openEditForm = (user) => {

    setEditingUser(user);

    setForm({

      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,

    });

    setShowForm(true);

  };







  const saveUser = (e) => {

    e.preventDefault();



    if (editingUser) {


      setUsers(

        users.map((user) =>

          user.id === editingUser.id

            ? {
                ...user,
                ...form,
              }

            : user

        )

      );


    } 
    else {


      setUsers([

        ...users,

        {
          ...form,
          id: Date.now(),
        },

      ]);


    }



    setShowForm(false);

    setEditingUser(null);



    setForm({

      name: "",
      email: "",
      role: "Employee",
      status: "Active",

    });


  };







  const deleteUser = (id) => {


    setUsers(

      users.filter(

        (user) => user.id !== id

      )

    );


  };







  const filteredUsers = users.filter((user) =>

    user.name

      .toLowerCase()

      .includes(search.toLowerCase())

  );







  return (

    <div className="space-y-6">





      {/* Header */}


      <div className="flex items-center justify-between">


        <div>


          <Link

            to="/settings"

            className="mb-3 block text-sm text-slate-400 hover:text-white"

          >

            ← Back to Settings

          </Link>



          <h1 className="text-3xl font-bold text-white">

            Users

          </h1>



          <p className="mt-1 text-slate-400">

            Manage owner, managers and employee accounts.

          </p>


        </div>






        <button

          onClick={openAddForm}

          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"

        >

          <UserPlus size={18}/>

          Add User

        </button>



      </div>









      {/* Form */}



      {

        showForm && (

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


            <div className="mb-5 flex justify-between">


              <h2 className="text-xl font-semibold text-white">

                {editingUser ? "Edit User" : "Create User Account"}

              </h2>



              <button

                onClick={() => setShowForm(false)}

              >

                <X/>

              </button>


            </div>







            <form

              onSubmit={saveUser}

              className="grid gap-4 md:grid-cols-2"

            >



              <input

                name="name"

                value={form.name}

                onChange={handleChange}

                placeholder="Full Name"

                className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

              />





              <input

                name="email"

                value={form.email}

                onChange={handleChange}

                placeholder="Email"

                className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

              />







              <select

                name="role"

                value={form.role}

                onChange={handleChange}

                className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

              >

                <option>Employee</option>

                <option>Manager</option>

                <option>Owner</option>


              </select>







              <select

                name="status"

                value={form.status}

                onChange={handleChange}

                className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

              >

                <option>Active</option>

                <option>Inactive</option>


              </select>








              <button

                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 p-3 text-white"

              >

                <Save size={18}/>

                {editingUser ? "Update User" : "Create User"}

              </button>



            </form>



          </div>

        )

      }









      {/* Search */}



      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">


        <div className="relative max-w-md">


          <Search

            size={18}

            className="absolute left-3 top-3 text-slate-500"

          />



          <input

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            placeholder="Search users..."

            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2 pl-10 text-white"

          />


        </div>


      </div>









      {/* Table */}



      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">


        <table className="w-full">


          <thead className="border-b border-slate-800 bg-slate-800/40">


            <tr className="text-left text-sm text-slate-400">


              <th className="p-4">
                User
              </th>


              <th>
                Email
              </th>


              <th>
                Role
              </th>


              <th>
                Status
              </th>


              <th>
                Actions
              </th>


            </tr>


          </thead>





          <tbody>


            {

              filteredUsers.map((user)=>(


                <tr

                  key={user.id}

                  className="border-b border-slate-800 hover:bg-slate-800/30"

                >



                  <td className="p-4 font-medium text-white">

                    {user.name}

                  </td>



                  <td>

                    {user.email}

                  </td>




                  <td>

                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400">

                      {user.role}

                    </span>

                  </td>




                  <td>


                    <span

                      className={`rounded-full px-3 py-1 text-xs ${
                        
                        user.status==="Active"

                        ?

                        "bg-emerald-500/10 text-emerald-400"

                        :

                        "bg-red-500/10 text-red-400"

                      }`}

                    >

                      {user.status}

                    </span>


                  </td>






                  <td>


                    <div className="flex gap-2">


                      <button

                        onClick={()=>openEditForm(user)}

                        className="rounded-lg border border-slate-700 p-2 hover:border-indigo-500"

                      >

                        <Edit size={15}/>

                      </button>






                      <button

                        onClick={()=>deleteUser(user.id)}

                        className="rounded-lg bg-red-500/20 p-2 text-red-400"

                      >

                        <Trash2 size={15}/>

                      </button>



                    </div>


                  </td>



                </tr>


              ))

            }



          </tbody>


        </table>


      </div>





    </div>

  );


}