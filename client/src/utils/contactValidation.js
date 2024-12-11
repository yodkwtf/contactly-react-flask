const validateContactForm = (formData) => {
    const errors = {};
  
    if (!formData.name || formData.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters long.';
    }
  
    if (!/^\d+$/.test(formData.phone)) {
      errors.phone = 'Phone number must contain only digits.';
    }
  
    if (!formData.occupation || formData.occupation.trim().length < 3) {
      errors.occupation = 'Occupation must be at least 3 characters long.';
    }
  
    if (!formData.address || formData.address.trim().length < 5) {
      errors.address = 'Address must be at least 5 characters long.';
    }
  
    if (!formData.gender) {
      errors.gender = 'Gender is required.';
    }
  
    return errors;
  };
  
  export default validateContactForm;
  