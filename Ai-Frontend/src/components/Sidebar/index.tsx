import { useMemo, useState } from "react";
import { clsx } from "clsx"
import {
    FiEdit,
    FiSearch,
    FiMessageCircle,
    FiBox,
} from "react-icons/fi";
import "../../assets/scss/sidebar.scss"
import { LuPanelLeftClose } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

// interface Chat {
//     id: number;
//     title: string;
//     pinned: boolean;
// }

const Sidebar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [activeChat, setActiveChat] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState(false);
    // const [chats, setChats] = useState<Chat[]>([
    const chats = [{
        id: 1,
        title: "React Component Development",
        pinned: true,
    },
    {
        id: 2,
        title: "Node.js API Integration",
        pinned: false,
    },
    {
        id: 3,
        title: "Authentication Flow",
        pinned: false,
    },
    {
        id: 4,
        title: "Dashboard UI Design",
        pinned: false,
    },
    {
        id: 5,
        title: "REST API Development",
        pinned: false,
    },
    {
        id: 6,
        title: "Database Schema Design",
        pinned: false,
    },
    {
        id: 7,
        title: "State Management",
        pinned: false,
    },
    {
        id: 8,
        title: "Form Validation",
        pinned: false,
    },
    {
        id: 9,
        title: "JWT Authentication",
        pinned: false,
    },
    {
        id: 10,
        title: "File Upload Feature",
        pinned: false,
    },
    {
        id: 11,
        title: "Responsive Layout",
        pinned: false,
    },
    {
        id: 12,
        title: "Error Handling",
        pinned: false,
    },
    {
        id: 13,
        title: "Performance Optimization",
        pinned: false,
    },
    {
        id: 14,
        title: "Code Refactoring",
        pinned: false,
    },
    {
        id: 15,
        title: "Deployment Configuration",
        pinned: false,
    },
    ];
    const filtered = useMemo(
        () =>
            chats.filter((c) =>
                c.title.toLowerCase().includes(search.toLowerCase())
            ),
        [search, chats]
    );
    const pinned = filtered.filter((c) => c.pinned);
    const recents = filtered.filter((c) => !c.pinned);
    const menuItems = [
        { icon: <FiEdit />, label: "New chat", path: "/" },
    ];
    const onToggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };
    return (
        <aside className={clsx("sidebar", isCollapsed && "collapsed")}>
            <header className="chat-header">
                <div className="chat-header__left">
                    <div className="chat-header__title"></div>
                    AI
                </div>
                <div className="chat-header__right">
                    <button
                        className="icon-btn"
                        onClick={onToggleSidebar}
                    >
                        <LuPanelLeftClose size={22} strokeWidth={2} />
                    </button>
                </div>
            </header>
            <div className="sidebar-top">
                {menuItems.map((item) => (
                    <div className="menu-item" key={item.label}
                        onClick={() => navigate(item.path)}
                    >
                        {item.icon}
                        <span className="menu-label">{item.label}</span>
                    </div>
                ))}
                <div className="search-box">
                    <FiSearch className="search-icon" />
                    <input
                        placeholder="Search chats"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="sidebar-content">
                {!!pinned.length && (
                    <div className="sidebar-content-item pinned">
                        <div className="section-title">Pinned</div>
                        {pinned.map((chat) => (
                            <div
                                key={chat.id}
                                className={`chat-item ${activeChat === chat.id ? "active" : ""
                                    }`}
                                onClick={() => setActiveChat(chat.id)}
                            >
                                <FiMessageCircle />
                                <span className="chat-item-label">{chat.title}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="sidebar-content-item">
                    <div className="section-title">Recents</div>
                    {recents.map((chat) => (
                        <div
                            key={chat.id}
                            className={clsx("chat-item", activeChat === chat.id && "active")}
                            onClick={() => setActiveChat(chat.id)}
                        >
                            <span className="chat-item-label">{chat.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="sidebar-footer">
                <div className="profile">
                    <div className="avatar">AB</div>
                    <span className="profile-text">Aravind Balaji</span>
                    <FiBox />
                </div>
            </div>
        </aside>
    );
};
export default Sidebar;