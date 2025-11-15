/**
 * Calculate Body Mass Index (BMI)
 * @param weight - Weight in kilograms
 * @param height - Height in meters
 * @returns BMI value
 */
export function calculateBMI(weight: number, height: number): number {
  if (weight <= 0 || height <= 0) {
    throw new Error('Weight and height must be positive numbers');
  }
  return weight / (height * height);
}

/**
 * Get BMI category based on BMI value
 * @param bmi - BMI value
 * @returns BMI category string
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal weight';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

/**
 * Main function to calculate and display BMI
 */
function main(): void {
  // Example usage
  const weight = 70; // kg
  const height = 1.75; // meters

  const bmi = calculateBMI(weight, height);
  const category = getBMICategory(bmi);

  console.log(`Weight: ${weight} kg`);
  console.log(`Height: ${height} m`);
  console.log(`BMI: ${bmi.toFixed(2)}`);
  console.log(`Category: ${category}`);
}

// Run main if this is the entry point
if (require.main === module) {
  main();
}
