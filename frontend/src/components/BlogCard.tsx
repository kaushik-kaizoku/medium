import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: number
}

// export const BlogCard = ({
//     authorName,
//     title,
//     content,
//     publishedDate,
//     id
// }:BlogCardProps) => {
//     return <Link to={`/blog/${id}`}>
//         <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
//             <div className="flex">
//                 <Avatar name={authorName} />
//                 <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
//                 <div className="flex justify-center flex-col pl-2 ">
//                     <Circle />
//                 </div>
//                 <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
//                     {publishedDate}
//                 </div>
//             </div>
//             <div className="text-xl font-semibold pt-2">
//                 {title}
//             </div>
//             <div className="text-md font-thin">
//                 {content.slice(0, 100) + "..."}
//             </div>
//             <div className="text-slate-500 text-sm font-thin pt-4">
//                 {`${Math.ceil(content.length / 100)} minute(s) read`}
//             </div>
//         </div>
//     </Link>
// }

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
    return <div className="w-[450px] pb-4 m-4">
        <Card className="w-full h-64 pr-4">
            <CardHeader>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription className="text-lg">{authorName}</CardDescription>
            </CardHeader>
            <CardContent className="text-lg text-wrap line-clamp-3">
                {content.slice(0, 100) + "..."}
            </CardContent>
            <CardFooter>
                   
                    <Link to={`/blog/${id}`}>
                    <Button className="cursor-pointer">
                        Read More
                    </Button>
                    </Link>                 
            </CardFooter>

        </Card>
    </div>

}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

