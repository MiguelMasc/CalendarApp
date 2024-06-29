import { ReactNode } from "react";
import Topbar from "./_components/topbar";

const Landinglayout = ({
  children
}: {
  children: ReactNode;
}) => {
  return ( 

    <div className="h-full">
      <main className="h-full pt-40">
        <Topbar/>
        {children}
      </main>

    </div>
   );
}
 
export default Landinglayout;