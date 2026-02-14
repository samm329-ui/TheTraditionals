

import RecommendationForm from '@/components/recommendation-form';

const RecommendationSection = () => {
    return (
        <section id="recommendation" className="py-12 md:py-32 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground tracking-wide">Not Sure What to Choose?</h2>
                    <p className="mt-4 text-lg text-muted-foreground font-body">
                        Tell us about the occasion you're attending, and our AI assistant will recommend the perfect traditional masterpiece for you.
                    </p>
                </div>

                <div className="max-w-xl mx-auto mt-8">
                    <RecommendationForm />
                </div>
            </div>
        </section>
    );
}

export default RecommendationSection;
