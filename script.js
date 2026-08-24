const username = "Gavince";

document.getElementById("year").textContent = new Date().getFullYear();

async function hydrateGitHubData() {
  try {
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    );

    if (!reposResponse.ok) return;
    const repos = await reposResponse.json();

    document.querySelectorAll("[data-repo]").forEach((card) => {
      const repo = repos.find((item) => item.name === card.dataset.repo);
      const stars = card.querySelector(".repo-stars");
      if (repo && stars) stars.textContent = `★ ${repo.stargazers_count}`;
    });
  } catch {
    // Static fallback values remain visible when GitHub's API is unavailable.
  }
}

hydrateGitHubData();

const revealTargets = document.querySelectorAll(
  ".section-title, .proof-strip, .capability-card, .case-study, .writing-grid a, .toolbelt-grid > div, .contact-links",
);

revealTargets.forEach((element) => element.classList.add("scroll-reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

revealTargets.forEach((element) => observer.observe(element));
