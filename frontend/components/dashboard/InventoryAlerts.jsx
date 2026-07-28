import {
  AlertTriangle,
  Package,
  ArrowRight,
} from "lucide-react";

const items = [
  {
    name: "Hair Serum",
    stock: "3 left",
  },
  {
    name: "Face Cream",
    stock: "5 left",
  },
  {
    name: "Shampoo 250ml",
    stock: "2 left",
  },
  {
    name: "Beard Oil",
    stock: "4 left",
  },
];

export default function InventoryAlerts() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Inventory Alerts
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Products requiring attention
          </p>
        </div>

        <div className="rounded-lg bg-red-500/10 p-2.5">
          <AlertTriangle
            size={18}
            className="text-red-400"
          />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/40 p-3 transition hover:border-red-500"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-slate-800 p-2">
                <Package
                  size={16}
                  className="text-indigo-400"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-white">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-400">
                  Low Stock
                </p>
              </div>
            </div>

            <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
              {item.stock}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500">
        Manage Inventory
        <ArrowRight size={16} />
      </button>
    </div>
  );
}