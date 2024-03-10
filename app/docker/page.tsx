import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Docker() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ padding: "2rem", flex: 1 }}>
        <h1>Docker Configuration</h1>
        <p>This application is containerized using Docker and docker-compose.</p>
        <h2>Files:</h2>
        <ul>
          <li>Dockerfile - Container configuration</li>
          <li>docker-compose.yml - Multi-service setup with MySQL</li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}