import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient";
import { Package, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import type { IDashboardStats } from "../types";

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery<IDashboardStats>({
    queryKey: ["dashboard"],
    queryFn: () =>
      apiClient.get("/dashboard/stats").then((res) => res.data.data),
  });

  const statCards = [
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "blue",
    },
    {
      title: "Total Customers",
      value: stats?.totalCustomers || 0,
      icon: Users,
      color: "green",
    },
    {
      title: "Total Sales",
      value: stats?.totalSales || 0,
      icon: TrendingUp,
      color: "purple",
    },
    {
      title: "Total Revenue",
      value: `৳${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: TrendingUp,
      color: "emerald",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="w-8 h-8 text-blue-600" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {stat.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Low Stock Products */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-amber-500" />
          <h2 className="text-xl font-semibold">Low Stock Products</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-4 px-4">Product</th>
                <th className="text-left py-4 px-4">SKU</th>
                <th className="text-left py-4 px-4">Stock</th>
                <th className="text-left py-4 px-4">Category</th>
              </tr>
            </thead>
            <tbody>
              {stats?.lowStockProducts?.map((product: any) => (
                <tr
                  key={product._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="py-4 px-4 flex items-center gap-3">
                    <img
                      src={product.image}
                      alt=""
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    {product.name}
                  </td>
                  <td className="py-4 px-4 font-mono text-sm">{product.sku}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/50 rounded-full text-sm font-medium">
                      {product.stockQuantity}
                    </span>
                  </td>
                  <td className="py-4 px-4">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
