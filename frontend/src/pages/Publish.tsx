import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [ postId, setPostId] = useState("");
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const navigate = useNavigate();  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const saveDraft = async () => {
    const response = await axios.post("/api/posts/save-draft", {
        title,
        content,
        postId
    }, {
        headers: { "Authorization": localStorage.getItem("token")   }
    });

    const data = await response.data;
    setPostId(data.post.id);
    setLastSaved(new Date());
    };

    // Save after 5 seconds of inactivity
    useEffect(() => {
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
        saveDraft();
        }, 5000);
        return () => clearTimeout(typingTimeoutRef.current!);
    }, [title, content]);

    // Save every 30 seconds
    useEffect(() => {
        intervalRef.current = setInterval(() => {
        saveDraft();
        }, 30000);

        return () => clearInterval(intervalRef.current!);
    }, []);


    return <div>
    <Appbar />
    <div className="flex justify-center items-center w-full p-8 mt-20"> 
        <div className="max-w-screen w-full grid gap-6">
            <div className="grid gap-2">
            <Label className="text-lg font-medium">Title</Label>
            <Input placeholder="Title" 
            className="text-lg"
            onChange={(e) => {
                setTitle(e.target.value)
            }}
            />
            </div>
            

            <Textarea placeholder="Write your article..."
            onChange={(e) => {
                setContent(e.target.value)
            }} 
            className="min-h-96 resize-y text-lg md:text-2xl "/>
            <div className="flex justify-between">
            <div>
            <Button 
            variant="default"
            className="text-lg"
            onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog/post`, {
                    title,
                    content,
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                navigate(`/blog/${response.data.id}`)
            }} >
                Publish post
            </Button>
            <Button
            variant="outline"
            className="text-lg ml-4"
            onClick={saveDraft} >
                Save Draft
            </Button>
            </div>
            <div className="text-md text-muted-foreground mr-4">
                {lastSaved ? "Last saved: " : "Not saved yet"}
                {lastSaved?.toLocaleTimeString()}
            </div>           
            </div>           
        </div>
    </div>
</div>
}

