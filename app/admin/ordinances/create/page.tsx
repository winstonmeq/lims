"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Upload } from "lucide-react";

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

import { committees, councilors } from "@/lib/data";
import { createOrdinance } from "@/app/actions/ordinanceActions";

export default function NewOrdinancePage() {
  const [title, setTitle] = useState("");
  const [ordinanceNumber, setOrdinanceNumber] = useState("");
  const [summary, setSummary] = useState("");
  const [fullText, setFullText] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [committeeId, setCommitteeId] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Fix: avoid variable shadowing
    const ordNum = formData.get("ordinanceNumber") as string;

    const idValue =
      ordNum && ordNum.trim() !== ""
        ? `ord-${ordNum}`
        : `ord-${Date.now()}`;

    formData.set("id", idValue);
    formData.set("status", "Introduced");

    try {
      const result = await createOrdinance(formData);
      console.log("SAVE RESULT:", result);

      if (result.success) {
        alert("Ordinance saved successfully!");
        form.reset();
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid flex-1 items-start gap-4 md:gap-8"
    >
      <div className="grid max-w-5xl flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/admin/ordinances">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">Draft a New Ordinance</h1>
          <Badge variant="outline" className="ml-auto">New</Badge>

          <div className="hidden md:flex items-center gap-2">
            <Button type="button" variant="outline" size="sm">Discard</Button>
            <Button type="submit" size="sm">Save</Button>
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
                      value={fullText}
                      onChange={(e) => setFullText(e.target.value)}
                    />
                  </div>

                  {/* AuthorID */}
                  <input type="hidden" name="authorId" value={authorId} />

                  {/* CommitteeID */}
                  <input type="hidden" name="committeeId" value={committeeId} />

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
                  <Label>Author</Label>
                  <Select onValueChange={setAuthorId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {councilors.map((c) => (
                        <SelectItem value={c.id} key={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Committee */}
                <div className="grid gap-3">
                  <Label>Assigned Committee</Label>
                  <Select onValueChange={setCommitteeId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select committee" />
                    </SelectTrigger>
                    <SelectContent>
                      {committees.map((c) => (
                        <SelectItem value={c.id} key={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
                <CardDescription>Optional PDF file</CardDescription>
              </CardHeader>

              <CardContent>
                <Label htmlFor="document-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-md">
                    <Upload className="h-8 w-8" />
                    <span>Click to upload or drop PDF</span>
                  </div>
                </Label>
                <Input id="document-upload" type="file" className="sr-only" />
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
