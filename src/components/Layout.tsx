import { type Metadata } from "next";
import { fontVariables } from "../utils/fonts";
import Navbar from "./Navbar";
import Footer from "./Footer";

export const metadata: Metadata = {
  title: "Spin City",
  description: "Frontend test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${fontVariables} font-sans`}>
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
