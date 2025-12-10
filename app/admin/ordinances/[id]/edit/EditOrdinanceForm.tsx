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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

import { committees, councilors, ordinanceVersion } from "@/lib/data";
import { deleteOrdinance, updateOrdinance } from "@/app/actions/ordinanceActions";
import { useRouter } from "next/navigation";

interface Ordinance {
  id: string;
  ordinanceNumber: string;
  title: string;
  summary: string;
  fullText: string;
  status: string;
  committeeId: string[];
  authorIds: string[];
  createdAt: string;
  updatedAt: string;
}

export default function EditOrdinanceForm({ ordinance }: { ordinance: Ordinance }) {
  const [title, setTitle] = useState(ordinance.title);
  const [ordinanceNumber, setOrdinanceNumber] = useState(ordinance.ordinanceNumber);
  const [summary, setSummary] = useState(ordinance.summary);
  const [fullText, setFullText] = useState(ordinance.fullText);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(ordinance.authorIds || []);
  const [status, setStatus] = useState(ordinance.status);
  const [isAuthorDialogOpen, setIsAuthorDialogOpen] = useState(false);
  const [isCommitteeDialogOpen, setIsCommitteeDialogOpen] = useState(false);
  const [selectedCommittee, setSelectedCommittee] = useState<string[]>(Array.isArray(ordinance.committeeId) ? ordinance.committeeId : []);


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


  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteOrdinance(ordinance.id);
  
      if (res.success) {
        router.push("/admin/ordinances");
      } else {
        alert("Failed to delete: " + res.message);
      }
    });
  };
  



  const toggleAuthor = (id: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(id)
        ? prev.filter((authorId) => authorId !== id)
        : [...prev, id]
    );
  };

  const toggleCommittee = (id: string) => {
    setSelectedCommittee((prev) =>
      prev.includes(id)
        ? prev.filter((committeeId) => committeeId !== id)
        : [...prev, id]
    );
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

              {/* AuthorIDs - Hidden Inputs */}
              {selectedAuthors.map((id) => (
                <input key={id} type="hidden" name="authorIds" value={id} />
              ))}

                 {selectedCommittee.map((id) => (
                <input key={id} type="hidden" name="committeeId" value={id} />
              ))}
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
                <Label>Authors</Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    placeholder="No authors selected"
                    value={councilors
                      .filter((c) => selectedAuthors.includes(c.id))
                      .map((c) => c.name)
                      .join(", ")}
                  />
                  <Dialog open={isAuthorDialogOpen} onOpenChange={setIsAuthorDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Select</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Select Authors</DialogTitle>
                        <DialogDescription>
                          Select the councilors who authored this ordinance.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4 max-h-[300px] overflow-y-auto">
                        {councilors.map((councilor) => (
                          <div key={councilor.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`author-${councilor.id}`}
                              checked={selectedAuthors.includes(councilor.id)}
                              onCheckedChange={() => toggleAuthor(councilor.id)}
                            />
                            <Label
                              htmlFor={`author-${councilor.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {councilor.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button">Done</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

               
              <div className="grid gap-3">
                <Label>Committees</Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    placeholder="No committee selected"
                    value={committees
                      .filter((c) => selectedCommittee.includes(c.id))
                      .map((c) => c.name)
                      .join(", ")}
                  />
                  <Dialog open={isCommitteeDialogOpen} onOpenChange={setIsCommitteeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Select</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Select Committees</DialogTitle>
                        <DialogDescription>
                          Select the committees who authored this ordinance.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4 max-h-[300px] overflow-y-auto">
                        {committees.map((committee) => (
                          <div key={committee.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`committee-${committee.id}`}
                              checked={selectedCommittee.includes(committee.id)}
                              onCheckedChange={() => toggleCommittee(committee.id)}
                            />
                            <Label
                              htmlFor={`committee-${committee.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {committee.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button">Done</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
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

              <div className="grid gap-3 mt-54">
              
              <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        Delete Ordinance
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Ordinance?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete the ordinance.
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        <Button 
                          variant="destructive"
                          onClick={handleDelete}
                          disabled={isPending}
                        >
                          {isPending ? "Deleting..." : "Yes, Delete"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                </Dialog>
              </div>
                  
             


            </CardContent>
          </Card>
        </div>

      </div>
      {message && <p className="text-sm mt-2 text-green-600">{message}</p>}
    </form>
  );
}
