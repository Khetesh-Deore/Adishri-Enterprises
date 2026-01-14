// ContactForm Component - Contact Section with Form
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useForm } from "../../controllers/useForm";
import { contactInfo } from "../../models/navigationData";
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from "../../controllers/useAnimations";
import { SectionHeading, GlassCard, Button } from "../shared";

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

  const onSubmit = async (formData) => {
    // Simulate API call
    console.log("Form submitted:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-gray-50/50 dark:bg-gray-800/30 relative overflow-hidden">
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
            <GlassCard className="p-6 md:p-8" hover={false}>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                    <Send className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We'll get back to you within 24 hours.
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
            </GlassCard>
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
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {contactInfo.company}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
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
                  <GlassCard className="p-4" hover={true}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                        <detail.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {detail.label}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Map or Image */}
            <GlassCard className="overflow-hidden mt-6" hover={false}>
              <img
                src="/adishri_logo3.png"
                alt="Office Location"
                className="w-full h-48 object-cover"
              />
            </GlassCard>
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
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        {...props}
        className={`
          w-full px-4 py-3 rounded-xl
          bg-white dark:bg-gray-800
          border ${error ? "border-red-500" : "border-gray-200 dark:border-gray-700"}
          text-gray-800 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-300
        `}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
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
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        {...props}
        rows={4}
        className={`
          w-full px-4 py-3 rounded-xl resize-none
          bg-white dark:bg-gray-800
          border ${error ? "border-red-500" : "border-gray-200 dark:border-gray-700"}
          text-gray-800 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-300
        `}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
