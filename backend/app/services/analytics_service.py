def generate_analytics(scores):

    if not scores:

        return {
            "average": 0,
            "highest": 0,
            "lowest": 0
        }

    return {
        "average":
        round(
            sum(scores) / len(scores),
            2
        ),

        "highest":
        max(scores),

        "lowest":
        min(scores)
    }