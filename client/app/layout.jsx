import NavBar from '../components/NavBar';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a]">
        <NavBar />
        {/* Add padding-top so the content doesn't hide under the fixed navbar */}
        <div className="pt-20"> 
          {children}
        </div>
      </body>
    </html>
  );
}