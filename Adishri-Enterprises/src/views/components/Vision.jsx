// Vision Component - Future Goals & Company Direction (Google Sheets)
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { SectionHeading, CardLoader } from "../shared";
import { useVision } from "../../hooks/useApi";
import { Target, Rocket, Globe, TrendingUp } from "lucide-react";

// Default icons for vision cards
const defaultIcons = [Target, Rocket, Globe, TrendingUp];

export default function Vision() {
  const { data: visionData, loading } = useVision();

  // Show loading state while fetching from Google Sheets
  if (loading || !visionData) {
    return (
      <section className="py-20 md:py-28 bg-background relative overflow-hidden min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Vision"
            title="Shaping the Future of"
            highlight="Packaging"
            description="Loading vision from Google Sheets..."
          />
          <CardLoader className="mt-12" />
        </div>
      </section>
    );
  }

  // Extract data from Google Sheets
  const title = visionData?.title || "Shaping the Future of Packaging";
  const subtitle = visionData?.subtitle || "Our Vision";
  const description = visionData?.description || "Driven by innovation and commitment to excellence, we're building tomorrow's packaging solutions today.";

  // Build cards array from Google Sheets (card1, card2, card3, card4)
  const cards = [];
  const icons = [Target, Rocket, Globe, TrendingUp];
  
  let i = 1;
  while (visionData?.[`card${i}Title`]) {
    cards.push({
      title: visionData[`card${i}Title`],
      description: visionData[`card${i}Description`],
      icon: icons[(i - 1) % icons.length]
    });
    i++;
  }

  // Fallback to default cards if no data
  if (cards.length === 0) {
    cards.push(
      {
        title: "Our Vision",
        description: "To become India's most trusted manufacturer of premium plastic packaging solutions.",
        icon: Target
      },
      {
        title: "Future Goals",
        description: "Expand our manufacturing capacity to serve pan-India markets.",
        icon: Rocket
      },
      {
        title: "Industry Leadership",
        description: "Lead the plastic packaging industry through continuous innovation.",
        icon: Globe
      },
      {
        title: "Growth Strategy",
        description: "Strategic investments in advanced blow molding technology.",
        icon: TrendingUp
      }
    );
  }

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden min-h-[60vh]">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-soft/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-primary-soft/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          subtitle={subtitle}
          title={title.split(' ').slice(0, -1).join(' ')}
          highlight={title.split(' ').slice(-1).join(' ')}
          description={description}
        />

        {/* Vision Cards Grid - 4 cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {cards.map((card, index) => {
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
