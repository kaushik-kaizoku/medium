export const UserCard = ({ name, email } : {name: string, email: string}) => {
    return <div className="border p-4 m-4">
        <div>Name  : {name}</div>
        <div>Email : {email}</div>
        {/* <button className="bg-red-500 text-white p-2 rounded mt-2">Delete</button> */}
    </div>
}