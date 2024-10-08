import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchData } from "../services/helpers";

const ActionButton = styled.svg`
  margin-right: 5px;
  /* &:hover {
    fill: orange;
    stroke: black;
  } */
`;

type CommentButtonProps = {
  postId: string;
};

export default function CommentButton({ postId }: CommentButtonProps) {
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const getCommentCount = async () => {
      const res = await fetchData(`${postId}/getComments`, "GET");
      const data = await res?.json();
      setTotalComments(data.message.length);
    };

    getCommentCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ActionButton
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </ActionButton>
      <div>{totalComments}</div>
    </>
  );
}
