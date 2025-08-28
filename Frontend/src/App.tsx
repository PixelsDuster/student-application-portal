import { useSelector } from "react-redux"
import type { RootState } from "./redux/store"
import { Routes, Route, Navigate } from 'react-router-dom'

import TopMenu from "./components/Authentication/TopMenu"
import SideBar from "./components/SideBar"
import PublicPage from "./components/Authentication/PublicPage"
import PrivatePage from "./components/Authentication/PrivatePage"
import UserManagement from "./components/UserManagement/UserManagement"
import DegreeCourseManagement from "./components/DegreeCourseManagement/DegreeCourseManagement"
import DegreeCourseApplicationManagement from "./components/DegreeCourseApplicationManagement/ApplicationManagement"

function App() {
  const isAuthenticated: boolean = useSelector((state: RootState) => state.auth.isAuthenticated)
  const isAdmin: boolean = useSelector((state: RootState) => state.user.isAdministrator)

  return (
      
    <div className="App d-flex flex-column vh-100">
      {/* Always show TopMenu at the top */}
      <TopMenu />

      {/* Layout row: sidebar + main content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar (only for authenticated users) */}
        {isAuthenticated && (
          <div className="bg-light border-end" style={{ width: '70px' }}>
            <SideBar />
          </div>
        )}

        {/* Main content area */}
        <main className="flex-grow-1 p-1" style={{ overflowY: 'auto' }}>
          <Routes>
            {!isAuthenticated ? (
              <Route path="*" element={<PublicPage />} />
            ) : (
              <>
                <Route path="/" element={<PrivatePage />} />
                <Route
                  path="/UserManagement"
                  element={
                    isAdmin ? <UserManagement /> : <Navigate to="/" replace />
                  }
                />
                <Route 
                  path="/DegreeCourseManagement"
                  element={<DegreeCourseManagement />}
                />
                <Route 
                  path="/DegreeCourseApplicationManagement"
                  element={<DegreeCourseApplicationManagement />}
                />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </div>

  )
}

export default App