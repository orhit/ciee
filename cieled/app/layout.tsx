import "./globals.css";

export const metadata = {
  title: "CIE 1931 Chromaticity Comparator",
  description: "Professional LED color visualization tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}