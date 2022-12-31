import Image from "next/image";
import formatMonth from "../../../utils/formatMonth";

const CommentItem = ({ content, authorName, createdAt }) => {
  const currentDate = new Date();

  const [date, time] = createdAt.split("T");
  const [year, month, day] = date.split("-");
  console.log(date);
  // const seconds = (currentDate.getTime() - createdAt.getTime())/1000;
  // console.log(seconds)
  return (
    <div className="flex gap-4 pb-5">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
        width={40}
        height={30}
      />
      <div className="flex flex-col w-[90%]">
        <div className="flex gap-5 justify-between">
          <strong className="text-sm cursor-default">{authorName}</strong>
          <h2 className="text-sm text-white/40 cursor-default">{`${formatMonth[month]} ${day} ${year}`}</h2>
        </div>

        <p className="text-sm font-light">{content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
