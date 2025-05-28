"use client";

import { formatDate } from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";
import { Event } from "@/lib/types";

interface EventDetailProps {
  event: Event;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/events" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← 返回活动列表
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96 w-full">
          <Image
            src={event.previewImageUrl}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-6">
            <div className="mr-8">
              <div className="font-semibold">开始时间</div>
              <div>{formatDate(event.startTime)}</div>
            </div>
            <div>
              <div className="font-semibold">结束时间</div>
              <div>{formatDate(event.endTime)}</div>
            </div>
          </div>
          
          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-2">活动详情</h2>
            <p className="text-gray-700">{event.description}</p>
          </div>
          
          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-2">主办方信息</h2>
            <p className="text-gray-700">主办方地址：{event.creatorAddress}</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
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
            
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                max={event.remainingTickets}
                defaultValue="1"
                className="w-20 px-3 py-2 border rounded-lg"
              />
              <button className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                购买门票
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 