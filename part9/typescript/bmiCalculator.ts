const calculateBmi = (height: number, weight: number) => {
  const ratio = (weight / height / height) * 10000;
  if (ratio < 18.5) {
    return "underweight";
  }
  if (ratio < 24.9) {
    return "normal (healthy weight)";
  }
  if (ratio < 29.9) {
    return "overweight";
  }
  if (ratio > 30) {
    return "obese";
  }
  return "error";
};
if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    if (args.length !== 2) {
      console.error("Please provide exactly two arguments: height and weight");
      process.exit(1);
    }

    const height = Number(args[0]);
    const weight = Number(args[1]);

    if (isNaN(height) || isNaN(weight)) {
      console.error("Both arguments must be numbers");
      process.exit(1);
    }
    console.log(weight, height);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
export default calculateBmi;
