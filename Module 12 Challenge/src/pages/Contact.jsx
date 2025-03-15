import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Función para validar email con regex
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validaciones en tiempo real
    let newErrors = { ...errors };

    if (!value) {
      newErrors[name] = "Este campo es obligatorio";
    } else {
      newErrors[name] = "";
    }

    if (name === "email" && value && !validateEmail(value)) {
      newErrors.email = "Email no válido";
    }

    if (name === "message" && value.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
  };

  // Manejo de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.name) newErrors.name = "Este campo es obligatorio";
    if (!form.email) newErrors.email = "Este campo es obligatorio";
    if (form.email && !validateEmail(form.email)) newErrors.email = "Email no válido";
    if (!form.message) newErrors.message = "Este campo es obligatorio";
    if (form.message.length < 10) newErrors.message = "El mensaje debe tener al menos 10 caracteres";

    if (Object.keys(newErrors).length === 0) {
      console.log("Formulario enviado:", form);
      setSubmitted(true);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section>
      <h2>Contacto</h2>
      {submitted ? (
        <p className="success-message">¡Gracias por tu mensaje! Te responderemos pronto.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <textarea
            name="message"
            placeholder="Mensaje (mínimo 10 caracteres)"
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && <p className="error">{errors.message}</p>}

          <button type="submit">Enviar</button>
        </form>
      )}
    </section>
  );
}

export default Contact;
