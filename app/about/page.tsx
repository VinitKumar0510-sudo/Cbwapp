import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div>
      <Header />
      <main style={{ padding: "2rem" }}>
        <h1>About This Website</h1>
        <p>Name: Aaditya YourLastName</p>
        <p>Student Number: YOUR_STUDENT_NUMBER</p>
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