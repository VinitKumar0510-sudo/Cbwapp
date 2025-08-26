import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GitHubForm from "@/components/GitHubForm";

export default function Home() {
  return (
    <div>
      <Header />
      <main style={{ padding: "2rem" }}>
        <h1>GitHub Command Executor</h1>
        <GitHubForm />
      </main>
      <Footer />
    </div>
  );
}