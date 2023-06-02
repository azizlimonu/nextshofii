import React from 'react';
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from 'react-icons/bs';
import styles from './style.module.scss';

const QuestionsForm = ({ questions, product, setProduct }) => {
  const handleQuestion = (i, e) => {
    const values = [...questions];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, questions: values });
  };

  const handleRemove = (i) => {
    if (questions.length > 0) {
      const values = [...questions];
      values.splice(i, 1);
      setProduct({ ...product, questions: values });
    }
  };

  return (
    <div>
      <div className={styles.header}>Questions</div>
      {questions.length == 0 && (
        <BsFillPatchPlusFill
          className={styles.svg}
          onClick={() => {
            setProduct({
              ...product,
              questions: [
                ...questions,
                {
                  question: "",
                  answer: "",
                },
              ],
            });
          }}
        />
      )}
      {questions &&
        questions.map((q, i) => (
          <div className={styles.questions} key={i}>
            <textarea
              type="text"
              name="question"
              placeholder="Question"
              value={q.question}
              onChange={(e) => handleQuestion(i, e)}
            />

            <textarea
              type="text"
              name="answer"
              placeholder="Answer"
              value={q.answer}
              onChange={(e) => handleQuestion(i, e)}
            />

            <div className={styles.q__btn}>
              <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
              <BsFillPatchPlusFill
                onClick={() => {
                  setProduct({
                    ...product,
                    questions: [
                      ...questions,
                      {
                        question: "",
                        answer: "",
                      },
                    ],
                  });
                }}
              />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default QuestionsForm;