import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinnner"
import { useBlog } from "../hooks";
import {useParams} from "react-router-dom";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    return <div className="h-screen">
            <Appbar />
                {(loading || !blog) ? ( 
                    <div className="h-full flex flex-col justify-center">                
                    <div className="flex justify-center">
                    <Spinner size="lg"/>
                    </div>
                    </div>
                 ) : (<div>
                    <FullBlog blog={blog} />
                    </div>
                 )}
            </div>
}