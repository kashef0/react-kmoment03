import validator from 'validator'; // Note the lowercase 'v'


interface ErrorMessage {
  [key: string]: string | boolean; // Tillåt alla egenskapsnamn för fel
}

const validationForm = <T>(data: T | null) => {
  const validationErrors: ErrorMessage = {};

  if (!data) {
      return { 
          all: "Formulärdata krävs." 
      };
  }

  for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) { // Kontrollera om egenskaper ligger direkt på objektet
          const value = data[key];

          if (typeof value === 'string') {
            if (key === 'password') {
                const password = value;
              
                // Använd react-validator för lösenordsvalidering
                const passwordError = validator.isStrongPassword(password, 
                  {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                  }
                );

                if (passwordError !== true) {
                    validationErrors[key] = passwordError; // Felmeddelande från react-validator
                }
              }
          }
          if (!value) { 
              validationErrors[key] = `${key} är obligatoriskt.`; // felmedellande beronde på egenskapsnamn
          }

          else if (typeof value === 'string' && value.length > 50) {
              validationErrors[key] = `${key} får inte vara längre än 50 tecken.`;
          }

          else if (key === 'email' && typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              validationErrors[key] = `Ogiltig ${key}.`;
          }

      }
  }

  return validationErrors;
};

export default validationForm;