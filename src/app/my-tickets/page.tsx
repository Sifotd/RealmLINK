"use client";

import { useState } from "react";
import Link from "next/link";
import { useCurrentWallet } from '@mysten/dapp-kit';

// mock 用户票据和活动数据
const myTickets = [
  {
    id: 'ticket-1',
    eventTitle: '2024区块链峰会',
    eventId: '1',
    date: '2024-11-15',
    ticketId: '0x123...abc',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
  },
  {
    id: 'ticket-2',
    eventTitle: '元宇宙艺术展',
    eventId: '2',
    date: '2024-10-01',
    ticketId: '0x456...def',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
  },
];
const myEvents = [
  {
    id: '1',
    title: '2024区块链峰会',
    date: '2024-11-15',
    status: '已发布',
    sold: 350,
    total: 500,
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
  },
  {
    id: '3',
    title: 'Web3游戏嘉年华',
    date: '2024-12-20',
    status: '草稿',
    sold: 0,
    total: 300,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
  },
];

export default function MyTicketsPage() {
  const { isConnected } = useCurrentWallet();
  const [tab, setTab] = useState<'tickets' | 'events'>('tickets');

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-6">我的票务</h1>
        <div className="bg-base-200 rounded-xl p-8 shadow">
          <p className="text-lg text-gray-600 mb-4">请先连接钱包以查看您的票据和活动。</p>
          <Link href="/" className="btn btn-primary">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">我的票务中心</h1>
      {/* Tab 切换 */}
      <div className="flex justify-center gap-4 mb-8">
        <button className={`btn btn-sm ${tab === 'tickets' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setTab('tickets')}>已购票据</button>
        <button className={`btn btn-sm ${tab === 'events' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setTab('events')}>我创建的活动</button>
      </div>
      {/* Tab 内容 */}
      {tab === 'tickets' ? (
        <div>
          {myTickets.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600">您还没有购买任何票据</h3>
              <Link href="/events" className="btn btn-primary mt-4">去浏览活动</Link>
            </div>
          ) : (
            <div className="space-y-6">
              {myTickets.map(ticket => (
                <div key={ticket.id} className="flex gap-4 items-center bg-base-100 rounded-xl shadow p-4">
                  <img src={ticket.image} alt={ticket.eventTitle} className="w-24 h-16 object-cover rounded-lg border" />
                  <div className="flex-1">
                    <div className="font-bold text-lg">{ticket.eventTitle}</div>
                    <div className="text-xs text-gray-400 mb-1">日期：{ticket.date} | 票据ID：{ticket.ticketId}</div>
                    <div className="flex gap-2 mt-2">
                      <Link href={`/events/${ticket.eventId}`} className="btn btn-xs btn-outline">查看活动</Link>
                      <button className="btn btn-xs btn-secondary">查看票据/二维码</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {myEvents.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600">您还没有创建任何活动</h3>
              <Link href="/events/create" className="btn btn-primary mt-4">去创建活动</Link>
            </div>
          ) : (
            <div className="space-y-6">
              {myEvents.map(event => (
                <div key={event.id} className="flex gap-4 items-center bg-base-100 rounded-xl shadow p-4">
                  <img src={event.image} alt={event.title} className="w-24 h-16 object-cover rounded-lg border" />
                  <div className="flex-1">
                    <div className="font-bold text-lg">{event.title}</div>
                    <div className="text-xs text-gray-400 mb-1">日期：{event.date} | 状态：{event.status}</div>
                    <div className="flex gap-2 mt-2">
                      <span className="badge badge-outline">已售 {event.sold}/{event.total}</span>
                      <Link href={`/events/${event.id}`} className="btn btn-xs btn-outline">查看活动</Link>
                      <button className="btn btn-xs btn-secondary">管理活动</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 