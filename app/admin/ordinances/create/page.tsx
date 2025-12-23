"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Upload, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

import { committees, councilors } from "@/lib/data";
import { createOrdinance } from "@/app/actions/ordinanceActions";

export default function NewOrdinancePage() {
  const [title, setTitle] = useState("");
  const [ordinanceNumber, setOrdinanceNumber] = useState("");
  const [resolutionNumber, setResolutionNumber] = useState("");
  const [summary, setSummary] = useState("");
  const [fullText, setFullText] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  // const [committeeId, setCommitteeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorDialogOpen, setIsAuthorDialogOpen] = useState(false);
  const [isCommitteeDialogOpen, setIsCommitteeDialogOpen] = useState(false);
  const [selectedCommittee, setSelectedCommittee] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);



  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);


    const form = e.currentTarget;
    const formData = new FormData(form);
    

    // Fix: avoid variable shadowing
    const ordNum = formData.get("ordinanceNumber") as string;

    const sanitized = ordNum
      ? ordNum.trim().replace(/\s+/g, "-") // Remove/replace spaces
      : "";

    const idValue =
      sanitized !== ""
        ? `ord-${sanitized}`
        : `ord-${Date.now()}`;

    formData.set("id", idValue);
    formData.set("status", "Introduced");



    try {
      const result = await createOrdinance(formData);

      // if (result.success) {
      //   form.reset();
      //   setSelectedAuthors([]);
      //   alert("Ordinance saved successfully!");

      // } else {
      //   alert("Error: " + result.message);
      // }

      
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }

    setIsLoading(false);


  }

  function handleDiscard() {
    setTitle("");
    setOrdinanceNumber("");
    setResolutionNumber("");
    setSummary("");
    setFullText("");
    setFullText("");
    setSelectedAuthors([]);
    setSelectedCommittee([]);

    // Also reset the <form> element
    const form = document.querySelector("form") as HTMLFormElement;
    if (form) form.reset();
  }


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


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (!file) return;
  
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      e.target.value = "";
      return;
    }
  
    setSelectedFile(file);
  };

  



  return (
    <form
      onSubmit={handleSubmit}
      className="grid flex-1 items-start gap-4 md:gap-8"
    >
      <div className="grid max-w-5xl flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4 w-full">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/admin/ordinances">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>

          {/* Title + Badge grouped on the left */}
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Draft a New Ordinance</h1>
            <Badge variant="outline" className="items-center">New</Badge>
          </div>

          {/* Spacer: push these to the far right */}
          <div className="ml-auto hidden md:flex items-center gap-2">
            <Button onClick={handleDiscard} type="button" variant="outline" size="sm">Discard</Button>
            <Button type="submit" size="sm">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></span>
                  Saving...
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Ordinance Details</CardTitle>
                <CardDescription>
                  Fill in the main details of the ordinance.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-6">

                  {/* Title */}
                  <div className="grid gap-3">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Urban Agriculture Incentive Zone Act"
                    />
                  </div>

                  {/* Ordinance Number */}
                  <div className="grid gap-3">
                    <Label htmlFor="ordinanceNumber">Ordinance Number</Label>
                    <Input
                      id="ordinanceNumber"
                      name="ordinanceNumber"
                      value={ordinanceNumber}
                      onChange={(e) => setOrdinanceNumber(e.target.value)}
                      placeholder="System will generate if left blank"
                    />
                  </div>

                  
                  {/* Resolution Number */}
                  <div className="grid gap-3">
                    <Label htmlFor="resolutionNumber">Resolution Number</Label>
                    <Input
                      id="resolutionNumber"
                      name="resolutionNumber"
                      value={resolutionNumber}
                      onChange={(e) => setResolutionNumber(e.target.value)}
                      placeholder="need in creating resolution"
                    />
                  </div>


                  {/* Summary */}
                  <div className="grid gap-3">
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                      id="summary"
                      name="summary"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                    />
                  </div>

                  {/* Full Text */}
                  <div className="grid gap-3">
                    <Label htmlFor="fullText">Full Text</Label>
                    <Textarea
                      id="fullText"
                      name="fullText"
                      rows={10}
                      value={fullText}
                      onChange={(e) => setFullText(e.target.value)}
                    />
                  </div>

                  {/* AuthorIDs - Hidden Inputs */}
                  {selectedAuthors.map((id) => (
                    <input key={id} type="hidden" name="authorIds" value={id} />
                  ))}

                      {/* AuthorIDs - Hidden Inputs */}
                  {selectedCommittee.map((id) => (
                    <input key={id} type="hidden" name="committeeId" value={id} />
                  ))}


                </div>
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

                {/* Author */}
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

                {/* Committee */}
                <div className="grid gap-3">
                  <Label>Committee</Label>
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
                                htmlFor={`author-${committee.id}`}
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

              </CardContent>
            </Card>

            <Card>
  <CardHeader>
    <CardTitle>Document Upload</CardTitle>
    <CardDescription>Optional PDF file</CardDescription>
  </CardHeader>

  <CardContent className="space-y-4">

    {/* UPLOAD AREA */}
    <Label htmlFor="document-upload" className="cursor-pointer">
      <div
        className={`flex flex-col items-center justify-center border-2 rounded-md p-6 transition
          ${
            selectedFile
              ? "border-green-500 bg-green-50"
              : "border-dashed hover:bg-muted"
          }`}
      >
        {selectedFile ? (
          <>
            <div className="flex items-center gap-2 text-green-600">
              <Upload className="h-6 w-6" />
              <span className="font-medium">PDF Ready</span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {selectedFile.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <span className="mt-2 text-xs text-green-600">
              Click to replace
            </span>
          </>
        ) : (
          <>
            <Upload className="h-8 w-8" />
            <span className="mt-2 font-medium">
              Click to upload or drop PDF
            </span>
            <span className="text-xs text-muted-foreground">
              PDF only • Max 10MB
            </span>
          </>
        )}
      </div>
    </Label>

    {/* HIDDEN INPUT */}
    <Input
      id="document-upload"
      name="document"
      type="file"
      accept="application/pdf"
      className="sr-only"
      onChange={handleFileChange}
    />

    {/* REMOVE BUTTON */}
    {selectedFile && (
      <Button
        type="button"
        variant="ghost"
        className="text-destructive"
        onClick={() => setSelectedFile(null)}
      >
        Remove file
      </Button>
    )}
  </CardContent>
</Card>


          </div>
        </div>

        <div className="md:hidden flex justify-center gap-2">
          <Button type="button" variant="outline" size="sm">Discard</Button>
          <Button type="submit" size="sm">Save</Button>
        </div>
      </div>
    </form>
  );
}
