import Image from "next/image"

const UserCard = ({ type }: { type: string }) => {
    return (
        <div className="rounded-2xl odd:bg-colorPurple even:bg-colorYellow p-4 flex-1 min-w-[130px]">
            <div className="flex items-center justify-between">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2024/25</span>
                <Image src={ "/more.png" } alt="" width={ 20 } height={ 20 } />
            </div>
            <h1 className="text-2xl font-semibold my-4">1,240</h1>
            <h2 className="capitalize text-sm font-medium text-gray-600">{ type }</h2>
        </div>
    )
}

export default UserCard