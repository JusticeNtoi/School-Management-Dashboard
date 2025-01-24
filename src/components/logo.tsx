import Link from "next/link"
import Image from "next/image";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
            <Image src="/logo.png" alt="logo" width={ 32 } height={ 32 } />
            <span className="hidden lg:block font-bold"> School Name</span>
        </Link>
    )
}

export default Logo