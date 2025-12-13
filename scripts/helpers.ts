export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();

  if (
    today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
  ) {
    return age - 1;
  }

  return age;
}

document.addEventListener("DOMContentLoaded", () => {
  const ageElement = document.getElementById(
    "age-display"
  ) as HTMLElement | null;
  if (ageElement) {
    ageElement.textContent = calculateAge("1996-07-17").toString();
  }

  const copyrightElement = document.getElementById(
    "copyright-year"
  ) as HTMLElement | null;
  if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.textContent = `© ${currentYear} Colin Banigan. All rights reserved.`;
  }
});
