export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  price: number;
  maxTickets: number;
  remainingTickets: number;
  previewImageUrl: string;
  creatorAddress: string;
} 