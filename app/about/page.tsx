import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "2rem", flex: 1 }}>
        <h1>About This Website</h1>
        <div style={{ marginBottom: "2rem" }}>
          <h2>Student Information</h2>
          <p><strong>Name:</strong> Vinit Kumar</p>
          <p><strong>Student Number:</strong> 21946017</p>
          <p><strong>Course:</strong> Cloud Based Web Applications (5006)</p>
          <p><strong>Assignment:</strong> Assignment 1 - Frontend Development</p>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <h2>Project Description</h2>
          <p>This Next.js application automates GitHub commands for team projects, allowing users to execute Git operations through a web interface.</p>
        </div>
        <video controls width="600" aria-label="Tutorial video for using the app">
          <source src="/tutorial.mp4" type="video/mp4" />
          Tutorial on using the GitHub Command Executor.
        </video>
      </main>
      <Footer />
    </div>
  );
}