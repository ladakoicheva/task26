import { useState } from "react";
import "./ContactForm.css";

function ContactForm({ onSave, onCancel }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({ name: "", phone: "", email: "" });


  const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ' -]{2,}$/u; 
  const phoneRegex = /^\d{3}-\d{3}-\d{2}-\d{2}$/; 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (field, value) => {
    switch (field) {
      case "name":
        if (!value) return "Ім'я обов'язкове";
        if (!nameRegex.test(value))
          return "Ім'я має містити лише літери (мінімум 2)";
        return "";
      case "phone":
        if (!value) return "Телефон обов'язковий";
        if (!phoneRegex.test(value))
          return "Телефон має бути у форматі 050-123-45-67";
        return "";
      case "email":
        if (!value) return "Email обов'язковий";
        if (!emailRegex.test(value)) return "Невірний формат email";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (field, value) => {
    if (field === "name") setName(value);
    if (field === "phone") setPhone(value);
    if (field === "email") setEmail(value);

    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const newErrors = {
      name: validateField("name", name),
      phone: validateField("phone", phone),
      email: validateField("email", email),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((v) => v !== "");
    if (hasError) {
      console.warn("Форма містить помилки", newErrors);
      return;
    }

    onSave({ id: Date.now(), name, phone, email });
  
    setName("");
    setPhone("");
    setEmail("");
    setErrors({ name: "", phone: "", email: "" });
  };

  const isFormValid =
    !Object.values(errors).some((v) => v) && name && phone && email;

  return (
    <div className="contact-form-container">
      <h2 className="contact-form-title">Добавити новий контакт</h2>
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Ім'я
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`form-input ${errors.name ? "input-error" : ""}`}
            placeholder="Іван Петренко"
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
          />
          {errors.name && (
            <div id="name-error" className="error-text">
              {errors.name}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`form-input ${errors.email ? "input-error" : ""}`}
            placeholder="ivan@example.com"
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {errors.email && (
            <div id="email-error" className="error-text">
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Телефон
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={`form-input ${errors.phone ? "input-error" : ""}`}
            placeholder="050-123-45-67"
            aria-invalid={!!errors.phone}
            aria-describedby="phone-error"
          />
          {errors.phone && (
            <div id="phone-error" className="error-text">
              {errors.phone}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Відміна
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid}
          >
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
