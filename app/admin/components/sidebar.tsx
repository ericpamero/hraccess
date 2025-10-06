'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaUsers, FaChartBar, FaCog, FaBookReader, FaSignOutAlt } from 'react-icons/fa';

export const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();

    // Hide sidebar automatically on mobile (when burger is visible)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Sidebar links config
    const links = [
        {
            href: "/admin",
            label: "Dashboard",
            icon: <FaTachometerAlt />
        },
        {
            href: "/admin/employees",
            label: "Employees",
            icon: <FaUsers />
        },
        {
            href: "/admin/files",
            label: "Files",
            icon: <FaChartBar />
        },
        {
            href: "/admin/userslog",
            label: "Users Log",
            icon: <FaBookReader />
        },
        {
            href: "/admin/settings",
            label: "Settings",
            icon: <FaCog />
        },
        {
            href: "/admin/profile",
            label: "Profile",
            icon: <FaUsers /> // You can change this icon if you prefer another
        },
    ];

    return (
        <>
            {/* Burger Button */}
            <button
                className="md:hidden flex flex-col justify-center items-center w-9 h-9 absolute top-6 left-6 z-50 bg-[#f8f9fa] rounded hover:bg-[#4ea8de] border-none cursor-pointer m-2"
                aria-label="Toggle menu"
                onClick={() => setSidebarOpen((open) => !open)}
            >
                <span className="block w-7 h-1 bg-[#22223b] rounded mb-1 transition-all duration-300" />
                <span className="block w-7 h-1 bg-[#22223b] rounded mb-1 transition-all duration-300" />
                <span className="block w-7 h-1 bg-[#22223b] rounded transition-all duration-300" />
            </button>

            {/* Sidebar */}
            <aside
                className={`
                    bg-[#22223b] text-white px-4 py-8 min-h-screen w-[250px] transition-all duration-300
                    fixed md:static z-40 top-0 left-0
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                    ${sidebarOpen ? "mt-16 md:mt-0" : ""}
                `}
                style={{ right: "auto" }}
            >
                <h2 className="mb-8 text-2xl tracking-wide font-semibold flex items-center gap-2">
                    <FaTachometerAlt className="inline-block mr-2" />
                    Admin Panel
                </h2>
                <nav>
                    <ul className="space-y-5">
                        {links.map(link => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-2 rounded transition-all duration-300 relative overflow-hidden
                                        hover:bg-[#2a2a40] hover:text-[#4ea8de] hover:pl-7 focus:bg-[#2a2a40] focus:text-[#4ea8de] focus:pl-7
                                        before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[3px] before:bg-[#4ea8de] before:transition-all before:duration-300
                                        hover:before:w-full focus:before:w-full
                                        ${pathname === link.href ? "bg-[#2a2a40] text-[#4ea8de] pl-7 before:w-full" : ""}
                                    `}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li className="pt-2 border-t border-[#35354d]">
                            <Link
                                href="/logout"
                                className={`flex items-center gap-3 px-4 py-2 rounded transition-all duration-300 relative overflow-hidden
                                    hover:bg-[#2a2a40] hover:text-red-400 hover:pl-7 focus:bg-[#2a2a40] focus:text-red-400 focus:pl-7
                                    before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[3px] before:bg-red-400 before:transition-all before:duration-300
                                    hover:before:w-full focus:before:w-full
                                    ${pathname === "/logout" ? "bg-[#2a2a40] text-red-400 pl-7 before:w-full" : ""}
                                `}
                            >
                                <FaSignOutAlt />
                                Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Footer */}
            <div className="hidden md:block fixed bottom-0 left-0 w-[250px] bg-[#22223b] py-4 text-center border-t border-[#35354d] z-50">
                <span className="text-xs text-[#bfc9e0] tracking-widest font-semibold">HRIS ACCESS</span>
            </div>
        </>
    )
}

