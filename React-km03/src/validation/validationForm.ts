
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