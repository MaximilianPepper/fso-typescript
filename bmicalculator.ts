interface ArgumentValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): ArgumentValues => {
  if (args.length !== 4)
    throw new Error("To run this script input 2 arguments, height and weight");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const score = weight / Math.pow(height / 100, 2);
  if (score < 18.5) return "Underweight";
  else if (score > 25) return "Overweight";
  else return "Normal weight";
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  const result = calculateBmi(value1, value2);
  console.log("Your parameters result is: ", result);
} catch (error: unknown) {
  let errorMessage = "An error occurred : ";
  if (error instanceof Error) {
    errorMessage += "Error" + error.message;
    console.log(errorMessage);
  }
}
