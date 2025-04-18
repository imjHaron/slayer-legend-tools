export function Card({ children }) {
  return <div className="border rounded-xl shadow-lg bg-white text-black">{children}</div>;
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
