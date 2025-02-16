
interface FormErrors {
    name: string;
    description: string;
}

const validationForm = (data: { name: string; description: string } | null): FormErrors => {
    const validationErrors: FormErrors = { name: "", description: "" };

    if (!data) {
        return { name: "Formulärdata krävs.", description: "Formulärdata krävs." };
    }

    if (data.name.trim() === "") {
        validationErrors.name = "Namn är obligatoriskt.";
    } else if (data.name.length > 50) {
        validationErrors.name = "Namn får inte vara längre än 50 tecken.";
    }

    if (data.description.trim() === "") {
        validationErrors.description = "Beskrivning är obligatoriskt.";
    } else if (data.description.length > 200) {
        validationErrors.description = "Beskrivning får inte vara längre än 200 tecken.";
    }

    return validationErrors;
};

export default validationForm;


export const blogValidationForm = (formData: { title: string; content: string; author: string; category: string }) => {
  const errors = { title: "", content: "", author: "", category: "" };

  if (!formData.title) {
      errors.title = "Titel är obligatorisk.";
  }

  if (!formData.content) {
      errors.content = "Innehåll är obligatoriskt.";
  }

  if (!formData.author) {
      errors.author = "Författare är obligatoriskt."; // ändrat från errors.content
  }

  if (!formData.category) {
      errors.category = "Kategori är obligatoriskt."; // ändrat från errors.content
  }

  return errors;
};
