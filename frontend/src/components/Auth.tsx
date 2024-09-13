import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from '@kaushikkaizoku/common/dist'
import axios from "axios"
import { BACKEND_URL } from "../config"


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
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blog")
        }catch(e){
            console.log(e)
        }        
    }

    return <div className="h-screen flex justify-center items-center">
        <div>         
        <div className="px-10  ">
        <div className="text-center text-3xl font-bold">Create an account</div>
        <div className="text-center text-md text-slate-500">
        {type === "signup" ? "Already have an account?" : "Don't have an account?" }
        <Link className="underline pl-1" to={type ==="signup"?"/signin" : "/signup"}>{type === "signup" ? "Login" : "Sign up" }
        </Link>
        </div>
        </div>
        {type === "signup" ? <LabelledInput label="Name" placeholder="kaushik" onChange={(e) => {
            setPostInputs({
                ...postInputs,
                name: e.target.value
            })
        }} /> : null }
        <LabelledInput label="Username" placeholder="kaushik@gmail.com" onChange={(e) => {
            setPostInputs({
                ...postInputs,
                email: e.target.value
            })
        }} />
        <LabelledInput label="Password" type={"password"}  onChange={(e) => {
            setPostInputs({
                ...postInputs,
                password: e.target.value
            })
        }} />
        <button onClick={SendRequest} type="button" className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "Sign up": "Sign in"}</button>
        </div >
       
    </div>
}

interface LabelledInputType{
    label: string,
    placeholder?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LabelledInput({label, placeholder, onChange, type}:LabelledInputType) {
    return <div className="mt-2 ">
    <label  className="block mb-2 text-sm font-bold text-gray-900">{label}</label>
    <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>
}