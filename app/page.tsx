import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GitHubForm from "@/components/GitHubForm";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "2rem", flex: 1 }}>
        <h1>GitHub Command Executor - Assignment 1</h1>
        <p>Cloud Based Web Applications - Student: Vinit Kumar (21946017)</p>
        <GitHubForm />
      </main>
      <Footer />
    </div>
  );
}