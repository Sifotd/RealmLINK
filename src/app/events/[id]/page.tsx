import { getEventById } from "@/lib/mockData";
import { notFound } from "next/navigation";
import EventDetail from "./EventDetail";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function EventDetailPage({ params }: Props) {
  const { id } = use(params);
  const event = getEventById(id);
  
  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
} 