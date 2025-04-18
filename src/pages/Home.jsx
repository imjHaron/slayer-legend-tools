import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-wide text-red-500 drop-shadow-xl">SLAYER LEGEND SIMULATOR</h1>
        <p className="text-lg text-gray-300">Chào mừng bạn đến với trung tâm công cụ mô phỏng và tính toán nâng cấp vũ khí trong Slayer Legend!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link to="/exchange-simulator" className="block bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-red-500/50 transition cursor-pointer">
          <h2 className="text-xl font-bold text-yellow-400">🔁 Công cụ đổi kiếm Mythic</h2>
          <p className="text-sm text-gray-300 mt-1">Tính toán số ngày, tài nguyên cần thiết và lộ trình đổi từ Kiếm Đỏ sang Kiếm Xanh cấp cao.</p>
        </Link>

        <Link to="/summon-simulator" className="block bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-sky-400/50 transition cursor-pointer">
          <h2 className="text-xl font-bold text-sky-400">📦 Mô phỏng mua gói kiếm</h2>
          <p className="text-sm text-gray-300 mt-1">Nhập số KC, chọn level và theo dõi kết quả rớt kiếm theo từng rarity – kèm bảng tổng hợp chi tiết.</p>
        </Link>
      </div>
    </div>
  );
}
