from app.services.question_generator import (
    generate_questions
)


def create_interview_questions(
    context,
    count,
    difficulty,
    interview_type
):

    questions_text = generate_questions(
        context=context,
        count=count,
        difficulty=difficulty,
        question_type=interview_type
    )

    questions = []

    for line in questions_text.split("\n"):

        line = line.strip()

        if (
            line and
            "." in line[:4]
        ):

            questions.append(
                line
            )

    return questions