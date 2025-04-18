import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const dropRates = {
  "1": [68.58, 25.5, 5.4, 0.5149, 0.005, 0.0001],
  "2": [54.2, 32.8, 11.2, 1.7197, 0.08, 0.0003],
  "3": [33.1, 43.5, 18.4, 4.7982, 0.2, 0.0018],
  "4": [10.56, 55.84, 23.5, 9.59, 0.5, 0.01],
  "5": [7.2, 45, 28.5, 18.575, 0.7, 0.025],
  "6": [5.08, 31.2, 40.05, 22.618, 1.02, 0.032],
  "7": [4.41, 21, 36.5, 36.5, 1.54, 0.05],
  "8": [2.68, 18, 29, 48.2, 2.05, 0.07],
  "9": [0.11, 4.2, 18, 73.57, 4.02, 0.1],
  "10": [0.01, 0.5, 9.49, 82.85, 7, 0.15]
};

const rarityNames = ["Common", "Great", "Rare", "Epic", "Legendary", "Mythic"];
const swordTiers = ["Kiếm 4", "Kiếm 3", "Kiếm 2", "Kiếm 1"];
const swordTierRates = [0.4, 0.3, 0.2, 0.1];

function rollSwords(count, level) {
  const results = [0, 0, 0, 0, 0, 0];
  const rates = dropRates[level];
  for (let i = 0; i < count; i++) {
    let rand = Math.random() * 100;
    let cum = 0;
    for (let j = 0; j < rates.length; j++) {
      cum += rates[j];
      if (rand <= cum) {
        results[j]++;
        break;
      }
    }
  }
  return results;
}

function calculateSwordTiers(results) {
  const swordTable = Array(4).fill(0).map(() => Array(6).fill(0));
  results.forEach((count, rarityIndex) => {
    const tierCounts = swordTierRates.map(rate => Math.floor(count * rate));
    tierCounts.forEach((val, tierIndex) => {
      swordTable[tierIndex][rarityIndex] += val;
    });
  });
  return swordTable;
}

export default function SummonSimulator() {
  const [packageLevel, setPackageLevel] = useState("1")
  const [diamond50, setDiamond50] = useState(0)
  const [diamond500, setDiamond500] = useState(0)
  const [result50, setResult50] = useState([])
  const [result500, setResult500] = useState([])

  const handleBuy50 = () => {
    const count = Math.floor(diamond50 / 50);
    const result = rollSwords(count, packageLevel);
    const bonusMythic = Math.floor(count / 10000);
    result[5] += bonusMythic;
    setResult50(result);
  };

  const handleBuy500 = () => {
    const count = Math.floor(diamond500 / 500) * 11;
    const result = rollSwords(count, packageLevel);
    const bonusMythic = Math.floor(count / 10000);
    result[5] += bonusMythic;
    setResult500(result);
  };

  const tiers50 = calculateSwordTiers(result50);
  const tiers500 = calculateSwordTiers(result500);

  const renderTierTable = (tiers) => {
    const totalPerRow = rarityNames.map((_, rIdx) => (
      tiers.reduce((sum, row) => sum + row[rIdx], 0)
    ));

    return (
      <table className="mt-4 w-full text-sm border border-gray-700 text-black">
        <thead>
          <tr>
            <th className="p-2 border border-gray-600 bg-gray-300 font-bold text-center">TỔNG</th>
            <th className="p-2 border border-gray-600 bg-gray-300 font-bold text-center">Rarity</th>
            {swordTiers.map((tier, idx) => (
              <th key={idx} className="p-2 border border-gray-600 bg-gray-300 text-center font-bold">{tier.replace("Kiếm", "Sword")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rarityNames.map((rarity, rarityIdx) => (
            <tr key={rarityIdx} className={
              rarity === "Common" ? "bg-gray-200" :
              rarity === "Great" ? "bg-green-300" :
              rarity === "Rare" ? "bg-yellow-300" :
              rarity === "Epic" ? "bg-pink-300" :
              rarity === "Legendary" ? "bg-red-400" :
              rarity === "Mythic" ? "bg-cyan-300" : ""
            }>
              <td className="p-2 border border-gray-600 font-bold text-center">{totalPerRow[rarityIdx]}</td>
              <td className="p-2 border border-gray-600 font-semibold text-center">{rarity}</td>
              {tiers.map((row, tierIdx) => (
                <td key={tierIdx} className="p-2 border border-gray-600 text-center">{row[rarityIdx]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans px-4 py-6 space-y-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card><CardContent className="space-y-4">
          <h3 className="text-lg font-bold">💎 Mô phỏng mua gói kiếm</h3>

          <div className="flex items-center gap-3">
            <label className="text-sm whitespace-nowrap">Chọn mốc level của gói kiếm:</label>
            <select
              value={packageLevel}
              onChange={(e) => setPackageLevel(e.target.value)}
              className="bg-yellow-800 text-white text-sm px-3 py-1 rounded-md border border-yellow-500"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>Level {i + 1}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Gói 50 KC (1 kiếm ngẫu nhiên):</label>
              <Input
                type="number"
                value={diamond50}
                onChange={(e) => setDiamond50(Number(e.target.value))}
                min={0}
              />
              <Button className="mt-2 w-full bg-sky-600 hover:bg-sky-700" onClick={handleBuy50}>Mua gói 50 KC</Button>
              <p className="text-sm mt-2 text-yellow-300 font-medium text-center">🎁 Tặng thêm {Math.floor(Math.floor(diamond50 / 50) / 10000)} kiếm Mythic</p>
              {renderTierTable(tiers50)}
            </div>

            <div>
              <label className="block mb-1">Gói 500 KC (10+1 kiếm ngẫu nhiên):</label>
              <Input
                type="number"
                value={diamond500}
                onChange={(e) => setDiamond500(Number(e.target.value))}
                min={0}
              />
              <Button className="mt-2 w-full bg-sky-600 hover:bg-sky-700" onClick={handleBuy500}>Mua gói 500 KC</Button>
              <p className="text-sm mt-2 text-yellow-300 font-medium text-center">🎁 Tặng thêm {Math.floor((Math.floor(diamond500 / 500) * 11) / 10000)} kiếm Mythic</p>
              {renderTierTable(tiers500)}
            </div>
          </div>
        </CardContent></Card>
      </div>
    </div>
  )
}