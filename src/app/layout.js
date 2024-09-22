import localFont from "next/font/local";
import "./globals.css";
import MainLayout from "../../components/MainLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "PadiUMKM",
  description: "Beli barang dan jasa makin mudah dan praktis bersama Pasar Digital UMKM. Nikmati pengadaan barang dan jasa transparan, aman dan praktis!",
  icons: {
    icon: '/favicon.ico', // Remove the query parameters
    apple: '/apple-touch-icon.png', // Remove the query parameters
    shortcut: '/apple-touch-icon.png'
  }
};


export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <MainLayout></MainLayout>
      </body>
    </html>
  );
}
