import { NotFoundPage, Link } from "nextra-theme-docs";
import { Search } from "lucide-react";

export default function NotFound() {
  return <NotFoundPage className="flex flex-col items-center justify-center h-screen gap-4">
    <Search className="w-10 h-10" />
    <h1 className="text-2xl font-bold">404: Page Not Found</h1>
    <p className="text-lg">The page you are looking for does not exist.</p>
    <Link href="/">Return to home</Link>
  </NotFoundPage>;
}