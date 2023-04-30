//this file wrapps up all the files in the project
import "./globals.css"
import Nav from "../src/server/components/Nav"
import QueryWrapper from "@/server/components/QueryWrapper"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryWrapper>
          <Nav />
          <div className="bg-gray-200 p-10">{children}</div>
        </QueryWrapper>
      </body>
    </html>
  )
}
