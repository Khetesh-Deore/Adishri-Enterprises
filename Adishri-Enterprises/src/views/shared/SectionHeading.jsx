// SectionHeading Component - Consistent Section Headers
import { motion } from "framer-motion";
import { fadeInUp } from "../../controllers/useAnimations";

export default function SectionHeading({
  subtitle,
  title,
  highlight,
  description,
  centered = true,
  className = ""
}) {
  const alignment = centered ? "text-center" : "text-left";

  return (
    <motion.div
      className={`mb-12 ${alignment} ${className}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {subtitle && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary-soft rounded-full">
          {subtitle}
        </span>
      )}
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
        {title}{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>
      
      {description && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
