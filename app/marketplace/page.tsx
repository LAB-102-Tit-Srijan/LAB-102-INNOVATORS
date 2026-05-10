export default function Marketplace() {
  const items = [
    { name: "Engineering Drawing Kit", price: "₹500" },
    { name: "Roller Scale", price: "₹150" },
    { name: "Scientific Calculator", price: "₹800" },
    { name: "Workshop Tools Set", price: "₹1200" },
    { name: "First Year Books Set", price: "₹1000" },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Marketplace
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-zinc-700 p-6 rounded-xl"
          >
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-zinc-400 mt-2">{item.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}