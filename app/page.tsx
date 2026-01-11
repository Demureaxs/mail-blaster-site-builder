import { redirect } from "next/navigation";

export default function Home() {
  // Redirect root to main brand site or show minimal demo index
  redirect("https://teklytic.com");
}
