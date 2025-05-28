export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  price: number;
  maxTickets: number;
  remainingTickets: number;
  previewImageUrl: string;
  creatorAddress: string;
} 