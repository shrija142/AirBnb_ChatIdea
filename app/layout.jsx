import './globals.css';

export const metadata = {
  title: 'Kyoto weekend · Trip planner',
  description: 'A Kyoto weekend chat prototype for two guests.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
