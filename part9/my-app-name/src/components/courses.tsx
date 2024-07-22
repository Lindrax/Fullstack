import Part from "./part";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseWDesc extends CoursePartBase {
  description: string;
}
interface CoursePartBasic extends CoursePartBase, CourseWDesc {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase, CourseWDesc {
  backgroundMaterial: string;
  kind: "background";
}

interface CourseWReq extends CoursePartBase, CourseWDesc {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CourseWReq;

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return <Part courses={courses} />;
};

export default Content;
