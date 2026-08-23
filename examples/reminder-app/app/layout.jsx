import "./globals.css";

export const metadata = {
  title: "Serving Schedule Reminders",
  description: "Automated serving reminders for our church teams",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
