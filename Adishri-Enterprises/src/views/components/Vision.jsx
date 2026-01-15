// Vision Component - Future Goals & Company Direction
import { motion } from "framer-motion";
import { visionCards } from "../../models/visionData";
import { staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { SectionHeading } from "../shared";

export default function Vision() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden min-h-[60vh]">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-soft/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-primary-soft/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          subtitle="Our Vision"
          title="Shaping the Future of"
          highlight="Packaging"
          description="Driven by innovation and commitment to excellence, we're building tomorrow's packaging solutions today."
        />

        {/* Vision Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {visionCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-gradient-from to-gradient-to flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
