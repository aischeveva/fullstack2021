interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CoursePartDescriptionBase extends CoursePartBase {
    description: string
}

interface CourseNormalPart extends CoursePartDescriptionBase {
    type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescriptionBase {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescriptionBase {
    type: "special";
    requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export default CoursePart