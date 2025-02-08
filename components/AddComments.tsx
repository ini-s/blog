import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import styles from "@/styles/AddComment.module.css";

interface IAddCommentProps {
  name: string;
  email: string;
  comment: string;
}

const defaultValues = {
  name: "",
  email: "",
  comment: "",
};

function AddComments({ postId }: { postId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IAddCommentProps>({ defaultValues });

  const onSubmit = async (data: IAddCommentProps) => {
    const { name, email, comment } = data;

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, comment, postId }),
    });

    if (!res.ok) {
      console.log("Failed to add comment");
      return;
    }

    reset();
  };

  return (
    <section className={styles.commentSection}>
      <p className={styles.commentSectionHeading}>
        Leave a comment <span role="image">💬</span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="name">First Name</label>
          <input
            id="name"
            {...register("name", {
              required: "Please enter your name",
            })}
          />

          {errors?.name && (
            <p className={styles.inputFooterText}>
              {errors?.name?.message as string}
            </p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="email">
            Email <span>(Your email will not be published)</span>
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Please enter your email address",
              validate: {
                isEmail: (value) =>
                  isEmail(value) || "Please enter a valid email address",
              },
            })}
          />

          {errors?.email && (
            <p className={styles.inputFooterText}>
              {errors?.email?.message as string}
            </p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            {...register("comment", {
              required: "Please enter a comment",
              minLength: {
                value: 2,
                message: "Comment must be at least two characters long",
              },
            })}
          />

          {errors?.comment && (
            <p className={styles.inputFooterText}>
              {errors?.comment?.message as string}
            </p>
          )}
        </div>

        <input
          type="submit"
          className={styles.btn}
          value={isSubmitting ? "Submitting..." : "Submit"}
          disabled={isSubmitting}
        />
      </form>
    </section>
  );
}

export default AddComments;
