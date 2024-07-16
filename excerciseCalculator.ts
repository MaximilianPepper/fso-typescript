interface ArgInterface {
  target: number;
  days: number[];
}
interface ExCalculator {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
type ratingEx = 1 | 2 | 3;
type ratingComment =
  | "try harder next time"
  | "you did good!"
  | "congratulation you met your target!";
const parseArguments = (args: string[]): ArgInterface => {
  if (args.length < 4)
    throw new Error(
      "To run this script input 2 or more args: first arg is the target exercise per day, every arg is hours of excercise done for each day of the training program"
    );
  let array = [];
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i])))
      throw new Error("all arguments must be numbers");
    if (i !== 2) array.push(Number(args[i]));
  }
  return {
    target: Number(args[2]),
    days: array,
  };
};

const calculateExercise = (data: ArgInterface): ExCalculator => {
  const { target, days } = data;
  const average = days.reduce((acc, curr) => acc + curr, 0) / days.length;
  const result = (target: number, average: number): boolean =>
    average >= target;
  const success = result(target, average);
  let rating: ratingEx;
  let comment: ratingComment;
  if (average > target) {
    rating = 3;
    comment = "congratulation you met your target!";
  } else if (target / average < 2) {
    rating = 2;
    comment = "you did good!";
  } else {
    rating = 1;
    comment = "try harder next time";
  }

  return {
    periodLength: days.length,
    trainingDays: days.reduce((acc, curr) => (curr !== 0 ? acc + 1 : acc), 0),
    success: success,
    rating: rating,
    ratingDescription: comment,
    target: target,
    average: average,
  };
};

try {
  const args = parseArguments(process.argv);
  const result = calculateExercise(args);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = "An error occurred : ";
  if (error instanceof Error) {
    errorMessage += "Error" + error.message;
    console.log(errorMessage);
  }
}
export default calculateExercise;
