import validator from 'validator';

interface ErrorMessage {
  [key: string]: string | boolean;
}


const userValidationForm = <T>(data: T | null) => {

  const validationErrors: ErrorMessage = {};

  // Kontrollera om data finns
  if (!data) {
    return { 
      all: "Formulärdata krävs." 
    };
  }


  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) { // Kontrollera att nyckeln verkligen tillhör objektet
      const value = data[key];

      // Om värdet är en sträng
      if (typeof value === 'string') {
        

        if (key === 'password') {
          const password = value;

          // Kontrollera lösenordet
          const passwordError = validator.isStrongPassword(password, {
            minLength: 8,           
            minLowercase: 1,       
            minUppercase: 1,       
            minNumbers: 1,         
            minSymbols: 1,          
          });

          if (!passwordError) {
            validationErrors[key] = "Lösenordet måste vara minst 8 tecken långt, med en kombination av små bokstäver, stora bokstäver, siffror och symboler.";
          }
        }
      }

      if (!value) { 
        validationErrors[key] = `${key} är obligatoriskt.`; 
      }

      else if (typeof value === 'string' && value.length > 50) {
        validationErrors[key] = `${key} får inte vara längre än 50 tecken.`; 
      }

      // Om nyckeln är email och värdet inte matchar email
      else if (key === 'email' && typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        validationErrors[key] = `Ogiltig ${key}.`;  
      }
    }
  }


  return validationErrors;
};

export default userValidationForm;
