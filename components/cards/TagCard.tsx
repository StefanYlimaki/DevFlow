import Link from "next/link";

interface Props {
  tag: {
    _id: string;
    name: string;
    questions: [];
  };
}

const TagCard = ({ tag }: Props) => {
  return (
    <Link
      href={`/tags/${tag._id}`}
      className="shadow-light100_darknone background-light900_dark200 light-border rounded-2xl border p-8 max-xs:min-w-full xs:w-[260px]"
    >
      <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
        <p className="paragraph-semibold text-dark300_light900">{tag.name}</p>
      </div>

      <p className="small-regular text-dark500_light700 mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed
        quam efficitur, rhoncus ipsum placerat, feugiat nibh. Mauris imperdiet
        ex vel vulputate mattis. Morbi iaculis molestie purus, vel mollis velit.
      </p>

      <p className="small-medium text-dark400_light500 mt-3.5">
        <span className="body-semibold primary-text-gradient mr-2.5">
          {tag.questions.length}+
        </span>{" "}
        Questions
      </p>
    </Link>
  );
};

export default TagCard;
