
import CreatePasswordForm from "@/components/CreatePasswordForm"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const NewPasswordPage=()=>{
    const location = useLocation()
    const {username} = location.state
    useEffect(()=>{
        console.log("email", username)
    },[])
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create Password</h1>
          <p className="text-sm text-muted-foreground">Create a secure password for your account</p>
        </div>
        <CreatePasswordForm email={username} />
      </div>
    </div>
  )
}
export default NewPasswordPage
