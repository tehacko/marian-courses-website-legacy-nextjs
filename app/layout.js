import "@/styles/globals.css";
import MainHeader from "@/components/MainHeader/MainHeader";
import MainFooter from "@/components/MainFooter/MainFooter";

export const metadata = {
  title: 'Marian Courses Website',
  description: 'Learn about the courses offered by Maria',
};

// export const user = {
//   username: '',
//   email: '',
//   password: '',
//   registered: false,
//   loggedIn: false,
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add any custom head elements here */}
      </head>
      <body>
        <MainHeader />
        <main>
          {children}
        </main>
        <MainFooter />
      </body>
    </html>
  );
}
