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
          <tr className="bg-[#f5f3ff] border-b">
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
        <tbody className="divide-y divide-[#ddd6fe]">
          {authors.map((author) => (
            <tr key={author.email} className="hover:bg-[#f5f3ff] transition">
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
                      ? "bg-[#f43f5e]/10 text-[#9f1239]"
                      : "bg-[#475569]/10 text-[#475569]"
                  } shadow-sm border border-rose-100/50`}
                >
                  {author.isUserActive ? "ACTIVE" : "BLOCKED"}
                </span>
              </td>
              <td className="p-4">
                <button
                  onClick={() => toggleAuthorStatus(author.email)}
                  className={`text-xs font-medium px-4 py-1.5 rounded-full border transition ${
                    author.isUserActive
                      ? "border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white"
                      : "border-[#f43f5e] text-[#f43f5e] hover:bg-[#f43f5e] hover:text-white"
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
