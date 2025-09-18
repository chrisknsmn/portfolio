import { H2, H3, H4, P } from "@/components/ui/main";
export default function Footer() {
  return (
    <div className="mx-8 py-2 border-t text-center">
      <P className="p-0">© {new Date().getFullYear()} Chris Kisnman</P>
    </div>
  );
}
