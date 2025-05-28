import Link from "next/link";

// mock 精选活动数据
const featuredEvents = [
  {
    id: '1',
    title: '2024区块链峰会',
    date: '2024-11-15',
    price: '0.2 SUI',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
  },
  {
    id: '2',
    title: '元宇宙艺术展',
    date: '2024-10-01',
    price: '0.05 SUI',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
  },
  {
    id: '3',
    title: 'Web3游戏嘉年华',
    date: '2024-12-20',
    price: '0.1 SUI',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
  },
  {
    id: '4',
    title: '开发者训练营',
    date: '2024-09-05',
    price: '0.3 SUI',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      {/* 顶部大Banner区 */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501281668745-f7f57925c3b4)' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto py-16">
          <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Web3门票销售平台</h1>
          <p className="mb-8 text-lg drop-shadow">安全、透明、便捷地购买和管理活动门票，开启你的链上活动新体验。</p>
          <div className="flex gap-4 justify-center">
            <Link href="/events" className="btn btn-primary btn-lg">浏览活动</Link>
            <Link href="/events/create" className="btn btn-outline btn-secondary btn-lg">创建活动</Link>
          </div>
        </div>
      </section>

      {/* 平台特性区 */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">平台特点</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow">
              <div className="mb-4">
                <svg className="h-14 w-14 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">安全可靠</h3>
              <p className="text-gray-600">区块链技术保障，所有交易透明记录，不可篡改，确保门票真实有效。</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow">
              <div className="mb-4">
                <svg className="h-14 w-14 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">直接参与</h3>
              <p className="text-gray-600">主办方与参与者直接连接，无中间商，降低成本，提升体验。</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow">
              <div className="mb-4">
                <svg className="h-14 w-14 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">便捷高效</h3>
              <p className="text-gray-600">轻松创建和管理活动，快速购票，无需繁琐流程，节省宝贵时间。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 精选活动横滑区 */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">精选活动</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
            {featuredEvents.map(event => (
              <div key={event.id} className="min-w-[260px] max-w-xs bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0">
                <div className="h-40 w-full relative">
                  <img src={event.image} alt={event.title} className="object-cover w-full h-full" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{event.title}</h3>
                  <div className="text-xs text-gray-400 mb-1">{event.date}</div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-primary font-semibold">{event.price}</span>
                    <Link href={`/events/${event.id}`} className="btn btn-sm btn-primary rounded-full px-4">查看详情</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部CTA区 */}
      <section className="bg-primary text-primary-content py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">准备好开始了吗？</h2>
          <p className="mb-8 max-w-md mx-auto">加入我们，发现精彩活动，或创建属于你的链上活动！</p>
          <div className="flex gap-4 justify-center">
            <Link href="/events/create" className="btn bg-white text-primary btn-lg">立即创建活动</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 text-base-content py-8 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 mb-2 md:mb-0">
            <Link href="#">关于我们</Link>
            <Link href="#">联系我们</Link>
            <Link href="#">服务条款</Link>
            <Link href="#">隐私政策</Link>
          </div>
          <div className="flex gap-3">
            <a href="#" aria-label="Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.99 4.07 7.13 1.64 4.16c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62-.72-.02-1.39-.22-1.98-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.12 2.91 3.99 2.94A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.7 8.7 0 0024 4.59a8.48 8.48 0 01-2.54.7z" /></svg></a>
            <a href="#" aria-label="YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9C16.2 5 12 5 12 5h-.1s-4.2 0-7.1.1c-.4 0-1.2.1-1.9.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.8 2.1.9 1.5.1 6.9.1 6.9.1s4.2 0 7.1-.1c.4 0 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2zM9.8 15.3V8.7l6.4 3.3-6.4 3.3z" /></svg></a>
          </div>
          <div className="text-sm text-gray-500">© 2024 - YourPlatformName</div>
        </div>
      </footer>
    </div>
  );
}

