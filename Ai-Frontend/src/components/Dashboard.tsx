import React, { Suspense, useState } from "react";

const UserInfo = React.lazy(() => import("./UserInfo"))

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  return <>
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h1>Welcome to Dashboard</h1>
      <button style={{ width: "10rem" }} onClick={() => {
        setIsOpen(p => !p)
      }}>View Profile</button>

      {isOpen && (
        <Suspense fallback={<p>Loading...</p>}>
          <UserInfo />
        </Suspense>

      )}
    </div>
  </>;
}

export default Dashboard;