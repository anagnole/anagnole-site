import { notFound } from "next/navigation";
import { readDraft } from "@/lib/drafts";
import { DraftEditor } from "@/components/DraftEditor";

export default async function EditDraftPage(props: PageProps<"/admin/[slug]">) {
  const { slug } = await props.params;
  const draft = readDraft(slug);
  if (!draft) notFound();
  return <DraftEditor draft={draft} />;
}
