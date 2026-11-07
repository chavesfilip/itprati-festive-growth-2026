import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title:"iTpraTi Growth Control Center", description:"Centro de controlo da campanha iTpraTi Festive Growth 2026." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt"><body>{children}</body></html>; }
