import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const RED3_PER_RED1 = 25;
const RED1_PER_GREEN4 = 5;
const GREEN4_PER_GREEN3 = 5;
const GREEN3_PER_GREEN2 = 5;
const GREEN2_PER_GREEN1 = 5;
const RED1_PER_GREEN1 = RED1_PER_GREEN4 * GREEN4_PER_GREEN3 * GREEN3_PER_GREEN2 * GREEN2_PER_GREEN1;

export default function ExchangeSimulator() {
  const [currentRed1, setCurrentRed1] = useState(0)
  const [dailyRed3, setDailyRed3] = useState(0)
  const [mythic4, setMythic4] = useState(0)
  const [mythic3, setMythic3] = useState(0)
  const [mythic2, setMythic2] = useState(0)
  const [daysNeeded, setDaysNeeded] = useState(null)
  const [targetGreen1, setTargetGreen1] = useState(1)
  const [daysForTarget, setDaysForTarget] = useState(null)
  const [daysSim, setDaysSim] = useState(1)
  const [green1AfterDays, setGreen1AfterDays] = useState(null)
  const [log, setLog] = useState([])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10 space-y-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-lg"><CardContent className="space-y-4">
          <h2 className="text-xl font-bold">🔧 Công cụ tính đổi Kiếm Xanh 1</h2>

          <label className="block mb-1">Số Kiếm Đỏ 1 hiện có:</label>
          <Input type="number" value={currentRed1} onChange={(e) => setCurrentRed1(Number(e.target.value))} min={0} />

          <label className="block mb-1">Số Kiếm Đỏ 3 kiếm được mỗi ngày:</label>
          <Input type="number" value={dailyRed3} onChange={(e) => setDailyRed3(Number(e.target.value))} min={1} />

          <label className="block mb-1">Mythic 4:</label>
          <Input type="number" value={mythic4} onChange={(e) => setMythic4(Number(e.target.value))} min={0} />

          <label className="block mb-1">Mythic 3:</label>
          <Input type="number" value={mythic3} onChange={(e) => setMythic3(Number(e.target.value))} min={0} />

          <label className="block mb-1">Mythic 2:</label>
          <Input type="number" value={mythic2} onChange={(e) => setMythic2(Number(e.target.value))} min={0} />

          <Button onClick={() => {
            const red1FromMythic =
              mythic4 * RED1_PER_GREEN4 +
              mythic3 * RED1_PER_GREEN4 * GREEN4_PER_GREEN3 +
              mythic2 * RED1_PER_GREEN4 * GREEN4_PER_GREEN3 * GREEN3_PER_GREEN2;
            const red1Needed = Math.max(RED1_PER_GREEN1 - currentRed1 - red1FromMythic, 0);
            const red1PerDay = dailyRed3 / RED3_PER_RED1;
            setDaysNeeded(Math.ceil(red1Needed / red1PerDay));
          }}>Tính số ngày để có 1 Kiếm Xanh 1</Button>
          {daysNeeded !== null && (
            <div className="text-green-400 font-semibold">🗓️ Cần khoảng {daysNeeded} ngày</div>
          )}
        </CardContent></Card>

        <Card className="shadow-lg"><CardContent className="space-y-4">
          <h3 className="text-lg font-bold">🎯 Tính số ngày để đạt X Kiếm Xanh 1</h3>
          <label className="block mb-1">Số lượng muốn đạt:</label>
          <Input type="number" value={targetGreen1} onChange={(e) => setTargetGreen1(Number(e.target.value))} min={1} />
          <Button onClick={() => {
            const totalRed1FromMythic =
              mythic4 * RED1_PER_GREEN4 +
              mythic3 * RED1_PER_GREEN4 * GREEN4_PER_GREEN3 +
              mythic2 * RED1_PER_GREEN4 * GREEN4_PER_GREEN3 * GREEN3_PER_GREEN2;
            const totalRed1Needed = RED1_PER_GREEN1 * targetGreen1;
            const red1Needed = Math.max(totalRed1Needed - currentRed1 - totalRed1FromMythic, 0);
            const red1PerDay = dailyRed3 / RED3_PER_RED1;
            setDaysForTarget(Math.ceil(red1Needed / red1PerDay));
          }}>Tính số ngày cần</Button>
          {daysForTarget !== null && (
            <div className="text-yellow-400 font-semibold">📆 Cần khoảng {daysForTarget} ngày để đạt {targetGreen1} Kiếm Xanh 1</div>
          )}
        </CardContent></Card>

        <Card className="shadow-lg"><CardContent className="space-y-4">
          <h3 className="text-lg font-bold">⏳ Mô phỏng tiến trình</h3>
          <label className="block mb-1">Số ngày mô phỏng:</label>
          <Input type="number" value={daysSim} onChange={(e) => setDaysSim(Number(e.target.value))} min={1} />
          <Button onClick={() => {
            const red1PerDay = dailyRed3 / RED3_PER_RED1;
            const totalRed1 = currentRed1 + red1PerDay * daysSim;
            const green1Count = Math.floor(totalRed1 / RED1_PER_GREEN1);
            setGreen1AfterDays(green1Count);
          }}>Tính số Kiếm Xanh 1</Button>
          {green1AfterDays !== null && (
            <div className="text-blue-400 font-semibold">📈 Sau {daysSim} ngày bạn có khoảng {green1AfterDays} Kiếm Xanh 1</div>
          )}
        </CardContent></Card>

        <Card className="shadow-lg"><CardContent className="space-y-4">
          <h3 className="text-lg font-bold">📋 Lộ trình nâng cấp</h3>
          <Button onClick={() => {
            const totalRed1 = RED1_PER_GREEN1 * targetGreen1;
            const green4 = totalRed1 / RED1_PER_GREEN4;
            const green3 = green4 / GREEN4_PER_GREEN3;
            const green2 = green3 / GREEN3_PER_GREEN2;
            const green1 = green2 / GREEN2_PER_GREEN1;
            setLog([
              `🔄 Đổi lộ trình để có ${targetGreen1} Kiếm Xanh 1:`,
              `• Cần ${totalRed1} Kiếm Đỏ 1`,
              `• Đổi ra ${green4} Kiếm Xanh 4`,
              `• Đổi ra ${green3} Kiếm Xanh 3`,
              `• Đổi ra ${green2} Kiếm Xanh 2`,
              `• Cuối cùng thành ${green1} Kiếm Xanh 1`
            ]);
          }}>Xem lộ trình</Button>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            {log.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </CardContent></Card>
      </div>
    </div>
  )
}