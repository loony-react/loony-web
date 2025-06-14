Here's a **KaTeX and LaTeX cheatsheet** tailored for **Markdown usage**, especially useful in documentation or platforms like GitHub, Jupyter, or Obsidian that support math rendering with `$...$` or `$$...$$`.

---

## 🔤 Basic Syntax

| Description  | Inline Syntax    | Block Syntax      | Output         |
| ------------ | ---------------- | ----------------- | -------------- |
| Inline math  | `$x + y$`        |                   | $x + y$        |
| Block math   |                  | `$$x + y$$`       | $x + y$        |
| Superscript  | `$x^2$`          | `$$x^2$$`         | $x^2$          |
| Subscript    | `$x_2$`          | `$$x_2$$`         | $x_2$          |
| Fractions    | `$\frac{a}{b}$`  | `$$\frac{a}{b}$$` | $\frac{a}{b}$  |
| Roots        | `$\sqrt{x}$`     | `$$\sqrt{x}$$`    | $\sqrt{x}$     |
| nth Root     | `$\sqrt[n]{x}$`  |                   | $\sqrt[n]{x}$  |
| Text in math | `$\text{hello}$` |                   | $\text{hello}$ |

---

## 🧮 Common Symbols

| Description    | Syntax            | Output          |
| -------------- | ----------------- | --------------- |
| Plus-minus     | `\pm`             | $\pm$           |
| Multiplication | `\times`, `\cdot` | $\times, \cdot$ |
| Division       | `\div`            | $\div$          |
| Inequalities   | `\le`, `\ge`      | $\le, \ge$      |
| Not equal      | `\ne`             | $\ne$           |
| Approx equal   | `\approx`         | $\approx$       |
| Infinity       | `\infty`          | $\infty$        |
| Degree         | `^\circ`          | $45^\circ$      |

---

## 🧠 Logic and Sets

| Concept              | Syntax               | Output             |
| -------------------- | -------------------- | ------------------ |
| And / Or             | `\land`, `\lor`      | $\land, \lor$      |
| Not                  | `\neg`               | $\neg$             |
| In                   | `\in`, `\notin`      | $\in, \notin$      |
| Subset / Superset    | `\subset`, `\supset` | $\subset, \supset$ |
| Union / Intersection | `\cup`, `\cap`       | $\cup, \cap$       |
| Empty set            | `\emptyset`          | $\emptyset$        |

---

## 🔢 Greek Letters

| Name  | Syntax   | Output   | Capital    |
| ----- | -------- | -------- | ---------- |
| Alpha | `\alpha` | $\alpha$ | `\Alpha`\* |
| Beta  | `\beta`  | $\beta$  | `\Beta`\*  |
| Gamma | `\gamma` | $\gamma$ | `\Gamma`   |
| Delta | `\delta` | $\delta$ | `\Delta`   |
| Theta | `\theta` | $\theta$ | `\Theta`   |
| Pi    | `\pi`    | $\pi$    | `\Pi`      |
| Sigma | `\sigma` | $\sigma$ | `\Sigma`   |
| Omega | `\omega` | $\omega$ | `\Omega`   |

> \*Note: Some capital Greek letters are rendered as Roman letters.

---

## 🧰 Functions

| Function Type    | Syntax                 | Output             |
| ---------------- | ---------------------- | ------------------ |
| Common functions | `\sin`, `\cos`, `\tan` | $\sin, \cos, \tan$ |
| Logarithm        | `\log`, `\ln`          | $\log, \ln$        |
| Limits           | `\lim_{x \to 0}`       | $\lim_{x \to 0}$   |
| Summation        | `\sum_{i=1}^{n}`       | $\sum_{i=1}^{n}$   |
| Integral         | `\int_{a}^{b}`         | $\int_{a}^{b}$     |
| Derivative       | `\frac{dy}{dx}`        | $\frac{dy}{dx}$    |
| Partial Deriv    | `\partial`             | $\partial$         |

---

## 🧱 Matrices

```latex
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
```

Renders as:

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

You can also use `pmatrix`, `vmatrix`, etc.

---

## 📌 Miscellaneous

| Description | Syntax                        | Output                    |
| ----------- | ----------------------------- | ------------------------- |
| Arrows      | `\leftarrow`, `\Rightarrow`   | $\leftarrow, \Rightarrow$ |
| Dots        | `\ldots`, `\cdots`            | $\ldots, \cdots$          |
| Overline    | `\overline{AB}`               | $\overline{AB}$           |
| Underbrace  | `\underbrace{a+b}_{sum}`      | $\underbrace{a+b}_{sum}$  |
| Cases       | `\begin{cases}...\end{cases}` | See below                 |

Example for `cases`:

```latex
f(x) = \begin{cases}
x^2 & x \ge 0 \\
-x  & x < 0
\end{cases}
```

$$
f(x) = \begin{cases}
x^2 & x \ge 0 \\
-x  & x < 0
\end{cases}
$$

---

## ✅ Markdown Tips

- Use `$$...$$` for block-level math (centered, new line).
- Use `$...$` for inline math.
- Escape underscores `_` in LaTeX inside Markdown to avoid italic formatting.

---

Would you like this in a downloadable Markdown `.md` file?
