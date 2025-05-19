import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
// import { BlogSkeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div className="grid grid-cols-2 gap-2">
                    <BlogCard.Skeleton />
                    <BlogCard.Skeleton />
                    <BlogCard.Skeleton />
                    <BlogCard.Skeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div className="grid grid-cols-2 gap-2">
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
}