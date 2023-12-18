'use client'
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
const ListUser = () => {
    const {data, isLoading, error} = useSWR("/api/dashboard/user", fetcher);
    const users = data?.data?.data
  return (
    <>
      {isLoading ? (
        <div className="w-full bg-white rounded-md p-4">Loading...</div>
      ) : (
        <div className="w-full bg-white rounded-md p-4">
          <h2 className="font-semibold text-primary">List User</h2>
          <div className="w-full h-[75vh] overflow-y-scroll">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="" key={user.id}>
                    <td className="py-2">
                      <a
                        href="mailto:
                          "
                        className="w-44 inline-block truncate"
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className="py-2">{user?.roles[0]?.name}</td>
                    <td className="py-2 flex gap-2">
                      <button className="bg-primary text-white py-1 px-2 rounded-md">
                        Edit
                      </button>
                      <button className="bg-red-600 text-white py-1 px-2 rounded-md">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ListUser;