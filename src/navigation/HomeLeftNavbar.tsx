import { Link } from "react-router"
import { MdHistory } from "react-icons/md"
import { GoHome } from "react-icons/go"
import { IoMdTime } from "react-icons/io"
import { AiOutlineLike } from "react-icons/ai"
import {
  ContentPolicyIcon,
  PrivacyPolicyIcon,
  UserAgreementIcon,
} from "../assets/svgs/icons.tsx"

import { BasicMenuNavContainer } from "../components/Containers.tsx"

export default function DesktopLeftNavbar() {
  // return (
  //   <div style={{ width: "95%", paddingLeft: "2%", paddingRight: "2%" }}>
  //     <BasicMenuNavContainer>
  //       <span style={{ marginRight: 10, height: 16 }}>
  //         <GoHome size={16} color="#2d2d2d" />
  //       </span>
  //       <div className="page-nav-title">
  //         <Link to={`/`}>Home</Link>
  //       </div>
  //     </BasicMenuNavContainer>
  //     <BasicMenuNavContainer>
  //       <span style={{ marginRight: 10, height: 16 }}>
  //         <MdHistory size={16} color="#2d2d2d" />
  //       </span>
  //       <div className="page-nav-title">
  //         <Link to={`#`}>History</Link>
  //       </div>
  //     </BasicMenuNavContainer>
  //     <BasicMenuNavContainer>
  //       <span style={{ marginRight: 10, height: 16 }}>
  //         <IoMdTime size={16} color="#2d2d2d" />
  //       </span>
  //       <div className="page-nav-title">
  //         <Link to={`#`}>Read Later</Link>
  //       </div>
  //     </BasicMenuNavContainer>
  //     <BasicMenuNavContainer>
  //       <span style={{ marginRight: 10, height: 16 }}>
  //         <AiOutlineLike size={16} color="#2d2d2d" />
  //       </span>
  //       <div className="page-nav-title">
  //         <Link to={`#`}>Likes</Link>
  //       </div>
  //     </BasicMenuNavContainer>
  //     <hr />
  //     <BasicMenuNavContainer>
  //       <span
  //         style={{
  //           marginRight: 10,
  //           height: 16,
  //           width: 16,
  //         }}
  //       >
  //         <ContentPolicyIcon />
  //       </span>
  //       <div className="page-nav-title">
  //         <Link to={`/policies/ContentPolicy`}>Content Policy</Link>
  //       </div>
  //     </BasicMenuNavContainer>
  //     <BasicMenuNavContainer>
  //       <span style={{ marginRight: 10, height: 16, width: 16 }}>
  //         <PrivacyPolicyIcon />
  //       </span>
  //       <div className="page-nav-title">
  //         <Link to={`/policies/PrivacyPolicy`}>Privacy Policy</Link>
  //       </div>
  //     </BasicMenuNavContainer>
  //     <BasicMenuNavContainer>
  //       <span style={{ marginRight: 10, height: 16, width: 16 }}>
  //         <UserAgreementIcon />
  //       </span>
  //       <div className="page-nav-title">
  //         <Link to={`/policies/UserAgreement`}>User Agreement</Link>
  //       </div>
  //     </BasicMenuNavContainer>
  //   </div>
  // )
  return (
    <div className="w-60 bg-gray-100 p-4 space-y-4 overflow-y-auto">
      {/* <div className="p-4 text-2xl font-bold border-b border-gray-700">
        MyApp
      </div> */}
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
          🏠 Dashboard
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
          👤 Profile
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
          ⚙️ Settings
        </a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
          📄 Reports
        </a>
      </nav>
    </div>
  )

  // return (
  //   <aside className="w-60 bg-gray-100 p-4 space-y-4 overflow-y-auto">
  //     <div className="font-semibold">Home</div>
  //     <div>Trending</div>
  //     <div>Subscriptions</div>
  //     <hr />
  //     <div>Library</div>
  //     <div>History</div>
  //   </aside>
  // )
}
