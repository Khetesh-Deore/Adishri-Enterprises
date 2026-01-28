// CoreValues Component - Company Values Section (Google Sheets)
import { motion } from "framer-motion";
import { Shield, Users, Zap, Heart, Award, Target, TrendingUp, CheckCircle, Leaf, Lightbulb } from "lucide-react";
import { useCoreValues } from "../../hooks/useApi";
import { SectionHeading, GlassCard, CardLoader } from "../shared";

// Icon mapping - map emoji/text to Lucide icons
const iconMap = {
  '✓': CheckCircle,
  '💡': Lightbulb,
  '🌱': Leaf,
  'Shield': Shield,
  'Users': Users,
  'Zap': Zap,
  'Heart': Heart,
  'Award': Award,
  'Target': Target,
  'TrendingUp': TrendingUp,
  'CheckCircle': CheckCircle,
  'Leaf': Leaf,
  'Lightbulb': Lightbulb
};

// Default color gradients for values
const defaultColors = [
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
  'from-green-500 to-green-600',
  'from-orange-500 to-orange-600',
  'from-pink-500 to-pink-600',
  'from-indigo-500 to-indigo-600'
];

export default function CoreValues() {
  const { coreValues: apiCoreValues, loading, error } = useCoreValues();

  // Show loading state while fetching from Google Sheets
  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Philosophy"
            title="Our Core"
            highlight="Values"
            description="Loading core values from Google Sheets..."
          />
          <CardLoader className="mt-12" />
        </div>
      </section>
    );
  }

  // Use API data with proper icon mapping
  const coreValues = apiCoreValues.map((value, index) => ({
    ...value,
    icon: iconMap[value.icon] || Shield,
    color: value.color || defaultColors[index % defaultColors.length]
  }));

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Our Philosophy"
          title="Our Core"
          highlight="Values"
          description="The principles that guide our commitment to excellence and customer satisfaction."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            
            return (
              <motion.div 
                key={value.id || index}
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
