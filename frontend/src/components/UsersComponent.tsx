import { useState } from "react"

interface User {
    id: number,
    name: string,
    email: string
}

const AdminUserTable = ({userlist}: {userlist: User[]}) => {
    const [users, setUsers] = useState<User[]>(userlist)
    const [editingUser, setEditingUser] = useState<number>(0);
    const [editForm, setEditForm] = useState({ name: '', email: '' });
  
    const handleEdit = (user:User) => {
      setEditingUser(user.id);
      setEditForm({ name: user.name, email: user.email });
    };
  
    const handleDelete = (userId: number) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        setUsers(users.filter(user => user.id !== userId));
      }
    };
  
    const handleSave = (userId: number) => {
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, name: editForm.name, email: editForm.email }
          : user
      ));
      setEditingUser(0);
    };
  
    const handleCancel = () => {
      setEditingUser(0);
      setEditForm({ name: '', email: '' });
    };

  return (
    <div className="p-4 space-y-4 w-[80vw]">
      

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-zinc-300">
          <tr>
              <th className="w-1/7 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
              <th className="w-3/7 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="w-3/7 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="w-2/7 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-200">
                <td className="w-1/7 px-6 py-4 text-sm text-gray-900">
                <div className="h-8 flex items-center"></div>
                  {user.id}
                </td>
                <td className="w-3/7 px-6 py-4 text-sm text-gray-900">
                <div className="h-8 flex items-center">
                {editingUser === user.id ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="border rounded px-2 "
                    />
                  ) : (
                    user.name
                  )}
                </div>                
                </td>
                <td className="w-3/7 px-6 py-4  text-sm text-gray-900">
                <div className="h-8 flex items-center">
                {editingUser === user.id ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="border rounded px-2"
                    />
                  ) : (
                    user.email
                  )}
                </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap ">
                {editingUser === user.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(user.id)}
                        className="text-green-600 hover:text-green-800 "
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-zinc-400 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserTable;
