// CoreValues Component - Company Values Section (API Integration)
import { motion } from "framer-motion";
import { Shield, Users, Zap, Heart, Award, Target, TrendingUp, CheckCircle, Leaf, Lightbulb } from "lucide-react";
import { useCoreValues } from "../../hooks/useApi";
import { coreValues as staticCoreValues } from "../../models/valuesData";
import { SectionHeading, GlassCard, CardLoader } from "../shared";

// Icon mapping
const iconMap = {
  Shield,
  Users,
  Zap,
  Heart,
  Award,
  Target,
  TrendingUp,
  CheckCircle,
  Leaf,
  Lightbulb
};

export default function CoreValues() {
  const { coreValues: apiCoreValues, loading, error } = useCoreValues();
  
  // Use API data if available, otherwise fallback to static data
  const coreValues = (apiCoreValues && apiCoreValues.length > 0) ? apiCoreValues : staticCoreValues;

  console.log('CoreValues - API data:', apiCoreValues, 'Using:', coreValues, 'Loading:', loading, 'Error:', error);

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
          <CardLoader className="mt-12" />
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {coreValues.map((value, index) => {
            // Handle both API data (string icon name) and static data (icon component)
            const Icon = typeof value.icon === 'string' ? (iconMap[value.icon] || Shield) : (value.icon || Shield);
            
            return (
              <motion.div 
                key={value._id || value.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.1
                }}
              >
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
        </div>
      </div>
    </section>
  );
}
