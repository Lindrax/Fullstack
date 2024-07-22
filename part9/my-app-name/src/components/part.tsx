import { CoursePart } from "./courses";

const Part = ({ courses }: { courses: CoursePart[] }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  return (
    <div>
      {courses.map((c) => {
        switch (c.kind) {
          case "basic":
            return (
              <div>
                <h3>
                  {c.name} {c.exerciseCount}
                </h3>
                <i>{c.description}</i>
              </div>
            );
          case "group":
            return (
              <div>
                <h3>
                  {c.name} {c.exerciseCount}
                </h3>
                <p> project exercises {c.groupProjectCount}</p>
              </div>
            );
          case "background":
            return (
              <div>
                <h3>
                  {c.name} {c.exerciseCount}
                </h3>
                <i> {c.description}</i>
                <p>background material {c.backgroundMaterial}</p>
              </div>
            );
          case "special":
            return (
              <div>
                <h3>
                  {c.name} {c.exerciseCount}
                </h3>
                <i> {c.description}</i>
                <p>required skills: {c.requirements.map((r) => `${r} `)}</p>
              </div>
            );
          default:
            return assertNever(c);
        }
      })}
    </div>
  );
};
export default Part;
