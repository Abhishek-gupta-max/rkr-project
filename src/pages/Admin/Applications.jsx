import React, { useEffect, useState, useMemo } from 'react';
import userService from '../../services/userService';
import useApi from '../../hooks/useApi';
import usePagination from '../../hooks/usePagination';
import Loader from '../../components/common/Loader/Loader';
import Modal from '../../components/common/Modal/Modal';
import Button from '../../components/common/Button/Button';

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'NEW', label: 'NEW' },
  { value: 'UNDER_REVIEW', label: 'UNDER REVIEW' },
  { value: 'SHORTLISTED', label: 'SHORTLISTED' },
  { value: 'INTERVIEW', label: 'INTERVIEW' },
  { value: 'SELECTED', label: 'SELECTED' },
  { value: 'REJECTED', label: 'REJECTED' },
  { value: 'ON_HOLD', label: 'ON HOLD' }
];

export const Applications = () => {
  const { data: apps, loading, error, request: fetchApps, setData: setApps } = useApi(userService.adminGetApplications);

  const [search, setSearch] = useState('');
  const [selectedTrade, setSelectedTrade] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('newest');

  const [selectedApp, setSelectedApp] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [adminNotesText, setAdminNotesText] = useState('');
  const [notesSaving, setNotesSaving] = useState(false);
  const [notesMessage, setNotesMessage] = useState('');

  // Fetch applications on filter change
  useEffect(() => {
    fetchApps({
      search,
      trade: selectedTrade,
      status: selectedStatus,
      sort: sortOrder
    });
  }, [fetchApps, search, selectedTrade, selectedStatus, sortOrder]);

  // Extract unique trade categories for the filter dropdown
  const uniqueTrades = useMemo(() => {
    if (!apps || !Array.isArray(apps)) return [];
    const set = new Set();
    apps.forEach((a) => {
      const trade = a.trade_category || a.job_position;
      if (trade) set.add(trade);
    });
    return Array.from(set).sort();
  }, [apps]);

  const {
    currentPage,
    totalPages,
    currentItems: paginatedApps,
    nextPage,
    prevPage,
    totalItems
  } = usePagination(apps || [], 10);

  const handleRowClick = async (appId) => {
    try {
      const detail = await userService.adminGetApplicationDetail(appId);
      setSelectedApp(detail);
      setAdminNotesText(detail.admin_notes || '');
      setNotesMessage('');
      setDetailModalOpen(true);
    } catch (err) {
      console.error(err);
      alert('Failed to load application details.');
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedApp) return;
    setStatusLoading(true);
    try {
      const res = await userService.adminUpdateApplicationStatus(selectedApp.id, newStatus);
      if (res.success) {
        setSelectedApp((prev) => ({ ...prev, status: newStatus }));
        setApps((prev) =>
          prev.map((a) => (a.id === selectedApp.id ? { ...a, status: newStatus } : a))
        );
      } else {
        alert(res.error || 'Failed to update status.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong updating status.');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedApp) return;
    setNotesSaving(true);
    setNotesMessage('');
    try {
      const res = await userService.adminUpdateApplicationNotes(selectedApp.id, adminNotesText);
      if (res.success) {
        setSelectedApp((prev) => ({ ...prev, admin_notes: adminNotesText }));
        setNotesMessage('Notes saved successfully!');
        setTimeout(() => setNotesMessage(''), 3000);
      } else {
        alert(res.error || 'Failed to save notes.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save notes.');
    } finally {
      setNotesSaving(false);
    }
  };

  const handleDelete = async (appId) => {
    if (!window.confirm('Are you sure you want to permanently delete this job application?')) return;
    try {
      const res = await userService.adminDeleteApplication(appId);
      if (res.success) {
        setApps((prev) => prev.filter((a) => a.id !== appId));
        if (selectedApp && selectedApp.id === appId) {
          setDetailModalOpen(false);
          setSelectedApp(null);
        }
      } else {
        alert(res.error || 'Failed to delete application.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  const getDocUrl = (path) => {
    if (!path) return '#';
    if (path.startsWith('http')) return path;
    return `http://localhost:8000/${path}`;
  };

  const renderStatusBadge = (status) => {
    const s = (status || 'NEW').toUpperCase();
    let bg = 'bg-amber-100 text-amber-800 border-amber-300';
    if (s === 'UNDER_REVIEW') bg = 'bg-blue-100 text-blue-800 border-blue-300';
    else if (s === 'SHORTLISTED') bg = 'bg-purple-100 text-purple-800 border-purple-300';
    else if (s === 'INTERVIEW') bg = 'bg-indigo-100 text-indigo-800 border-indigo-300';
    else if (s === 'SELECTED' || s === 'APPROVED') bg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    else if (s === 'REJECTED') bg = 'bg-red-100 text-red-800 border-red-300';
    else if (s === 'ON_HOLD') bg = 'bg-slate-200 text-slate-700 border-slate-300';

    return (
      <span className={`inline-flex px-2.5 py-1 text-[11px] font-extrabold rounded-md border uppercase tracking-wider ${bg}`}>
        {s}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0047ba] font-heading leading-tight">Job Applications</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage international job seeker submissions, document uploads, and candidate evaluation workflow.</p>
        </div>
        <div className="text-sm font-semibold text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          Total Applications: <span className="text-blue-900 font-bold">{totalItems}</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Search */}
          <div className="relative">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Search Applicant</label>
            <input
              type="text"
              placeholder="Search name, phone, ID, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-xs text-slate-800"
            />
            <span className="absolute left-3 top-[26px] text-slate-400">🔍</span>
          </div>

          {/* Trade Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Filter by Trade / Skill</label>
            <select
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="ALL">All Trades & Skills</option>
              {uniqueTrades.map((trade, idx) => (
                <option key={idx} value={trade}>{trade}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Filter by Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-xs font-semibold text-slate-800 bg-white"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sort Order</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-semibold">
          Error loading applications: {error}
        </div>
      )}

      {/* Applications Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            {paginatedApps.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <span className="text-4xl block mb-2">📋</span>
                No applications found matching the selected criteria.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">App ID</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Applicant Name</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Trade / Skill</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Exp</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Pref Country</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {paginatedApps.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-blue-50/30 transition-colors cursor-pointer"
                      onClick={() => handleRowClick(app.id)}
                    >
                      <td className="px-6 py-4 font-mono font-bold text-amber-600 whitespace-nowrap">
                        {app.application_id || `APP-${app.id}`}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800 text-sm">{app.full_name || app.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{app.current_city || 'India'}</p>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {app.trade_category || app.job_position}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800">{app.mobile_number || app.phone}</p>
                        <p className="text-[11px] text-slate-400">{app.email || 'No email'}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium whitespace-nowrap">
                        {app.total_experience || app.experience || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium whitespace-nowrap">
                        {app.preferred_country || 'UAE'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        {renderStatusBadge(app.status)}
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">
                        {new Date(app.created_at).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleRowClick(app.id)}
                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors disabled:opacity-50"
              >
                ← Previous
              </button>
              <span className="text-xs text-slate-500 font-bold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      )}

      {/* APPLICANT DETAIL MODAL */}
      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title={`Applicant Profile - ${selectedApp?.application_id || ''}`}
        size="lg"
      >
        {selectedApp && (
          <div className="space-y-6 text-slate-800">
            
            {/* Header Badge Strip */}
            <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-amber-400 font-mono font-bold">{selectedApp.application_id}</p>
                <h3 className="text-xl font-bold font-heading mt-0.5">{selectedApp.full_name || selectedApp.name}</h3>
                <p className="text-xs text-slate-300">{selectedApp.trade_category || selectedApp.job_position} | Submitted: {new Date(selectedApp.created_at).toLocaleString()}</p>
              </div>
              <div>
                {renderStatusBadge(selectedApp.status)}
              </div>
            </div>

            {/* Grid 1: Personal Details */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-1 mb-3">
                Personal Details
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div><span className="text-slate-400 block font-semibold">Father's Name:</span><span className="font-bold">{selectedApp.father_name || 'N/A'}</span></div>
                <div><span className="text-slate-400 block font-semibold">Date of Birth:</span><span className="font-bold">{selectedApp.date_of_birth ? new Date(selectedApp.date_of_birth).toLocaleDateString() : 'N/A'}</span></div>
                <div><span className="text-slate-400 block font-semibold">Gender:</span><span className="font-bold">{selectedApp.gender || 'N/A'}</span></div>
                <div><span className="text-slate-400 block font-semibold">Mobile:</span><a href={`tel:${selectedApp.mobile_number || selectedApp.phone}`} className="font-bold text-blue-600 hover:underline">{selectedApp.mobile_number || selectedApp.phone}</a></div>
                <div><span className="text-slate-400 block font-semibold">WhatsApp:</span><span className="font-bold">{selectedApp.whatsapp_number || 'N/A'}</span></div>
                <div><span className="text-slate-400 block font-semibold">Email:</span><a href={`mailto:${selectedApp.email}`} className="font-bold text-blue-600 hover:underline">{selectedApp.email || 'N/A'}</a></div>
                <div><span className="text-slate-400 block font-semibold">Current City:</span><span className="font-bold">{selectedApp.current_city || 'N/A'}</span></div>
                <div><span className="text-slate-400 block font-semibold">Country:</span><span className="font-bold">{selectedApp.current_country || 'India'}</span></div>
              </div>
            </div>

            {/* Grid 2: Professional Details */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-1 mb-3">
                Professional & Work Experience
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div><span className="text-slate-400 block font-semibold">Selected Trade:</span><span className="font-bold text-blue-900">{selectedApp.trade_category || selectedApp.job_position}</span></div>
                <div><span className="text-slate-400 block font-semibold">Total Experience:</span><span className="font-bold">{selectedApp.total_experience || selectedApp.experience || 'N/A'}</span></div>
                <div><span className="text-slate-400 block font-semibold">Relevant Exp:</span><span className="font-bold">{selectedApp.relevant_experience || 'N/A'}</span></div>
                <div><span className="text-slate-400 block font-semibold">Current Title:</span><span className="font-bold">{selectedApp.current_job_title || 'N/A'}</span></div>
                <div><span className="text-slate-400 block font-semibold">Previous Company:</span><span className="font-bold">{selectedApp.previous_company || 'N/A'}</span></div>
                <div><span className="text-slate-400 block font-semibold">Preferred Country:</span><span className="font-bold text-amber-700">{selectedApp.preferred_country || 'N/A'}</span></div>
                <div><span className="text-slate-400 block font-semibold">Expected Salary:</span><span className="font-bold">{selectedApp.expected_salary || 'N/A'}</span></div>
                <div><span className="text-slate-400 block font-semibold">Primary Skill:</span><span className="font-bold">{selectedApp.primary_skill || 'N/A'}</span></div>
                <div><span className="text-slate-400 block font-semibold">Certifications:</span><span className="font-bold">{selectedApp.certifications || 'N/A'}</span></div>
              </div>
            </div>

            {/* Passport & Document Downloads */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-1 mb-3">
                Passport Information & Attachments
              </h4>
              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 space-y-3 text-xs">
                <div className="flex gap-6">
                  <div><span className="text-amber-800 font-semibold">Passport No:</span> <strong className="font-mono">{selectedApp.passport_number || 'N/A'}</strong></div>
                  <div><span className="text-amber-800 font-semibold">Expiry Date:</span> <strong>{selectedApp.passport_expiry ? new Date(selectedApp.passport_expiry).toLocaleDateString() : 'N/A'}</strong></div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-200/80">
                  {selectedApp.cv_document || selectedApp.file_path ? (
                    <a
                      href={getDocUrl(selectedApp.cv_document || selectedApp.file_path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-sm transition-all"
                    >
                      📄 Download CV / Resume
                    </a>
                  ) : <span className="text-slate-400">No CV Attached</span>}

                  {selectedApp.passport_document && (
                    <a
                      href={getDocUrl(selectedApp.passport_document)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-xs shadow-sm transition-all"
                    >
                      🛂 View Passport Doc
                    </a>
                  )}

                  {selectedApp.experience_certificate && (
                    <a
                      href={getDocUrl(selectedApp.experience_certificate)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-sm transition-all"
                    >
                      🏆 View Experience Cert
                    </a>
                  )}

                  {selectedApp.other_documents && (
                    <a
                      href={getDocUrl(selectedApp.other_documents)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs shadow-sm transition-all"
                    >
                      📁 View Other Doc
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Message & Admin Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Applicant Message / Details</p>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedApp.message || 'No additional message provided.'}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase">Admin Internal Notes</p>
                <textarea
                  rows="3"
                  value={adminNotesText}
                  onChange={(e) => setAdminNotesText(e.target.value)}
                  placeholder="Add internal evaluation notes, interview remarks, deployment status..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
                <div className="flex items-center justify-between">
                  {notesMessage && <span className="text-[11px] font-bold text-emerald-600">{notesMessage}</span>}
                  <button
                    onClick={handleSaveNotes}
                    disabled={notesSaving}
                    className="ml-auto px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-lg transition-colors disabled:opacity-50"
                  >
                    {notesSaving ? 'Saving...' : 'Save Notes'}
                  </button>
                </div>
              </div>
            </div>

            {/* Status Change Strip */}
            <div className="border-t border-slate-200 pt-5 space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Update Application Status:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'NEW', label: 'NEW', color: 'bg-amber-500 text-white' },
                  { key: 'UNDER_REVIEW', label: 'UNDER REVIEW', color: 'bg-blue-600 text-white' },
                  { key: 'SHORTLISTED', label: 'SHORTLISTED', color: 'bg-purple-600 text-white' },
                  { key: 'INTERVIEW', label: 'INTERVIEW', color: 'bg-indigo-600 text-white' },
                  { key: 'SELECTED', label: 'SELECTED', color: 'bg-emerald-600 text-white' },
                  { key: 'REJECTED', label: 'REJECTED', color: 'bg-red-600 text-white' },
                  { key: 'ON_HOLD', label: 'ON HOLD', color: 'bg-slate-600 text-white' },
                ].map((st) => (
                  <button
                    key={st.key}
                    disabled={statusLoading}
                    onClick={() => handleUpdateStatus(st.key)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      selectedApp.status === st.key ? `${st.color} ring-2 ring-offset-1 ring-slate-400` : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
};

export default Applications;
