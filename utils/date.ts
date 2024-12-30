export function validateDate(day: number, month: number, year: number) {
  const date = new Date(year, month - 1, day);
  const now = new Date();

  // Check if date is valid
  if (date.getDate() !== day) return false; // Handles invalid dates like 31/04/YYYY
  
  // Check if date is in the future
  if (date > now) return false;
  
  return true;
}

export function calculateAge(day: number, month: number, year: number) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
    days = Math.floor((today.getTime() - lastMonth.getTime()) / (1000 * 60 * 60 * 24));
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

