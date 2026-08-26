import { formatCurrency } from "@/lib/currency";
import { listPayments } from "@/lib/content/payments";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  const payments = await listPayments();
  const total = payments.reduce((sum, payment) => sum + payment.amountCad, 0);

  return <main id="main" className="py-5" style={{ background: "var(--njr-gray)" }}>
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div><h1 className="mb-1">Payments</h1><p className="small mb-0">Completed Stripe payments recorded in DynamoDB.</p></div>
        <div className="text-end"><div className="small text-muted">Recorded total</div><strong className="fs-4">{formatCurrency(total)}</strong></div>
      </div>

      <div className="card njr-card"><div className="card-body p-0"><div className="table-responsive">
        <table className="table table-striped align-middle mb-0">
          <thead><tr><th className="ps-4">Completed</th><th>Type</th><th>Assigned to</th><th>Contact</th><th>Stripe ID</th><th className="text-end pe-4">Amount</th></tr></thead>
          <tbody>{payments.length === 0 ? <tr><td className="p-4 text-muted" colSpan={6}>No completed payments have been recorded yet.</td></tr> : payments.map((payment) => {
            const assignedTo = payment.targetType === "Player"
              ? `${payment.playerId} - ${payment.playerName}`
              : payment.targetType === "Sponsor"
                ? `${payment.packageId} - ${payment.packageName}`
                : "TEAM";
            return <tr key={payment.id}>
              <td className="ps-4 text-nowrap">{new Intl.DateTimeFormat("en-CA", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Toronto" }).format(new Date(payment.completedAt))}</td>
              <td className="text-capitalize">{payment.kind}</td>
              <td>{assignedTo}</td>
              <td><div>{payment.companyName || payment.donorName || "—"}</div><div className="small text-muted">{payment.email || ""}</div></td>
              <td><code>{payment.id}</code></td>
              <td className="text-end pe-4 fw-bold">{formatCurrency(payment.amountCad)}</td>
            </tr>;
          })}</tbody>
        </table>
      </div></div></div>
    </div>
  </main>;
}
