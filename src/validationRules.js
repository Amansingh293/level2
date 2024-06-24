const validateForm = (values) => {
    const errors = {};
    if (!values.fullName) errors.fullName = 'Full Name is required';
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if ((values.position === 'Developer' || values.position === 'Designer') && (!values.experience || isNaN(values.experience) || values.experience <= 0)) {
      errors.experience = 'Relevant Experience is required and must be a number greater than 0';
    }
    if (values.position === 'Designer' && !values.portfolioURL) {
      errors.portfolioURL = 'Portfolio URL is required';
    }
    if (values.position === 'Manager' && !values.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (!Object.values(values.skills).some(skill => skill)) {
      errors.skills = 'At least one skill must be selected';
    }
    if (!values.interviewTime) {
      errors.interviewTime = 'Preferred Interview Time is required';
    }
  
    return errors;
  };
  
  export default validateForm;
  