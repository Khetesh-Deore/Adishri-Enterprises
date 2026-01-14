// Form Controller - Form State Management & Validation
import { useState, useCallback } from "react";

// Validation Rules
const validators = {
  required: (value) => {
    if (!value || value.trim() === "") {
      return "This field is required";
    }
    return null;
  },
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return null;
  },
  phone: (value) => {
    const phoneRegex = /^[+]?[\d\s-]{10,}$/;
    if (value && !phoneRegex.test(value)) {
      return "Please enter a valid phone number";
    }
    return null;
  },
  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },
  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return null;
  }
};

// Contact Form Initial State
const initialContactForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: ""
};

// Contact Form Validation Schema
const contactFormValidation = {
  name: [validators.required, validators.minLength(2)],
  email: [validators.required, validators.email],
  phone: [validators.phone],
  company: [],
  message: [validators.required, validators.minLength(10)]
};

// Custom Hook for Form Management
export function useForm(initialState = initialContactForm, validationSchema = contactFormValidation) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle Input Change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  // Handle Input Blur
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const fieldValidators = validationSchema[name] || [];
    for (const validate of fieldValidators) {
      const error = validate(values[name]);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
        break;
      }
    }
  }, [values, validationSchema]);

  // Validate All Fields
  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach((field) => {
      const fieldValidators = validationSchema[field];
      for (const validate of fieldValidators) {
        const error = validate(values[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
          break;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationSchema]);

  // Handle Form Submit
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const isValid = validateAll();

    if (isValid) {
      try {
        await onSubmit(values);
        setIsSubmitted(true);
        setValues(initialState);
        setTouched({});
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }

    setIsSubmitting(false);
  }, [values, validateAll, initialState]);

  // Reset Form
  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  }, [initialState]);

  // Get Field Props
  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] || "",
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] ? errors[name] : null
  }), [values, errors, touched, handleChange, handleBlur]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    getFieldProps,
    setValues,
    setErrors
  };
}

// Export validators for custom use
export { validators };

export default useForm;
