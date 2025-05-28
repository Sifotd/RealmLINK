import { getEvents } from "@/lib/mockData";
import EventCard from "@/components/EventCard";
import Link from "next/link";

export default function EventsPage() {
  const events = getEvents();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">浏览所有活动</h1>

      {/* 顶部筛选/搜索栏（结构预留，可后续扩展） */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-base-200 p-4 rounded-xl shadow-sm">
        <div className="flex gap-2 flex-wrap">
          <select className="select select-bordered select-sm">
            <option>全部分类</option>
            <option>区块链</option>
            <option>艺术</option>
            <option>游戏</option>
            <option>技术</option>
          </select>
          <select className="select select-bordered select-sm">
            <option>全部时间</option>
            <option>本周</option>
            <option>本月</option>
            <option>今年</option>
          </select>
          <select className="select select-bordered select-sm">
            <option>价格排序</option>
            <option>从低到高</option>
            <option>从高到低</option>
          </select>
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="搜索活动名称/主办方" className="input input-bordered input-sm w-48" />
          <button className="btn btn-primary btn-sm">搜索</button>
        </div>
      </div>

      {/* 活动卡片区 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* 空状态 */}
      {events.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-600">暂无活动</h3>
          <p className="mt-2 text-gray-500">请稍后再来查看，或者<Link href="/events/create" className="text-primary underline ml-1">创建您自己的活动</Link></p>
        </div>
      )}

      {/* 分页结构预留 */}
      <div className="flex justify-center mt-12">
        <div className="join">
          <button className="join-item btn btn-sm btn-outline">«</button>
          <button className="join-item btn btn-sm btn-primary">1</button>
          <button className="join-item btn btn-sm btn-outline">2</button>
          <button className="join-item btn btn-sm btn-outline">3</button>
          <button className="join-item btn btn-sm btn-outline">»</button>
        </div>
      </div>
    </div>
  );
} 