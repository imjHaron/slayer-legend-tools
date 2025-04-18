export function Input({ type = "text", value, onChange, min }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
