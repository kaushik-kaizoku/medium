
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer text-3xl font-bold">
            Blogerr
        </Link>
        <div className="space-x-4 flex items-center">
            <Link to={`/publish`}>
                <Button className="text-lg cursor-pointer">New</Button>
            </Link>
            <Avatar>
                <AvatarImage />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
        </div>
    </div>
}