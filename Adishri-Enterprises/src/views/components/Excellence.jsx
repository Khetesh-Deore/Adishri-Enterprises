// Excellence Component - About Section with Industries & Capacity (100% Google Sheets)
import { motion } from "framer-motion";
import { CheckCircle, Leaf, Target, Package, Factory, Beaker, Home, Tractor } from "lucide-react";
import { useAboutSection } from "../../hooks/useApi";
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { SectionHeading, Skeleton } from "../shared";

export default function Excellence() {
  // Fetch about section data from Google Sheets
  const { data, loading } = useAboutSection();

  // Extract data from Google Sheets
  const title = data?.title || "Excellence in Plastic Packaging Manufacturing";
  const subtitle = data?.subtitle || "About Us";
  const description = data?.description || "Based in Chhatrapati Sambhaji Nagar, Adishri Enterprises is a leading manufacturer of HDPE & LDPE bottles and jerry cans.";
  const mainText = data?.mainText || "With over 15 years of experience, we have established ourselves as a trusted manufacturer serving pharmaceutical, chemical, agricultural, and industrial sectors across India.";
  const secondaryText = data?.secondaryText || "Our state-of-the-art facility uses advanced blow molding technology to produce high-quality bottles ranging from 200ml to 5L capacity, meeting the diverse needs of our clients.";
  const experienceYears = data?.experienceYears || "15";
  
  // Images from Google Sheets
  const image1 = data?.image1 || "/product1.jpeg";
  const image2 = data?.image2 || "/product2.jpeg";
  const image3 = data?.image3 || "/product3.jpeg";
  
  // Mission & Eco
  const missionTitle = data?.missionTitle || "Our Mission";
  const missionDescription = data?.missionDescription || "To provide superior quality plastic packaging solutions ensuring safety, durability, and customer satisfaction.";
  const ecoTitle = data?.ecoTitle || "Eco-Friendly";
  const ecoDescription = data?.ecoDescription || "100% recyclable HDPE & LDPE materials promoting sustainable packaging solutions.";
  
  // Capacity Stats - from Google Sheets or defaults
  const capacityStats = [
    { label: data?.stat1Label || "Daily Production", value: data?.stat1Value || "10,000+", suffix: data?.stat1Suffix || "Units" },
    { label: data?.stat2Label || "Product Range", value: data?.stat2Value || "200ml - 5L", suffix: data?.stat2Suffix || "Capacity" },
    { label: data?.stat3Label || "Monthly Output", value: data?.stat3Value || "3 Lakh+", suffix: data?.stat3Suffix || "Bottles" },
    { label: data?.stat4Label || "SKU Variants", value: data?.stat4Value || "50+", suffix: data?.stat4Suffix || "Products" }
  ];

  // Packaging Features - from Google Sheets or defaults
  const packagingFeatures = data?.features 
    ? data.features.split('|').map(f => f.trim())
    : [
        "HDPE Bottles (200ml to 5L)",
        "LDPE Bottles & Containers",
        "Jerry Cans (1L to 5L)",
        "Custom Moulded Bottles",
        "Leak-Proof Caps & Closures",
        "Food Grade Packaging"
      ];

  // Industries - from Google Sheets or defaults
  const industries = [
    {
      icon: Home,
      name: data?.industry1Name || "Home Appliances",
      description: data?.industry1Description || "Packaging solutions for household products and appliances",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Tractor,
      name: data?.industry2Name || "Agriculture",
      description: data?.industry2Description || "Durable containers for pesticides, fertilizers & agri-chemicals",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Beaker,
      name: data?.industry3Name || "Chemical Industry",
      description: data?.industry3Description || "Chemical-resistant bottles for industrial chemicals & solvents",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Package,
      name: data?.industry4Name || "Pharmaceuticals",
      description: data?.industry4Description || "FDA approved packaging for medicines & healthcare products",
      color: "from-red-500 to-red-600"
    }
  ];

  // Manufacturing Excellence - from Google Sheets or defaults
  const manufacturingTitle = data?.manufacturingTitle || "Manufacturing Excellence";
  const manufacturingDescription = data?.manufacturingDescription || "Our advanced facility operates with cutting-edge blow molding technology, ensuring high-volume production without compromising on quality.";
  const productionHours = data?.productionHours || "24/7";
  const monthlyUnits = data?.monthlyUnits || "3L+";

  // Show skeleton while loading from Google Sheets
  if (loading || !data) {
    return (
      <section className="py-20 md:py-28 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-12 w-96 mx-auto mb-8" />
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          subtitle={subtitle}
          title={title.split(' ').slice(0, 3).join(' ')}
          highlight={title.split(' ').slice(3).join(' ')}
          description={description}
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-12">

          {/* Left - Image & Packaging Info */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="row-span-2">
                <img
                  src={image1}
                  alt="HDPE Bottles"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
              <img
                src={image2}
                alt="Jerry Cans"
                className="w-full h-32 object-cover rounded-2xl shadow-lg"
              />
              <img
                src={image3}
                alt="Product Range"
                className="w-full h-32 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Packaging Products */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Our Packaging Products
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {packagingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            {/* About Text */}
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {mainText.includes('{experienceYears}') 
                  ? mainText.replace('{experienceYears}', experienceYears)
                  : mainText}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {secondaryText}
              </p>
            </div>

            {/* Working & Product Capacity */}
            <div className="grid grid-cols-2 gap-4">
              {capacityStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border text-center"
                >
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground/70">{stat.suffix}</div>
                </motion.div>
              ))}
            </div>

            {/* Mission & Values */}
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{missionTitle}</h4>
                  <p className="text-sm text-muted-foreground">
                    {missionDescription}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{ecoTitle}</h4>
                  <p className="text-sm text-muted-foreground">
                    {ecoDescription}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Targeted Industries Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary-soft rounded-full">
              Industries We Serve
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Targeted <span className="text-primary">Industries</span>
            </h3>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              We provide specialized packaging solutions for diverse industries with customized products to meet specific requirements.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${industry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    {industry.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {industry.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Working Capacity Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                {manufacturingTitle}
              </h3>
              <p className="text-white/80">
                {manufacturingDescription}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl text-center">
                <Factory className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{productionHours}</div>
                <div className="text-sm text-white/70">Production</div>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl text-center">
                <Package className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{monthlyUnits}</div>
                <div className="text-sm text-white/70">Monthly Units</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
