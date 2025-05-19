import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from '@kaushikkaizoku/common/dist'
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export const Auth =({type}:{type: "signin"| "signup"}) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()
    async function SendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup'?"signup":"signin"}`, postInputs);
            const jwt = response.data;
            console.log(jwt)
            localStorage.setItem("token", jwt);
            navigate("/blog")
        }catch(e){
            console.log(e)
        }        
    }

    return <div className="h-screen flex justify-center items-center">
        <div>         
        <div className="px-10 ">
        <div className="text-start text-3xl font-bold">Create an account</div>
        <div className="text-start text-xl font-bold">Enter email to create an account</div>
        <div className="text-center text-md text-slate-500">
        {type === "signup" ? "Already have an account?" : "Don't have an account?" }
        <Link className="underline pl-1" to={type ==="signup"?"/signin" : "/signup"}>{type === "signup" ? "Login" : "Sign up" }
        </Link>
        </div>
        </div>
        <div className="flex flex-col gap-4 w-96 mt-10">
        {type === "signup" ? <div>
        <Label htmlFor="name" className="text-md">Name</Label>
        <Input type="text" 
            id="name" 
            placeholder="Name"
            onChange={(e) => {
            setPostInputs({
                ...postInputs,
                name: e.target.value
                })
            }}
        /> 
        </div> : null }
        <div>
            <Label htmlFor="email" className="text-md">Email</Label>
            <Input type="email" 
                id="email" 
                placeholder="Email" 
                onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                        })
                }}
            />
        </div>
        <div>
            <Label htmlFor="password" className="text-md">Password</Label>
            <Input type="password" 
                id="password" 
                placeholder="Password" 
                onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }}
            />
        </div>
        </div>
        <Button onClick={SendRequest} className="w-full mt-4 " variant="default">
        {type === "signup"? "Sign up": "Sign in"}
        </Button>
        
        </div >
       
    </div>
}

