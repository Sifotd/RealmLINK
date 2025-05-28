"use client";

import { formatDate } from "@/lib/mockData";
import Link from "next/link";
import { Event } from "@/lib/types";
import { useCurrentWallet } from '@mysten/dapp-kit';
import { useState } from "react";

interface EventDetailProps {
  event: Event;
}

export default function EventDetail({ event }: EventDetailProps) {
  const { isConnected } = useCurrentWallet();
  const [quantity, setQuantity] = useState(1);
  const total = (event.price * quantity).toFixed(2);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="relative h-80 md:h-[420px] w-full mb-[-80px] md:mb-[-120px]">
        <img
          src={event.previewImageUrl}
          alt={event.title}
          className="object-cover w-full h-full"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-[-60px] md:mt-[-100px] mb-8 relative">
          <Link href="/events" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">← 返回活动列表</Link>
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
            <div>
              <span className="font-semibold">开始时间：</span>{formatDate(event.startTime)}
            </div>
            <div>
              <span className="font-semibold">结束时间：</span>{formatDate(event.endTime)}
            </div>
            {/* 可扩展：地点、线上/线下等 */}
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">活动详情</h2>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">主办方信息</h2>
            <p className="text-gray-700">主办方地址：{event.creatorAddress}</p>
          </div>
          <hr className="my-8" />
          {/* 购票分区 */}
          <div className="bg-base-200 p-6 rounded-lg">
            <div className="flex flex-wrap gap-8 mb-4">
              <div>
                <div className="text-sm text-gray-600">票价</div>
                <div className="text-2xl font-bold">{event.price} SUI</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">总票数</div>
                <div className="text-2xl font-bold">{event.maxTickets}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">剩余票数</div>
                <div className="text-2xl font-bold">{event.remainingTickets}</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${((event.maxTickets - event.remainingTickets) / event.maxTickets) * 100}%` }}
              ></div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <span>数量：</span>
                <input
                  type="number"
                  min={1}
                  max={event.remainingTickets}
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, Math.min(event.remainingTickets, Number(e.target.value))))}
                  className="w-20 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex-1 text-lg font-semibold">总价：{total} SUI</div>
              {isConnected ? (
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex-1">购买门票</button>
              ) : (
                <div className="flex-1">
                  <button className="bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed w-full" disabled>请先连接钱包</button>
                </div>
              )}
            </div>
            {/* 可扩展：购买成功提示、钱包交互等 */}
          </div>
        </div>
      </div>
    </div>
  );
} 