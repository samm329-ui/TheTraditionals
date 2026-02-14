"use client";

import { useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { recommendProduct, RecommendProductOutput } from "@/ai/flows/recommend-product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Terminal, ArrowLeft, Shirt, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding the Perfect Style...
                </>
            ) : (
                <>
                    <Shirt className="mr-2 h-4 w-4" />
                    Get My Recommendation
                </>
            )}
        </Button>
    );
}

function LoadingSkeleton() {
    return (
        <Card className="w-full">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    </div>
                    <Skeleton className="h-24 w-full" />
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    );
}

const initialState: { output: RecommendProductOutput | null; error: string | null } = {
    output: null,
    error: null,
};

async function submitSelections(
    prevState: typeof initialState,
    formData: FormData
): Promise<typeof initialState> {
    const selectedOccasion = formData.get("occasion") as string;
    const selectedMood = formData.get("mood") as string;
    const selectedPreference = formData.get("preference") as string;
    try {
        const output = await recommendProduct({
            occasion: selectedOccasion,
            mood: selectedMood,
            preference: selectedPreference,
        });
        return { output, error: null };
    } catch (e: any) {
        return { output: null, error: e.message || "An unknown error occurred." };
    }
}

const questions = [
    {
        name: 'occasion',
        title: "What's the Occasion?",
        options: ["Casual Day Out", "Office/Professional", "Wedding/Festival"]
    },
    {
        name: 'mood',
        title: "What's Your Vibe?",
        options: ["Simple & Comfortable", "Classic Traditional", "Grand & Luxurious"]
    },
    {
        name: 'preference',
        title: "Fabric Preference?",
        options: ["Cotton & Breathable", "Silk & Zari Work", "Designer/Heavy Work"]
    }
];

const RecommendationForm = () => {
    const [state, formAction] = useFormState(submitSelections, initialState);
    const [step, setStep] = useState(0);
    const [selections, setSelections] = useState<Record<string, string>>({});

    const currentQuestion = questions[step];

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const handleSelection = (name: string, value: string) => {
        setSelections(prev => ({ ...prev, [name]: value }));
    }

    const isNextDisabled = !selections[currentQuestion.name];


    if (state.output || state.error) {
        return (
            <Card className="w-full">
                <CardContent className="pt-6">
                    {state.error && (
                        <Alert variant="destructive">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{state.error}</AlertDescription>
                        </Alert>
                    )}
                    {state.output && (
                        <Alert>
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Your Style Recommendation</AlertTitle>
                            <AlertDescription className="space-y-2">
                                <p className="font-bold text-lg text-primary mt-2">{state.output.productName}</p>
                                <p>{state.output.reason}</p>
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={() => window.location.reload()} className="w-full">Start Over</Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <form action={formAction}>
                <CardHeader>
                    <CardTitle>{currentQuestion.title}</CardTitle>
                    <CardDescription>
                        Step {step + 1} of {questions.length}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        name={currentQuestion.name}
                        onValueChange={(value) => handleSelection(currentQuestion.name, value)}
                        className="space-y-3"
                        value={selections[currentQuestion.name]}
                    >
                        {currentQuestion.options.map(option => (
                            <div key={option}>
                                <RadioGroupItem value={option} id={option} className="sr-only" />
                                <Label htmlFor={option}
                                    className={cn(
                                        "flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors text-center",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        selections[currentQuestion.name] === option && "bg-primary text-primary-foreground border-primary"
                                    )}>
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                    {/* Hidden inputs to carry over selections */}
                    {Object.entries(selections).map(([key, value]) => (
                        <input key={key} type="hidden" name={key} value={value} />
                    ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step > 0 && (
                        <Button variant="outline" type="button" onClick={handleBack}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    )}
                    {step < questions.length - 1 ? (
                        <Button type="button" onClick={handleNext} disabled={isNextDisabled} className="ml-auto">
                            Next
                        </Button>
                    ) : (
                        <SubmitButton />
                    )}
                </CardFooter>
            </form>
        </Card>
    );
};

export default RecommendationForm;
