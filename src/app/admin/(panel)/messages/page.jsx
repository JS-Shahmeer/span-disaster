import { prisma } from "@/lib/db";
import { deleteMessage, setMessageRead } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <>
      <h1 className="text-3xl font-semibold mb-8">Messages</h1>
      {messages.length === 0 && <p className="text-muted-foreground">No messages yet.</p>}
      <ul className="space-y-4">
        {messages.map((m) => (
          <li key={m.id} className={`bg-card border rounded-xl p-5 ${m.read ? "border-border" : "border-secondary/50"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-primary">
                  {!m.read && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-secondary align-middle" aria-label="Unread" />}
                  {m.name} <a href={`mailto:${m.email}`} className="font-normal text-secondary hover:underline">{m.email}</a>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {m.inquiryType} · {m.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <form action={setMessageRead.bind(null, m.id, !m.read)}>
                  <button type="submit" className="text-sm font-medium text-secondary hover:underline">
                    Mark as {m.read ? "unread" : "read"}
                  </button>
                </form>
                <DeleteButton action={deleteMessage.bind(null, m.id)} confirmText="Delete this message?" />
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{m.message}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
