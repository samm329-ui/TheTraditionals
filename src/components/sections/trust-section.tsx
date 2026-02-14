
import React from 'react';
import { Award, Scissors, Star } from 'lucide-react';

const TrustSection = () => {
    return (
        <section className="py-16 bg-white border-y border-border/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border/50">
                    <div className="px-4 py-4 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 text-primary">
                            <Award className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-heading font-bold mb-2">Premium Materials</h3>
                        <p className="text-muted-foreground text-sm">Finest silk and cotton fabrics sourced directly from artisans.</p>
                    </div>

                    <div className="px-4 py-4 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 text-primary">
                            <Scissors className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-heading font-bold mb-2">Traditional Craftsmanship</h3>
                        <p className="text-muted-foreground text-sm">Every stitch is hand-embroidered by skilled Bengali weavers.</p>
                    </div>

                    <div className="px-4 py-4 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 text-primary">
                            <Star className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-heading font-bold mb-2">Custom Orders</h3>
                        <p className="text-muted-foreground text-sm">Bespoke tailoring to ensure the perfect fit for your special occasion.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
