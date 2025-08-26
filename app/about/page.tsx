import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "2rem", flex: 1 }}>
        <h1>About This Website</h1>
        <p>Name: Vinit Kumar</p>
        <p>Student Number: 21946017</p>
        <p>This app automates GitHub commands for team projects.</p>
        <video controls width="600" aria-label="Tutorial video for using the app">
          <source src="/tutorial.mp4" type="video/mp4" />
          Tutorial on using the GitHub Command Executor.
        </video>
      </main>
      <Footer />
    </div>
  );
}