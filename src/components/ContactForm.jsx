import { useState } from "react";
import { Send } from "lucide-react";

const initialValues = {
  name: "",
  contact: "",
  message: "",
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function updateValue(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = "Нэрээ оруулна уу.";
    if (!values.contact.trim()) {
      nextErrors.contact = "Имэйл эсвэл утасны дугаараа оруулна уу.";
    }
    if (!values.message.trim()) nextErrors.message = "Зурвасаа оруулна уу.";
    return nextErrors;
  }

  function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSent(false);
    if (Object.keys(nextErrors).length > 0) return;
    setValues(initialValues);
    setSent(true);
  }

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit}>
      <p className="form-note">
        Энэ маягт нь зөвхөн загвар. Мэдээлэл сервер рүү илгээгдэхгүй.
      </p>
      <label>
        <span>Нэр</span>
        <input
          name="name"
          value={values.name}
          onChange={updateValue}
          aria-invalid={Boolean(errors.name)}
          autoComplete="name"
        />
        {errors.name ? <small>{errors.name}</small> : null}
      </label>
      <label>
        <span>Имэйл эсвэл утас</span>
        <input
          name="contact"
          value={values.contact}
          onChange={updateValue}
          aria-invalid={Boolean(errors.contact)}
          autoComplete="email"
        />
        {errors.contact ? <small>{errors.contact}</small> : null}
      </label>
      <label>
        <span>Зурвас</span>
        <textarea
          name="message"
          value={values.message}
          onChange={updateValue}
          aria-invalid={Boolean(errors.message)}
          rows="5"
        />
        {errors.message ? <small>{errors.message}</small> : null}
      </label>
      <button className="button primary" type="submit">
        Илгээх
        <Send size={18} aria-hidden="true" />
      </button>
      {sent ? (
        <div className="success-message" role="status">
          Баярлалаа. Загвар маягт амжилттай шалгагдлаа.
        </div>
      ) : null}
    </form>
  );
}
