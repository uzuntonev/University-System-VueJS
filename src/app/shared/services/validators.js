export const rules = {
  email: v => (v || '').match(/@/) || 'Please enter a valid email',
  length: len => v =>
    (v || '').length <= len || `Invalid character length, required less than ${len}`,
  range: v =>
    (!isNaN(Number(v)) && Number(v) > 0 && Number(v) < 100) ||
    'Value must be number in range 0 - 100',
  password: v =>
    (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    'Password must contain an upper case letter, a numeric character, and a special character',
  required: v => !!v || 'This field is required'
};
