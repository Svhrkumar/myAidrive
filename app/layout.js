import "./globals.css";

export const metadata = {
  title: "Files Uploader",
  description: "Upload files to MongoDB and download stored PDFs."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
