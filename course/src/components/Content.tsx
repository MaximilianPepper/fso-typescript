import { CoursePart, assertNever } from "../types";

interface ContentProps {
  coursePart: CoursePart;
}

const Content = ({ coursePart }: ContentProps) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <p>{coursePart.description}</p>
        </>
      );
    case "group":
      return (
        <>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <p>Group project done: {coursePart.groupProjectCount}</p>
        </>
      );
    case "background":
      return (
        <>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <p>{coursePart.description}</p>
          <p>Submit to: {coursePart.backgroundMaterial}</p>
        </>
      );
    case "special":
      return (
        <>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <p>{coursePart.description}</p>
          <p>Required skills: {coursePart.requirements.join(",")}</p>
        </>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Content;
