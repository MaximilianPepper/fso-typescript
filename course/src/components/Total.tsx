interface TotalProps {
  totalExercises: number;
}
const Total = ({ totalExercises }: TotalProps) => {
  return <p>{totalExercises}</p>;
};

export default Total;
