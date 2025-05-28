"use client";

import { useState } from "react";
import { createEvent } from "@/lib/mockData";
import { useRouter } from "next/navigation";

const steps = [
  "活动信息",
  "时间地点",
  "票务与图片",
  "预览与发布"
];

export default function CreateEventPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    creatorAddress: "0x123456789abcdef123456789abcdef123456789a", // 假设这是当前连接的钱包地址
    title: "",
    description: "",
    previewImageUrl: "",
    startTime: "",
    endTime: "",
    maxTickets: 100,
    price: 0.1
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxTickets' || name === 'price' ? parseFloat(value) : value
    }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!formData.title.trim()) newErrors.title = "活动标题不能为空";
      if (!formData.description.trim()) newErrors.description = "活动描述不能为空";
    }
    if (step === 1) {
      if (!formData.startTime) newErrors.startTime = "请选择开始时间";
      if (!formData.endTime) newErrors.endTime = "请选择结束时间";
      else if (new Date(formData.endTime) <= new Date(formData.startTime)) newErrors.endTime = "结束时间必须晚于开始时间";
    }
    if (step === 2) {
      if (!formData.previewImageUrl.trim()) newErrors.previewImageUrl = "预览图URL不能为空";
      else if (!formData.previewImageUrl.match(/^https?:\/\/.+\..+/)) newErrors.previewImageUrl = "请输入有效的URL地址";
      if (formData.maxTickets <= 0) newErrors.maxTickets = "票数必须大于0";
      if (formData.price <= 0) newErrors.price = "价格必须大于0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setIsSubmitting(true);
    try {
      const newEvent = createEvent(formData);
      setTimeout(() => {
        setIsSubmitting(false);
        router.push(`/events/${newEvent.id}`);
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      alert("创建活动失败，请重试");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">创建新活动</h1>
      {/* 步骤指示器 */}
      <div className="flex justify-between mb-8">
        {steps.map((s, i) => (
          <div key={s} className={`flex-1 text-center ${i === step ? 'font-bold text-primary' : 'text-gray-400'}`}>{s}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Step 1: 活动信息 */}
          {step === 0 && (
            <>
              <div className="form-control mb-4">
                <label className="label" htmlFor="title">
                  <span className="label-text">活动标题</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                  placeholder="输入活动标题"
                />
                {errors.title && <span className="text-error text-sm mt-1">{errors.title}</span>}
              </div>
              <div className="form-control mb-4">
                <label className="label" htmlFor="description">
                  <span className="label-text">活动描述</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`textarea textarea-bordered h-32 ${errors.description ? 'textarea-error' : ''}`}
                  placeholder="详细描述您的活动"
                ></textarea>
                {errors.description && <span className="text-error text-sm mt-1">{errors.description}</span>}
              </div>
            </>
          )}
          {/* Step 2: 时间地点 */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label" htmlFor="startTime">
                  <span className="label-text">开始时间</span>
                </label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.startTime ? 'input-error' : ''}`}
                />
                {errors.startTime && <span className="text-error text-sm mt-1">{errors.startTime}</span>}
              </div>
              <div className="form-control">
                <label className="label" htmlFor="endTime">
                  <span className="label-text">结束时间</span>
                </label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.endTime ? 'input-error' : ''}`}
                />
                {errors.endTime && <span className="text-error text-sm mt-1">{errors.endTime}</span>}
              </div>
            </div>
          )}
          {/* Step 3: 票务与图片 */}
          {step === 2 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-control">
                  <label className="label" htmlFor="maxTickets">
                    <span className="label-text">最大票数</span>
                  </label>
                  <input
                    type="number"
                    id="maxTickets"
                    name="maxTickets"
                    value={formData.maxTickets}
                    onChange={handleChange}
                    min="1"
                    step="1"
                    className={`input input-bordered w-full ${errors.maxTickets ? 'input-error' : ''}`}
                  />
                  {errors.maxTickets && <span className="text-error text-sm mt-1">{errors.maxTickets}</span>}
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="price">
                    <span className="label-text">票价 (SUI)</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    className={`input input-bordered w-full ${errors.price ? 'input-error' : ''}`}
                  />
                  {errors.price && <span className="text-error text-sm mt-1">{errors.price}</span>}
                </div>
              </div>
              <div className="form-control mb-4">
                <label className="label" htmlFor="previewImageUrl">
                  <span className="label-text">活动预览图URL</span>
                </label>
                <input
                  type="url"
                  id="previewImageUrl"
                  name="previewImageUrl"
                  value={formData.previewImageUrl}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.previewImageUrl ? 'input-error' : ''}`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.previewImageUrl && <span className="text-error text-sm mt-1">{errors.previewImageUrl}</span>}
              </div>
              {/* 图片预览 */}
              <div className="flex justify-center mb-2">
                {formData.previewImageUrl ? (
                  <img src={formData.previewImageUrl} alt="活动预览" className="rounded-lg max-h-48 object-contain border" />
                ) : (
                  <div className="w-48 h-32 bg-base-200 flex items-center justify-center text-gray-400 rounded-lg border">图片预览</div>
                )}
              </div>
            </>
          )}
          {/* Step 4: 预览与发布 */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-2">活动预览</h2>
              <div className="bg-base-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center">
                <img src={formData.previewImageUrl || 'https://via.placeholder.com/200x120?text=Event+Image'} alt="活动预览" className="rounded-lg w-48 h-32 object-cover border" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{formData.title || '活动标题'}</h3>
                  <div className="text-xs text-gray-400 mb-1">{formData.startTime} ~ {formData.endTime}</div>
                  <div className="mb-2 text-gray-600">{formData.description || '活动描述...'}</div>
                  <div className="flex gap-4 text-sm">
                    <span>票价：{formData.price} SUI</span>
                    <span>总票数：{formData.maxTickets}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-2">发布活动为链上操作，需支付Gas费</div>
            </div>
          )}
          {/* 步骤按钮 */}
          <div className="flex justify-between mt-8">
            {step > 0 && <button type="button" className="btn btn-outline" onClick={handlePrev}>上一步</button>}
            {step < steps.length - 1 && <button type="button" className="btn btn-primary ml-auto" onClick={handleNext}>下一步</button>}
            {step === steps.length - 1 && <button type="submit" className="btn btn-primary ml-auto" disabled={isSubmitting}>{isSubmitting ? '发布中...' : '发布活动'}</button>}
          </div>
        </div>
      </form>
    </div>
  );
} 