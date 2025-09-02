"use client"

import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function LogoutButton() {
  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      localStorage.removeItem("token")
      localStorage.removeItem("role")

      alert("Logged out: You have been logged out.")

      navigate("/login")
    } catch {
      alert("Logout failed")
    }
  }

  return (
    <Button variant="destructive" onClick={onLogout}>
      Logout
    </Button>
  )
}
