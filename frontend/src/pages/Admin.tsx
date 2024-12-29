import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/Skeleton";
import { UserCard } from "../components/UserCard";
import { useAdminBlogs, useAdminUsers } from "../hooks";
import { useState } from "react";

enum Mode {
    Blogs,
    Users
}

export const Admin = () => {
    const { loading, blogs } = useAdminBlogs();
    const { loadingUsers, users } = useAdminUsers();
    const [mode, setMode] = useState<Mode>(Mode.Blogs);

        return <div>
            <Appbar /> 
            <div className="flex justify-center my-2">
            <button onClick={ () => setMode(Mode.Blogs)} className = {mode === Mode.Blogs ? " h-fit bg-blue-600  text-white ring-1 ring-blue-300 rounded-lg font-semibold text-2xl sm:text-xl px-5 py-2.5"
            : "h-fit text-black rounded-lg font-semibold text-2xl sm:text-xl px-5 py-2.5"}>Blogs</button>
            <button onClick={ () => setMode(Mode.Users)} className={mode === Mode.Users ? " h-fit bg-blue-600  text-white ring-1 ring-blue-300 rounded-lg font-semibold text-2xl sm:text-xl px-5 py-2.5"
            : " h-fit text-black rounded-lg font-semibold text-2xl sm:text-xl px-5 py-2.5"}>Users</button>
            </div>
          
            { loading ?
              <div  className="flex justify-center">
              <div>
                  <BlogSkeleton />
                  <BlogSkeleton />
                  <BlogSkeleton />
                  <BlogSkeleton />
                  <BlogSkeleton />
              </div>
            </div> :  <div className="flex justify-center">
            { mode === Mode.Users ? <div>{users.map(user => <UserCard
                    key={user.id}
                    name={user.name}
                    email={user.email}
                />
            )}</div> :
             <div> 
             {blogs.map(blog => <BlogCard
                 id={blog.id}
                 authorName={blog.author.name || "Anonymous"}
                 title={blog.title}
                 content={blog.content}
                 publishedDate={"2nd Feb 2024"}
             />)}
             </div>}   
            </div>}          
        </div>
    }
    
