from browser import document
from javascript import Math


def check_yB(I, E, y_B, R, i, L, r, S_0) -> float:
    x = (1 + i) / (1 + r)
    return (I - E) * x ** y_B + (E - R) * (x + i * x) ** y_B - (E - R) * x ** L * (1 + i) ** y_B - S_0 * (r - i) - (I - E)


def find_yB(event, I, E, R, i, Le, Lo, r, S_0, continuous) -> None:
    L = Le - Lo
    if continuous:
        r = Math.log(1 + r)
        i = Math.log(1 + i)

    y_B = 20
    delta_y_B = 5
    epsilon = 0.001
    val_0 = check_yB(I, E, y_B, R, i, L, r, S_0)

    n_steps = 0
    while n_steps < 100:
        y_B += delta_y_B
        val_1 = check_yB(I, E, y_B, R, i, L, r, S_0)
        if abs(val_1) < epsilon:
            output.innerHTML = (f"You can retire in {y_B} years.")
            print(val_1)
            return
        delta_y_B = delta_y_B * val_1 / (val_0 - val_1)
        n_steps += 1
        val_0 = val_1

    output.innerHTML = (f"I don't think you can retire.")


output = document["output"]
document["submit"].bind("click",
    lambda event: find_yB(
        event,
        float(document["I"].value),
        float(document["E"].value),
        float(document["R"].value),
        float(document["i"].value),
        float(document["Le"].value),
        float(document["Lo"].value),
        float(document["r"].value),
        float(document["S0"].value),
        document["continuous"].checked
    )
)
