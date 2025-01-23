import Logo from "@/components/logo";
import Menu from "@/components/menu";
import Navbar from "@/components/navbar";

export default function DashboardLayout ({
    children
}: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex">
            {/* LEFT */ }
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-white p-4 overflow-y-scroll">
                <Logo />
                <Menu />
            </div>
            {/* RIGHT */ }
            <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-colorOffWhite overflow-scroll">
                <Navbar />
                { children }
            </div>
        </div>
    );
}