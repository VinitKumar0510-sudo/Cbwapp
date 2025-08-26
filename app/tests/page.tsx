import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Tests() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "2rem", flex: 1 }}>
        <h1>Tests Page - Not Implemented</h1>
      </main>
      <Footer />
    </div>
  );
}