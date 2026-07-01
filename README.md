<h1 align="center">Abrash Arshad's Portfolio</h1>

<p align="center">
  <b>AI Engineer / Fast Learner — portfolio site with full-page scrolling and project case studies.</b><br>
  <a href="https://abrash.dev/">Live Portfolio</a>
</p>

---

## About

Personal portfolio for **Abrash Arshad**, built as a single-page experience with animated section transitions, a projects hub, and detailed case-study pages for featured work in AI/ML and full-stack development.

- **Live site:** [abrash.dev](https://abrash.dev/)
- **Stack:** HTML5, CSS3, JavaScript (static, no build step)

---

## Features

- **Hero** — Full-screen intro with parallax moon/clouds and letter animations
- **Projects (01)** — Home section linking to a scrollable projects hub
- **About Me (02)** — Bio, passion areas, and animated skill bars
- **Contact (03)** — Email and social links
- **Projects hub** — Overview plus two featured projects with detail pages
- **Project case studies** — RAG Chatbot and Transformer Learning Hub with live demo and GitHub links
- **SPA-style routing** — Client-side navigation between home, projects, and detail views
- **Responsive layout** — Desktop and mobile layouts with side section navigation on home

---

## Featured Projects

| Project | Live Demo | Repository |
|--------|-----------|------------|
| RAG Chatbot | [rag-bot-learning.netlify.app](https://rag-bot-learning.netlify.app/) | [Rag_Chatbot](https://github.com/Abrash-Official/Rag_Chatbot) |
| Transformer Learning Hub | [learn-transformers.netlify.app](https://learn-transformers.netlify.app/) | [Learn_Transformers](https://github.com/drwasimahmadkhan/Learn_Transformers) |

---

## Tech Stack

**Site**
- HTML5, CSS3, JavaScript
- [fullPage.js](https://github.com/alvarotrigo/fullPage.js) — section scrolling
- [Barba.js](https://barba.js.org/) — page transitions
- [anime.js](https://animejs.com/) — motion and transitions
- [Parallax.js](https://matthew.wagerfield.com/parallax/) — hero parallax

**Projects (highlights)**
- Python, FastAPI, LangChain, ChromaDB, Groq
- HTML, CSS, JavaScript

---

## Getting Started

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd next_portfolio
```

2. **Serve locally** (recommended — routing works best over HTTP, not `file://`)

```bash
npx serve .
```

3. Open the URL shown in the terminal (e.g. `http://localhost:3000`).

No install or build step is required.

---

## Site Structure

```
next_portfolio/
├── index.html              # Home + inline detail page templates
├── sitemap.xml
├── README.md
└── assets/
    ├── css/                # Styles (common, fullPage, awwwards overrides)
    ├── js/
    │   ├── router.js       # SPA routing (home, projects, rag, transformer, about)
    │   └── common.min.js   # fullPage init, menu, animations
    ├── img/                # Images, project previews, icons, skills
    └── font/               # Futura web fonts
```

### Routes

| Route | Description |
|-------|-------------|
| `/` or `#top` | Hero |
| `#projects` | Projects section on home |
| `./projects` | Projects hub |
| `./rag` | RAG Chatbot case study |
| `./transformer` | Transformer Learning Hub case study |
| `./about` or `#about` | About Me |
| `#contact` | Contact section |

---

## About Me

Hi, I'm **Abrash Arshad**, a Computer Science undergraduate at the Institute for Arts and Culture, Lahore (CGPA: 3.5/4). I'm focused on machine learning, robotics, and building intelligent systems.

- **Languages:** Python, C++ (basic), JavaScript
- **Tools:** NumPy, Pandas, Matplotlib, LangChain, FastAPI
- **Interests:** Computer vision, NLP, RAG systems, DSA
- **LeetCode:** 130+ problems solved

---

## Contact

- **Email:** [abrash.official100@gmail.com](mailto:abrash.official100@gmail.com)
- **LinkedIn:** [linkedin.com/in/abrasharshad](https://www.linkedin.com/in/abrasharshad/)
- **LeetCode:** [leetcode.com/u/Abrash-Official](https://leetcode.com/u/Abrash-Official/)
- **GitHub:** [github.com/Abrash-Official](https://github.com/Abrash-Official)

---

<p align="center">
  <b>Thank you for visiting my portfolio!</b>
</p>
