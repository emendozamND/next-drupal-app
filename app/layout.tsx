import './globals.css';

export const metadata = {
  title: 'Elias Mendoza | Portfolio',
  description: 'Portfolio conectado a Drupal JSON:API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans bg-white">
        {children}
      </body>
    </html>
  );
}
