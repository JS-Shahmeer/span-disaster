"use client";

import { useActionState } from "react";
import { saveResource } from "@/app/admin/actions";
import { resourceTypes } from "@/data/resources";
import { Checkbox, Field, FormError, Select, SubmitButton, TextArea, formDefaults } from "@/components/admin/fields";

const resourceCategories = ["Personal Preparedness", "Neighborhood Preparedness", "Video Resources", "About SPAN"];

export default function ResourceForm({ resource }) {
  const [state, action] = useActionState(saveResource.bind(null, resource?.id ?? null), null);
  const r = resource ?? {};
  const { text, checked } = formDefaults(state, r);

  return (
    <form key={state?.ts ?? 0} action={action} className="space-y-5 max-w-2xl">
      <FormError state={state} />
      <Field label="Title" name="title" defaultValue={text("title")} required />
      <TextArea label="Description" name="description" rows={3} defaultValue={text("description")} required />
      <div className="grid sm:grid-cols-2 gap-4">
        <Select
          label="Type"
          name="type"
          defaultValue={text("type", r.type ?? "handout")}
          options={Object.entries(resourceTypes).map(([value, t]) => ({ value, label: t.label }))}
        />
        <Select
          label="Category"
          name="category"
          defaultValue={text("category", r.category ?? resourceCategories[0])}
          options={resourceCategories.map((c) => ({ value: c, label: c }))}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="File URL" name="fileUrl" defaultValue={text("fileUrl")} hint="Link to the downloadable file." />
        <Field label="Upload file" name="file" type="file" hint="Replaces the file URL. Max 4 MB." />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Video URL" name="videoUrl" defaultValue={text("videoUrl")} hint="Embed URL, for video resources." />
        <Field label="Thumbnail URL" name="thumbnail" defaultValue={text("thumbnail")} />
      </div>
      <TextArea label="Transcript" name="transcript" rows={4} defaultValue={text("transcript")} />
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Related activity #" name="relatedActivity" type="number" min="1" defaultValue={text("relatedActivity")} />
        <Field label="Related meeting" name="relatedMeeting" defaultValue={text("relatedMeeting")} hint="e.g. first-meeting" />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={text("sortOrder", r.sortOrder ?? 0)} />
      </div>
      <div className="flex flex-wrap gap-6">
        <Checkbox label="Free" name="free" defaultChecked={checked("free", r.free ?? true)} />
        <Checkbox label="Placeholder (not final material)" name="placeholder" defaultChecked={checked("placeholder", r.placeholder ?? false)} />
        <Checkbox label="Published" name="published" defaultChecked={checked("published", r.published ?? true)} />
      </div>
      <SubmitButton>{resource ? "Save changes" : "Create resource"}</SubmitButton>
    </form>
  );
}
