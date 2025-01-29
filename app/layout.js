import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add any custom head elements here */}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
