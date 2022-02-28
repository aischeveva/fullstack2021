import Part from "./Part";
import CoursePart from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return <div>
        { courseParts.map(coursePart => (
            <Part coursePart={coursePart} key={coursePart.name} />
        ))}
    </div>
}

export default Content;