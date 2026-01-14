// Excellence Component - About Section
import { motion } from "framer-motion";
import { CheckCircle, Leaf } from "lucide-react";
import { fadeInLeft, fadeInRight } from "../../controllers/useAnimations";

export default function Excellence() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left - Image Grid */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4"
          >
            {/* Top Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <div className="row-span-2">
                <img
                  src="/product1.jpeg"
                  alt="HDPE Bottles"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Small Bottles Display */}
              <div className="bg-card rounded-2xl p-4 flex items-end justify-center gap-2">
                <div className="text-center">
                  <div className="h-16 w-6 bg-gray-200 rounded-t-full mx-auto" />
                  <span className="text-xs text-muted-foreground mt-1 block">200 ML</span>
                </div>
                <div className="text-center">
                  <div className="h-20 w-8 bg-gray-200 rounded-t-full mx-auto" />
                  <span className="text-xs text-muted-foreground mt-1 block">500 ML</span>
                </div>
                <div className="text-center">
                  <div className="h-24 w-10 bg-blue-100 rounded-t-full mx-auto" />
                  <span className="text-xs text-muted-foreground mt-1 block">1 Ltr</span>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/product2.jpeg"
                alt="Jerry Cans"
                className="w-full h-48 object-cover rounded-2xl"
              />
              <div className="bg-card rounded-2xl p-4 flex items-end justify-center gap-3">
                <div className="text-center">
                  <div className="h-14 w-10 bg-gray-100 rounded mx-auto" />
                  <span className="text-xs text-muted-foreground mt-1 block">500 ML</span>
                </div>
                <div className="text-center">
                  <div className="h-16 w-12 bg-gray-100 rounded mx-auto" />
                  <span className="text-xs text-muted-foreground mt-1 block">1 Ltr</span>
                </div>
                <div className="text-center">
                  <div className="h-20 w-14 bg-gray-100 rounded mx-auto" />
                  <span className="text-xs text-muted-foreground mt-1 block">2 Ltr</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              About Adishri Enterprises
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 leading-tight">
              Excellence in Plastic Packaging Manufacturing
            </h2>

            <p className="text-muted-foreground mt-6 leading-relaxed">
              Based in Chhatrapati Sambhaji Nagar, Adishri Enterprises manufactures HDPE & LDPE
              bottles and jerry cans for pharmaceutical, chemical, and industrial sectors.
            </p>

            {/* Commitment Box */}
            <div className="mt-8 p-6 bg-card rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-3">Our Commitment</h3>
              <p className="text-muted-foreground italic font-serif">
                "To provide superior quality plastic packaging solutions that ensure
                safety, durability, and customer satisfaction through innovation and
                precision."
              </p>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Quality Assured</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Rigorous quality control for every HDPE & LDPE product manufactured.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Eco-Friendly</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Promoting 100% recyclable plastic solutions for a greener planet.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
