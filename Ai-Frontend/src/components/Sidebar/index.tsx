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

interface Chat {
    id: number;
    title: string;
    pinned: boolean;
}

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const [activeChat, setActiveChat] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [chats, setChats] = useState<Chat[]>([
        {
            id: 1,
            title: "Onboarding Request Email",
            pinned: true,
        },
        {
            id: 2,
            title: "ChatGPT Sidebar SCSS",
            pinned: false,
        },
        {
            id: 3,
            title: "JSON Parsing and Rendering",
            pinned: false,
        },
        {
            id: 4,
            title: "Multiple File Response JSON",
            pinned: false,
        },
        {
            id: 5,
            title: "Unidirectional Data Flow",
            pinned: false,
        },
        {
            id: 6,
            title: "Clean Maintainable Code",
            pinned: false,
        },
        {
            id: 7,
            title: "UK Timings Explanation",
            pinned: false,
        },
        {
            id: 8,
            title: "Joining Date Delay Inquiry",
            pinned: false,
        },
    ]);
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
        { icon: <FiEdit />, label: "New chat" },
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
                    <div className="menu-item" key={item.label}>
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