import "./globals.css";

export const metadata = {
  title: "Facility Booking",
  description: "Request and approve church facility bookings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
