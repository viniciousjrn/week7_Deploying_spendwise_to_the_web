# SpendWise — Personal Budgeting & Expense Tracker

## Project Description
SpendWise is a responsive, interactive personal budgeting web application built across the Web Development curriculum. Users can set a monthly budget, log categorized expenses, remove individual items or clear all entries, view real-time spending percentages and remaining balances, and receive dynamic visual alerts when approaching or exceeding their budget.

## Technologies Used
- **HTML5:** Semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) and accessible forms.
- **CSS3:** Responsive Flexbox and CSS Grid layouts, mobile media queries, and color-coded status banners.
- **JavaScript (ES6+):** Variables, reusable calculation functions, arrays, loops, conditionals, event listeners, DOM manipulation, and `localStorage` data persistence.
- **Git & GitHub:** Version control and public source code hosting.
- **Netlify:** Cloud hosting and continuous deployment (CI/CD).

## GitHub Repository Information
- **Repository Owner:** `viniciousjrn`
- **Repository Name:** `spendwise`
- **Repository URL:** https://github.com/viniciousjrn/spendwise
- **Branch Deployed:** `main`

## Live Netlify Website URL
- **Live Site:** https://spendwise-vinicious.netlify.app

## Deployment Process Summary
1. **Deployment Readiness:** Placed `index.html`, `style.css`, `script.js`, and `README.md` in the root folder using clean relative paths (`href="style.css"`, `src="script.js"`).
2. **GitHub Repository Setup:** Committed and pushed all project files to the public `spendwise` repository on GitHub.
3. **Netlify Connection:** Imported the `spendwise` repository into Netlify and deployed the `main` branch.
4. **Custom Domain Configuration:** Updated the auto-generated Netlify subdomain to a meaningful project-specific URL (`spendwise-vinicious.netlify.app`).
5. **Continuous Deployment Verification:** Pushed a visible footer update to GitHub and verified that Netlify automatically triggered a new deploy and updated the live site.

## Challenges Encountered During Deployment
- **Linux Case Sensitivity & File Paths:** Ensuring all file references in `index.html` matched the exact lowercase filenames in the repository prevented broken stylesheets or scripts on Netlify's Linux hosting environment.
- **Preserving User Data Across Reloads:** Adding `localStorage` ensured that budgets and expenses entered on the live site remain saved even if the user refreshes the page.

## Lessons Learned
- Iterative development—from semantic HTML and responsive CSS to interactive JavaScript and cloud hosting—keeps code modular and easy to maintain.
- Connecting GitHub directly to Netlify provides automated continuous deployment, publishing every `git push` to the live internet within seconds.
