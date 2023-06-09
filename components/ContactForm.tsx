// components/ContactForm.tsx
import Heading from "@/components/Heading";
import { useState } from "react";
import { ContactForm as ContactFormData } from "@/interfaces/ContactForm";
import FormInput from "@/components/FormInput";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files![0]);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", formData.subject);
    form.append("message", formData.message);
    if (selectedFile) form.append("file", selectedFile);

    const response = await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const result = await response.json();
    alert(result.message);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="leading-loose">
      <form
        onSubmit={handleSubmit}
        className="bg-light-1 dark:bg-dark-1 rounded-xl text-left p-6 sm:p-8"
      >
        <Heading text="Contact Details" />
        <FormInput
          inputLabel="Full Name"
          labelFor="name"
          inputType="text"
          inputId="name"
          inputName="name"
          placeholderText="Your Name"
          ariaLabelName="Name"
          onChange={handleChange}
          value={formData.name}
        />
        <FormInput
          inputLabel="Email"
          labelFor="email"
          inputType="email"
          inputId="email"
          inputName="email"
          placeholderText="Your Email"
          ariaLabelName="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <FormInput
          inputLabel="Subject"
          labelFor="subject"
          inputType="text"
          inputId="subject"
          inputName="subject"
          placeholderText="Subject"
          ariaLabelName="Subject"
          onChange={handleChange}
          value={formData.subject}
        />

        <div className="mb-4">
          <label
            className="block text-lg text-dark-2 dark:text-light-2 mb-1"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="w-full px-5 py-2 border text-dark-2 dark:text-light-2 bg-white dark:bg-black border-dark-2 dark:border-light-2 rounded-md shadow-sm text-md"
            id="message"
            name="message"
            cols={14}
            rows={6}
            aria-label="Message"
            onChange={handleChange}
            value={formData.message}
            required
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            aria-label="Send Message"
            className="text-light-1 dark:text-light-1 bg-accent-dark dark:bg-accent-dark hover:bg-accent-light dark:hover:bg-accent-light font-general-medium flex justify-center items-center w-40 sm:w-40 mb-6 sm:mb-0 text-lg py-2.5 sm:py-3 rounded-lg duration-300"
          >
            <span className="text-sm sm:text-lg">Send Message</span>
          </button>
        </div>
        {/* Other form fields */}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
