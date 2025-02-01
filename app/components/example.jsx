export default function Colors() {
  const colors = [
    { name: "Slate Blue", hex: "#6C63FF" },
    { name: "Soft White", hex: "#F9FAFB", text: "#000000" },
    { name: "Charcoal Gray", hex: "#2D3748" },
    { name: "Cool Gray", hex: "#A0AEC0" },
    { name: "Teal Green", hex: "#38B2AC" },
    { name: "Coral Red", hex: "#F56565" },
    { name: "Light Gray", hex: "#EDF2F7", text: "#000000" },
    { name: "Dark Slate", hex: "#1A202C" },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
      {colors.map((color) => (
        <div
          key={color.hex}
          style={{
            backgroundColor: color.hex,
            color: color.text || "#FFFFFF",
            width: "150px",
            height: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            fontWeight: "bold",
          }}
        >
          {color.name}
        </div>
      ))}
    </div>
  );
}
