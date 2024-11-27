import { Roboto, Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/providers/authprovider";

// Import Google Fonts
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "900"], // Thin, Regular, Black weights
  variable: "--font-roboto", // CSS variable for font family
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "400", "600"], // Thin, Regular, Black weights
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "ClarityIQ",
  description: "Owner: Mayfair Corporation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}



// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import { AuthProvider } from '@/providers/authprovider';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "ClarityIQ",
//   description: "Owner: Mayfair Corporation",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <AuthProvider>
//         {children}
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
