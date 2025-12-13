// Calculate age dynamically on page load
function calculateAge(birthDate: string): number {
  const today: Date = new Date();
  const birth: Date = new Date(birthDate);
  let age: number = today.getFullYear() - birth.getFullYear();

  if (
    today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
  ) {
    age--;
  }

  return age;
}

// Update dynamic content on page load
document.addEventListener("DOMContentLoaded", function (): void {
  // Update age on about page
  const ageElement: HTMLElement | null = document.getElementById("age-display");
  if (ageElement) {
    ageElement.textContent = calculateAge("1996-07-17").toString();
  }

  // Update copyright year
  const copyrightElement: HTMLElement | null =
    document.getElementById("copyright-year");
  if (copyrightElement) {
    const currentYear: number = new Date().getFullYear();
    copyrightElement.textContent = `© ${currentYear} Colin Banigan. All rights reserved.`;
  }
});
