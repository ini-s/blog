import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import { FaUser } from "react-icons/fa";

import { Comment } from "@/types";

import styles from "@/styles/AllComments.module.css";

interface IComments {
  comments: Comment[];
}

function AllComments({ comments }: IComments) {
  return (
    <section className={styles.allCommentsSection}>
      <h3>All comments</h3>

      {comments?.length === 0 && <p>No comments yet.</p>}

      {comments?.map((comment, index) => (
        <div key={index} className={styles.comment}>
          <div>
            <span>
              <FaUser />
            </span>
            <p className={styles.author}>{comment.name}</p>
          </div>
          <p>{dayjs(comment._createdAt).format("MMM D, YYYY")}</p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </section>
  );
}

export default AllComments;
