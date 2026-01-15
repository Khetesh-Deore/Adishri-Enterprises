// ContactForm Component - Contact Section with Form
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useForm } from "../../controllers/useForm";
import { contactInfo } from "../../models/navigationData";
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { SectionHeading, Button } from "../shared";

const contactDetails = [
  { icon: Phone, label: "Phone", value: contactInfo.phone },
  { icon: Mail, label: "Email", value: contactInfo.email },
  { icon: MapPin, label: "Address", value: contactInfo.address },
  { icon: Clock, label: "Working Hours", value: contactInfo.workingHours }
];

export default function ContactForm() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useForm();

  const WHATSAPP_NUMBER = "919529178362"; // India country code + number

  const onSubmit = async (formData) => {
    // Build WhatsApp message
    const message = `
*New Inquiry from Website*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || "Not provided"}
*Company:* ${formData.company || "Not provided"}

*Message:*
${formData.message}
    `.trim();

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <section className="py-20 md:py-28 bg-muted/30 dark:bg-background relative overflow-hidden min-h-screen">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Get in Touch"
          title="Let's Discuss Your"
          highlight="Requirements"
          description="Ready to elevate your packaging? Contact us for custom solutions tailored to your needs."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-12">
          {/* Contact Form */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-lg">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-accent-soft flex items-center justify-center mb-6">
                    <Send className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Opening WhatsApp!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Complete sending your message in WhatsApp.
                  </p>
                  <Button variant="secondary" onClick={resetForm}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit);
                  }}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput
                      label="Full Name"
                      name="name"
                      placeholder="John Doe"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && errors.name}
                      required
                    />
                    <FormInput
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone && errors.phone}
                    />
                    <FormInput
                      label="Company Name"
                      name="company"
                      placeholder="Your Company"
                      value={values.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.company && errors.company}
                    />
                  </div>

                  <FormTextarea
                    label="Your Message"
                    name="message"
                    placeholder="Tell us about your requirements..."
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.message && errors.message}
                    required
                  />

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                    icon={Send}
                    iconPosition="right"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            {/* Company Info */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {contactInfo.company}
              </h3>
              <p className="text-muted-foreground">
                {contactInfo.tagline}
              </p>
            </div>

            {/* Contact Details */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {contactDetails.map((detail, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <div className="p-4 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gradient-from to-gradient-to flex items-center justify-center flex-shrink-0">
                        <detail.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {detail.label}
                        </h4>
                        <p className="text-muted-foreground text-sm mt-1">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Map or Image */}
            {/* <GlassCard className="overflow-hidden mt-6" hover={false}>
              <img
                src="/adishri_logo3.png"
                alt="Office Location"
                className="w-full h-48 object-cover"
              />
            </GlassCard> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Form Input Component
function FormInput({ label, error, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/80 mb-2">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <input
        {...props}
        className={`
          w-full px-4 py-3 rounded-xl
          bg-background
          border ${error ? "border-destructive" : "border-border"}
          text-foreground
          placeholder-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          transition-all duration-300
        `}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-destructive"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// Form Textarea Component
function FormTextarea({ label, error, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/80 mb-2">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <textarea
        {...props}
        rows={4}
        className={`
          w-full px-4 py-3 rounded-xl resize-none
          bg-background
          border ${error ? "border-destructive" : "border-border"}
          text-foreground
          placeholder-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          transition-all duration-300
        `}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-destructive"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
