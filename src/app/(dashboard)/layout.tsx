import Logo from "@/components/logo";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

export default function DashboardLayout ({
    children
}: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex">
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-white flex flex-col">
                <div className="p-4 sticky top-0 bg-white z-10" >
                    <Logo />
                </div>
                <div className="pl-4 pr-2 flex-1 overflow-y-auto scroll-smooth">
                    <Sidebar />
                </div>
            </div>
            {/* RIGHT */ }
            <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-colorOffWhite overflow-y-auto scroll-smooth">
                <div className="sticky top-0 bg-colorOffWhite z-10">
                    <Navbar />
                </div>
                { children }
            </div>
            {/* <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-colorOffWhite ">
                <Navbar />
                <div className="max-h-[calc(100vh-74px)] overflow-y-auto scroll-smooth">
                    { children }
                </div>
            </div> */}
        </div >
    );
}