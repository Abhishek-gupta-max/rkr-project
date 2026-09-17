import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../../components/common/Loader/Loader';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/admin/dashboard.php');
        setData(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  const stats = data?.stats || {
    total_apps: 0,
    new_apps: 0,
    pending_apps: 0,
    under_review_apps: 0,
    shortlisted_apps: 0,
    selected_apps: 0,
    rejected_apps: 0,
    on_hold_apps: 0
  };

  const tradeBreakdown = data?.trade_breakdown || [];
  const latestApps = data?.latest_applications || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0047ba] font-heading leading-tight">Welcome back, {user || 'admin'}!</h1>
          <p className="text-slate-500 text-sm mt-1">Recruitment summary and trade category analytics.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/applications" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-sm transition-all">
            View All Applications
          </Link>
          <Link to="/admin/requirements" className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-sm shadow-sm transition-all">
            Manage Job Openings
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-semibold max-w-lg">
          {error}
        </div>
      )}

      {/* Stats Cards — 6 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Total Applications */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm border border-slate-800">
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Total Apps</p>
          <h3 className="text-3xl font-extrabold font-heading mt-2">{stats.total_apps}</h3>
          <p className="text-slate-400 text-[10px] mt-1">Submitted applications</p>
        </div>

        {/* New */}
        <div className="bg-amber-500 text-white rounded-2xl p-5 shadow-sm border border-amber-600">
          <p className="text-amber-100 text-[11px] font-bold uppercase tracking-wider">New / Pending</p>
          <h3 className="text-3xl font-extrabold font-heading mt-2">{stats.new_apps || stats.pending_apps}</h3>
          <p className="text-amber-100 text-[10px] mt-1">Awaiting review</p>
        </div>

        {/* Under Review */}
        <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-sm border border-blue-700">
          <p className="text-blue-100 text-[11px] font-bold uppercase tracking-wider">Under Review</p>
          <h3 className="text-3xl font-extrabold font-heading mt-2">{stats.under_review_apps}</h3>
          <p className="text-blue-100 text-[10px] mt-1">In evaluation</p>
        </div>

        {/* Shortlisted */}
        <div className="bg-purple-600 text-white rounded-2xl p-5 shadow-sm border border-purple-700">
          <p className="text-purple-100 text-[11px] font-bold uppercase tracking-wider">Shortlisted</p>
          <h3 className="text-3xl font-extrabold font-heading mt-2">{stats.shortlisted_apps}</h3>
          <p className="text-purple-100 text-[10px] mt-1">Ready for client</p>
        </div>

        {/* Selected */}
        <div className="bg-emerald-600 text-white rounded-2xl p-5 shadow-sm border border-emerald-700">
          <p className="text-emerald-100 text-[11px] font-bold uppercase tracking-wider">Selected</p>
          <h3 className="text-3xl font-extrabold font-heading mt-2">{stats.selected_apps || stats.approved_apps}</h3>
          <p className="text-emerald-100 text-[10px] mt-1">Approved for deployment</p>
        </div>

        {/* Rejected */}
        <div className="bg-red-600 text-white rounded-2xl p-5 shadow-sm border border-red-700">
          <p className="text-red-100 text-[11px] font-bold uppercase tracking-wider">Rejected</p>
          <h3 className="text-3xl font-extrabold font-heading mt-2">{stats.rejected_apps}</h3>
          <p className="text-red-100 text-[10px] mt-1">Unsuitable profiles</p>
        </div>

      </div>

      {/* Category-Wise Applications Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 font-heading">Category-Wise Applications</h2>
            <p className="text-slate-400 text-xs mt-0.5">Click any trade category to view filtered applications.</p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
            {tradeBreakdown.length} Active Trade Categories
          </span>
        </div>

        {tradeBreakdown.length === 0 ? (
          <p className="text-slate-400 text-sm py-4 text-center">No applications submitted yet to aggregate trade statistics.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {tradeBreakdown.map((item, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/admin/applications?trade=${encodeURIComponent(item.trade)}`)}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between group"
              >
                <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700 truncate pr-2">
                  {item.trade}
                </span>
                <span className="text-xs font-extrabold px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-blue-900 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex-shrink-0">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Latest Submissions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 font-heading">Recent Job Applications</h2>
          <Link to="/admin/applications" className="text-blue-600 hover:text-blue-700 text-xs font-bold">
            View All Applications →
          </Link>
        </div>

        <div className="overflow-x-auto">
          {latestApps.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              <span className="text-4xl block mb-2">📋</span>
              No applications submitted yet.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-3.5 font-bold text-slate-400 uppercase tracking-wider">App ID</th>
                  <th className="px-6 py-3.5 font-bold text-slate-400 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3.5 font-bold text-slate-400 uppercase tracking-wider">Trade / Skill</th>
                  <th className="px-6 py-3.5 font-bold text-slate-400 uppercase tracking-wider">Applied Date</th>
                  <th className="px-6 py-3.5 font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {latestApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-amber-600 whitespace-nowrap">
                      {app.application_id}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{app.name || app.full_name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{app.email || app.phone}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {app.trade_category || app.job_position}
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">
                      {new Date(app.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 text-[10px] font-extrabold rounded-md uppercase tracking-wider ${
                        (app.status === 'SELECTED' || app.status === 'approved') ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        app.status === 'SHORTLISTED' ? 'bg-purple-100 text-purple-800' :
                        app.status === 'UNDER_REVIEW' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status || 'NEW'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to="/admin/applications" className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
