// CoreValues Component - Company Values Section (API Integration)
import { motion } from "framer-motion";
import { Shield, Users, Zap, Heart, Award, Target, TrendingUp, CheckCircle } from "lucide-react";
import { useCoreValues } from "../../hooks/useApi";
import { staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { SectionHeading, GlassCard, Skeleton } from "../shared";

// Icon mapping
const iconMap = {
  Shield,
  Users,
  Zap,
  Heart,
  Award,
  Target,
  TrendingUp,
  CheckCircle
};

export default function CoreValues() {
  const { coreValues, loading } = useCoreValues();

  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Philosophy"
            title="Our Core"
            highlight="Values"
            description="The principles that guide our commitment to excellence and customer satisfaction."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 bg-card border border-border rounded-2xl">
                <Skeleton className="w-16 h-16 mx-auto rounded-2xl" />
                <Skeleton className="h-6 w-32 mx-auto mt-6" />
                <Skeleton className="h-4 w-full mt-3" />
                <Skeleton className="h-4 w-full mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
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
            const Icon = iconMap[value.icon] || Shield;
            return (
              <motion.div key={value._id} variants={staggerItem}>
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
                  <h3 className="mt-6 text-xl font-bold text-foreground">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
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
