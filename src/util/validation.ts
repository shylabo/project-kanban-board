// validation
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validableInput: Validatable) {
  let isValid = true;
  if (validableInput.required) {
    isValid = isValid && validableInput.value.toString().trim().length !== 0;
  }
  if (validableInput.minLength != null && typeof validableInput.value === 'string') {
    isValid = isValid && validableInput.value.length >= validableInput.minLength;
  }
  if (validableInput.maxLength != null && typeof validableInput.value === 'string') {
    isValid = isValid && validableInput.value.length <= validableInput.maxLength;
  }
  if (validableInput.min != null && typeof validableInput.value === 'number') {
    isValid = isValid && validableInput.value >= validableInput.min;
  }
  if (validableInput.max != null && typeof validableInput.value === 'number') {
    isValid = isValid && validableInput.value <= validableInput.max;
  }

  return isValid;
}