import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return ( 
    <div>
      <Button variant="outline" size="icon">
        Click Me
      </Button>
      <Button className="bg-emerald-500" size="lg">
        Purp
      </Button>
    </div>
  );
}
