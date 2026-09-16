import { useState } from "react";
import { RefreshCw, Search, Calendar, History } from "lucide-react";
import StatusBadge from "../../components/common/StatusBadge";

export default function VerificationAudit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 301,
      title: "Royal Enfield Classic 350",
      sellerName: "Vikram Malhotra",
      lastVerified: "2026-08-10",
      expiresAt: "2026-09-10",
      status: "Expired",
      daysOverdue: 5,
    },
    {
      id: 302,
      title: "KTM Duke 390",
      sellerName: "Ananya Roy",
      lastVerified: "2026-08-18",
      expiresAt: "2026-09-18",
      status: "Verified",
      daysOverdue: -3,
    },
    {
      id: 303,
      title: "Yamaha MT-15 V2",
      sellerName: "Rohit Kumar",
      lastVerified: "2026-08-20",
      expiresAt: "2026-09-20",
      status: "Verified",
      daysOverdue: -5,
    },
  ]);

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleManualTriggerCheck = (id) => {
    setAuditLogs((prev) =>
      prev.map((item) =>
        (item._id || item.id) === id
          ? { ...item, status: "Verified", daysOverdue: -30, expiresAt: "2026-10-15" }
          : item
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-surface-text tracking-tight">30-Day Verification Audit Log</h1>
          <p className="text-xs text-surface-muted mt-1">
            Monitor listing lifecycles, track active verification periods, and handle automated deactivations for stale inventory.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-surface-border pb-4">
          <div className="flex items-center gap-2">
            <History size={20} className="text-surface-primary" />
            <h3 className="text-base font-bold text-surface-text">Active Lifecycle Tracking</h3>
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-3 text-surface-muted" />
            <input
              type="text"
              placeholder="Search bike or seller..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-page border border-surface-border text-surface-text rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-surface-primary"
            />
          </div>
        </div>

        {/* Audit Log Table */}
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 text-surface-muted text-xs">
            No verification records match your search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-border text-xs uppercase text-surface-muted">
                  <th className="py-3 px-4 font-bold">Vehicle & Seller</th>
                  <th className="py-3 px-4 font-bold">Last Verified</th>
                  <th className="py-3 px-4 font-bold">Expiry Date</th>
                  <th className="py-3 px-4 font-bold">Cycle Status</th>
                  <th className="py-3 px-4 font-bold text-right">Audit Controls</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => {
                  const isExpired = log.status === "Expired" || log.daysOverdue >= 0;
                  return (
                    <tr
                      key={log._id || log.id}
                      className="border-b border-surface-border hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-surface-text text-sm">{log.title}</div>
                        <div className="text-xs text-surface-muted">Seller: {log.sellerName}</div>
                      </td>
                      <td className="py-3 px-4 text-xs text-surface-muted">
                        {log.lastVerified}
                      </td>
                      <td className="py-3 px-4 text-xs text-surface-muted flex items-center gap-1.5 pt-4">
                        <Calendar size={14} className="text-surface-primary" />
                        <span>{log.expiresAt}</span>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={isExpired ? "Expired" : "Verified"} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleManualTriggerCheck(log._id || log.id)}
                          className="inline-flex items-center gap-1.5 bg-surface-page border border-surface-border hover:border-surface-primary text-surface-text px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          <RefreshCw size={14} className="text-surface-primary" />
                          <span>Force Re-verify</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}