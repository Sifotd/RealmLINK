import { getEventById } from "@/lib/mockData";
import { notFound } from "next/navigation";
import EventDetail from "./EventDetail";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function EventDetailPage({ params }: Props) {
  const event = getEventById(params.id);
  
  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
} 