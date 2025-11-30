"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { committees, councilors, ordinanceVersion } from "@/lib/data";
import { updateOrdinance } from "@/app/actions/ordinanceActions";
import { useRouter } from "next/navigation";

interface Ordinance {
  id: string;
  ordinanceNumber: string;
  title: string;
  summary: string;
  fullText: string;
  status: string;
  committeeId: string;
  authorId: string;
  createdAt: string; 
  updatedAt: string;
}

export default function EditOrdinanceForm({ ordinance }: { ordinance: Ordinance }) {
  const [title, setTitle] = useState(ordinance.title);
  const [ordinanceNumber, setOrdinanceNumber] = useState(ordinance.ordinanceNumber);
  const [summary, setSummary] = useState(ordinance.summary);
  const [fullText, setFullText] = useState(ordinance.fullText);
  const [authorId, setAuthorId] = useState(ordinance.authorId);
  const [committeeId, setCommitteeId] = useState(ordinance.committeeId);
  const [status, setStatus] = useState(ordinance.status);


  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateOrdinance(ordinance.id, formData);

      if (result.success) {
        setMessage("Ordinance updated successfully!");
        router.push("/admin/ordinances"); // refresh current page
      } else {
        setMessage(result.message || "Failed to update.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid flex-1 gap-4 md:gap-8">

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/admin/ordinances">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>

        <h1 className="text-xl font-semibold">Edit Ordinance</h1>
        <Badge variant="outline" className="ml-auto">Editing</Badge>
        <Button type="submit" size="sm">{isPending ? "Updating..." : "Update Ordinance"}</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Ordinance Details</CardTitle>
              <CardDescription>Edit ordinance information.</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">

              <div className="grid gap-3">
                <Label>Title</Label>
                <Input name="title" value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              <div className="grid gap-3">
                <Label>Ordinance Number</Label>
                <Input name="ordinanceNumber" value={ordinanceNumber} onChange={e => setOrdinanceNumber(e.target.value)} />
              </div>

              <div className="grid gap-3">
                <Label>Summary</Label>
                <Textarea name="summary" value={summary} onChange={e => setSummary(e.target.value)} />
              </div>

              <div className="grid gap-3">
                <Label>Full Text</Label>
                <Textarea name="fullText" value={fullText} onChange={e => setFullText(e.target.value)} />
              </div>

              <input type="hidden" name="authorId" value={authorId} />
              <input type="hidden" name="committeeId" value={committeeId} />
              <input type="hidden" name="status" value={status} />

            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-6">

              <div className="grid gap-3">
                <Label>Author</Label>
                <Select defaultValue={authorId} onValueChange={setAuthorId}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {councilors.map(c => (
                      <SelectItem value={c.id} key={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label>Committee</Label>
                <Select defaultValue={committeeId} onValueChange={setCommitteeId}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {committees.map(c => (
                      <SelectItem value={c.id} key={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

                <div className="grid gap-3">
                <Label>Status</Label>
                <Select defaultValue={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>                    
                       {ordinanceVersion.map(c => (
                      <SelectItem value={c.status} key={c.id}>{c.status}</SelectItem>
                    ))}
                    
                  </SelectContent>
                </Select>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
      {message && <p className="text-sm mt-2 text-green-600">{message}</p>}
    </form>
  );
}
