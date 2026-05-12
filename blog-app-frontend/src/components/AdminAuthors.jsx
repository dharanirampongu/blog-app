import { useEffect, useState } from "react";
import { axiosInstance as axios } from "../axiosConfig";
import { loadingClass, errorClass, emptyStateClass } from "../styles/common";

function AdminAuthors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin-api/users-authors");
      if (res.status === 200) {
        // Filter for AUTHOR role
        const filteredAuthors = res.data.payload.filter(
          (user) => user.role === "AUTHOR"
        );
        setAuthors(filteredAuthors);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch authors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  const toggleAuthorStatus = async (email) => {
    try {
      await axios.patch(`/admin-api/block/${email}`);
      // Refresh list
      getAuthors();
    } catch (err) {
      alert("Failed to update author status");
    }
  };

  if (loading) return <p className={loadingClass}>Loading authors...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  if (authors.length === 0) {
    return <div className={emptyStateClass}>No authors found.</div>;
  }

  return (
    <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#f5f5f7] border-b">
            <th className="p-4 text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
              Name
            </th>
            <th className="p-4 text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
              Email
            </th>
            <th className="p-4 text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
              Status
            </th>
            <th className="p-4 text-xs font-semibold text-[#6e6e73] uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e8e8ed]">
          {authors.map((author) => (
            <tr key={author.email} className="hover:bg-[#fbfbfd] transition">
              <td className="p-4">
                <p className="text-sm font-medium text-[#1d1d1f]">
                  {author.firstName} {author.lastName}
                </p>
              </td>
              <td className="p-4 text-sm text-[#6e6e73]">{author.email}</td>
              <td className="p-4">
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    author.isUserActive
                      ? "bg-[#34c759]/10 text-[#34c759]"
                      : "bg-[#ff3b30]/10 text-[#ff3b30]"
                  }`}
                >
                  {author.isUserActive ? "ACTIVE" : "BLOCKED"}
                </span>
              </td>
              <td className="p-4">
                <button
                  onClick={() => toggleAuthorStatus(author.email)}
                  className={`text-xs font-medium px-4 py-1.5 rounded-full border transition ${
                    author.isUserActive
                      ? "border-[#ff3b30] text-[#ff3b30] hover:bg-[#ff3b30] hover:text-white"
                      : "border-[#34c759] text-[#34c759] hover:bg-[#34c759] hover:text-white"
                  }`}
                >
                  {author.isUserActive ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAuthors;
