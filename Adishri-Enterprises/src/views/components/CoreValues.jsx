// CoreValues Component - Company Values Section
import { motion } from "framer-motion";
import { coreValues } from "../../models/valuesData";
import { staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { SectionHeading, GlassCard } from "../shared";

export default function CoreValues() {
  return (
    <section className="py-20 md:py-28 bg-gray-50/50 dark:bg-gray-800/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Our Philosophy"
          title="Our Core"
          highlight="Values"
          description="The principles that guide our commitment to excellence and customer satisfaction."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {coreValues.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div key={value.id} variants={staggerItem}>
                <GlassCard className="p-6 h-full text-center group" hover={true}>
                  {/* Icon */}
                  <div
                    className={`
                      w-16 h-16 mx-auto rounded-2xl
                      bg-gradient-to-r ${value.color}
                      flex items-center justify-center
                      shadow-lg group-hover:scale-110 transition-transform duration-300
                    `}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-xl font-bold text-gray-800 dark:text-white">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
