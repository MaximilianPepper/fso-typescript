interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Content = ({ name, exerciseCount }: ContentProps) => {
  return (
    <p>
      {name} {exerciseCount}
    </p>
  );
};

export default Content;
