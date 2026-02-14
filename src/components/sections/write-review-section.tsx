"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type WriteReviewSectionProps = {
    onReviewSubmit: (review: { name: string; title: string; review: string }) => void;
};

const WriteReviewSection = ({ onReviewSubmit }: WriteReviewSectionProps) => {
    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [title, setTitle] = useState("Patron");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && review) {
            onReviewSubmit({ name, title, review });
            setName("");
            setReview("");
            setTitle("Patron");
        }
    };

    return (
        <section id="write-review" className="py-20 md:py-32 bg-background relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <Card className="border-primary/10 shadow-premium bg-card/50 backdrop-blur-sm">
                        <form onSubmit={handleSubmit}>
                            <CardHeader className="text-center pb-8 border-b border-border/50">
                                <CardTitle className="font-heading text-3xl md:text-4xl font-bold text-foreground">Share Your Experience</CardTitle>
                                <CardDescription className="font-body text-lg text-muted-foreground mt-2">
                                    Your feedback helps us weave better traditions.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="font-heading font-bold text-foreground">Your Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="font-body border-input bg-background focus:border-primary/50 focus:ring-primary/20 h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="font-heading font-bold text-foreground">Title (Optional)</Label>
                                        <Input
                                            id="title"
                                            placeholder="e.g., 'Saree Enthusiast'"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="font-body border-input bg-background focus:border-primary/50 focus:ring-primary/20 h-11"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="review" className="font-heading font-bold text-foreground">Your Review</Label>
                                    <Textarea
                                        id="review"
                                        placeholder="Share your thoughts on our collection..."
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        required
                                        className="font-body min-h-[150px] border-input bg-background focus:border-primary/50 focus:ring-primary/20 resize-none p-4"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4 pb-8 justify-center">
                                <Button type="submit" size="lg" className="font-heading font-bold w-full md:w-auto min-w-[200px] bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full">
                                    Submit Review
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default WriteReviewSection;
