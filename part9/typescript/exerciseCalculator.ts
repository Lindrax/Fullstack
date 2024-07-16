interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (hours: number[], target: number): Result => {
  const average = hours.reduce((s, c) => s + c, 0) / hours.length;
  const ratio = average / target;
  let rate;
  let desc;

  if (ratio >= 1) {
    rate = 3;
    desc = "Excellent, target met!";
  } else if (ratio >= 0.7) {
    rate = 2;
    desc = "Not too bad but could be better";
  } else {
    rate = 1;
    desc = "You need to work harder";
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((d) => d > 0).length,
    success: average > target,
    rating: rate,
    ratingDescription: desc,
    target: target,
    average: average,
  };
};
if (require.main === module) {
  try {
    const [, , targetArg, ...exerciseHoursArgs] = process.argv;

    if (!targetArg || exerciseHoursArgs.length === 0) {
      console.error(
        "Please provide a target value and at least one exercise hour value."
      );
      process.exit(1);
    }

    const target = Number(targetArg);
    const exerciseHours = exerciseHoursArgs.map((arg) => Number(arg));

    if (isNaN(target) || exerciseHours.some(isNaN)) {
      console.error("All values should be numbers.");
      process.exit(1);
    }

    console.log(calculateExercises(exerciseHours, target));
    //console.log(calculateExercises([3, 5, 2, 4.5, 0, 3, 1], 2));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
export default calculateExercises;
