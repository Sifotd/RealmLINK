'use client';

import Link from "next/link";
import { CustomConnectWallet } from "./ConnectWallet";
import { useCurrentWallet } from '@mysten/dapp-kit';

export default function Navbar() {
  // 判断钱包是否已连接
  const { isConnected } = useCurrentWallet();

  return (
    <nav className="navbar bg-white shadow-md px-4 sticky top-0 z-50">
      <div className="navbar-start">
        {/* Logo/平台名 */}
        <Link href="/" className="btn btn-ghost text-xl font-bold tracking-wide">票务平台</Link>
      </div>
      {/* 桌面端横向菜单 */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li><Link href="/">首页</Link></li>
          <li><Link href="/events">浏览活动</Link></li>
          <li><Link href="/events/create">创建活动</Link></li>
          <li>
            {isConnected ? (
              <Link href="/my-tickets" className="">我的票务</Link>
            ) : (
              <span className="btn btn-disabled cursor-not-allowed opacity-60">我的票务</span>
            )}
          </li>
        </ul>
      </div>
      {/* 移动端下拉菜单 */}
      <div className="navbar-center lg:hidden">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-md w-44">
            <li><Link href="/">首页</Link></li>
            <li><Link href="/events">浏览活动</Link></li>
            <li><Link href="/events/create">创建活动</Link></li>
            <li>
              {isConnected ? (
                <Link href="/my-tickets">我的票务</Link>
              ) : (
                <span className="btn btn-disabled cursor-not-allowed opacity-60">我的票务</span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <CustomConnectWallet />
      </div>
    </nav>
  );
} 