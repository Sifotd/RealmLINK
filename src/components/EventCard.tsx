import Link from "next/link";
// import Image from "next/image";
import { Event } from "@/lib/types";
import { formatDate } from "@/lib/mockData";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="card w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="relative h-48">
        <img
          src={event.previewImageUrl}
          alt={event.title}
          className="object-cover w-full h-full"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          loading="lazy"
        />
        {/* 图片遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {/* 票价角标 */}
        <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">{event.price} SUI</span>
      </div>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold mb-1 line-clamp-1">{event.title}</h2>
        <p className="text-xs text-gray-400 mb-1">主办方：{event.creatorAddress.slice(0, 8)}...{event.creatorAddress.slice(-4)}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{event.description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
          <span>时间：{formatDate(event.startTime)}</span>
          <span>剩余票数：{event.remainingTickets}</span>
        </div>
        <div className="card-actions justify-end mt-2">
          <Link href={`/events/${event.id}`} className="btn btn-primary btn-sm rounded-full px-5">查看详情</Link>
        </div>
      </div>
    </div>
  );
} 