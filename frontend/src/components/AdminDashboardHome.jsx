const AdminDashboardHome = ({ projects, certificates }) => {

  return (
    <div>
      <h2 className="text-3xl font-bold mb-10">Dashboard Overview</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold">Total Projects</h3>
          <p className="text-4xl font-bold mt-4">{projects?.projects?.length || 0}</p>
        </div>

        <div className="bg-green-600 text-white p-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold">Total Certificates</h3>
          <p className="text-4xl font-bold mt-4">{certificates?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;