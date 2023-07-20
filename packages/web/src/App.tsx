import { useDark } from "@/hooks"
import router from "@/routes"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

export default function App() {
  const [isDark] = useDark()

  return (
    <>
      <RouterProvider router={router} />
      <Toaster theme={isDark ? "dark" : "light"} position="top-right" />
    </>
  )
}
