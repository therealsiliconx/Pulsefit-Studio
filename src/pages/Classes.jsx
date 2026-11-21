
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Clock,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import classes from "../data/classes";

function Classes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  // Get unique categories from our class data
  const categories = [
    "All",
    ...new Set(classes.map((fitnessClass) => fitnessClass.category)),
  ];
  const difficulties = [
  "All",
  ...new Set(classes.map((fitnessClass) => fitnessClass.difficulty)),
];

  // Filter the classes
  const filteredClasses = classes.filter((fitnessClass) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      fitnessClass.name.toLowerCase().includes(search) ||
      fitnessClass.category.toLowerCase().includes(search) ||
      fitnessClass.trainer.toLowerCase().includes(search) ||
      fitnessClass.description.toLowerCase().includes(search);

    const matchesCategory =
      categoryFilter === "All" ||
      fitnessClass.category === categoryFilter;

    const matchesDifficulty =
      difficultyFilter === "All" ||
      fitnessClass.difficulty === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Sort the filtered classes
  const sortedClasses = [...filteredClasses].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;

      case "price-high":
        return b.price - a.price;

      case "duration-short":
        return a.duration - b.duration;

      case "duration-long":
        return b.duration - a.duration;

      case "name":
        return a.name.localeCompare(b.name);

      default:
        return 0;
    }
  });

  // Reset everything
  function resetFilters() {
    setSearchTerm("");
    setCategoryFilter("All");
    setDifficultyFilter("All");
    setSortOption("default");
  }

  const hasActiveFilters =
    searchTerm !== "" ||
    categoryFilter !== "All" ||
    difficultyFilter !== "All" ||
    sortOption !== "default";

  return (
    <main className="classes-page">
      {/* PAGE HEADER */}
      <section className="classes-header">
        <div className="section-label">PULSEFIT STUDIO — TRAINING</div>

        <h1>
          FIND YOUR
          <br />
          <span>SESSION.</span>
        </h1>

        <p>
          From building your foundations to pushing your limits.
          Find a training session that fits your goals.
        </p>

        <div className="classes-count">
          <span>{classes.length} PROGRAMS</span>
          <span>ISLAMABAD, PAKISTAN</span>
        </div>
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="class-discovery">
        <div className="discovery-heading">
          <div>
            <div className="section-label">EXPLORE OUR TRAINING</div>
            <h2>FIND YOUR FIT.</h2>
          </div>

          <div className="results-count">
            SHOWING <strong>{sortedClasses.length}</strong> OF{" "}
            <strong>{classes.length}</strong> CLASSES
          </div>
        </div>

        {/* Search bar */}
        <div className="discovery-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search classes, trainers or training styles..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="discovery-controls">
          <div className="filter-group">
            <label>
              <SlidersHorizontal size={14} /> CATEGORY
            </label>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>DIFFICULTY</label>

            <select
              value={difficultyFilter}
              onChange={(event) => setDifficultyFilter(event.target.value)}
            >
              {difficulties.map((difficulty) => (
                <option value={difficulty} key={difficulty}>
                    {difficulty === "All" ? "All Levels" : difficulty}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group sort-group">
            <label>SORT BY</label>

            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
            >
              <option value="default">Default</option>
              <option value="name">Name (A–Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration-short">Duration: Shortest</option>
              <option value="duration-long">Duration: Longest</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button className="reset-filters" onClick={resetFilters}>
              <X size={14} /> Reset
            </button>
          )}
        </div>
      </section>

      {/* CLASS RESULTS */}
      <section className="classes-list-section discovery-results">
        {sortedClasses.length > 0 ? (
          <div className="classes-grid">
            {sortedClasses.map((fitnessClass, index) => (
              <article className="class-list-card" key={fitnessClass.id}>
                <div
                  className={`class-card-visual visual-${(index % 4) + 1}`}
                >
                  <span className="class-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="class-category">
                    {fitnessClass.category}
                  </span>

                  <span className="class-visual-word">
                    {fitnessClass.category.toUpperCase()}
                  </span>

                  <span className="class-spots">
                    {fitnessClass.availableSpots > 0
                      ? `${fitnessClass.availableSpots} SPOTS LEFT`
                      : "FULL"}
                  </span>
                </div>

                <div className="class-list-info">
                  <div className="class-title-row">
                    <h3>{fitnessClass.name}</h3>

                    <span className="class-price">
                      Rs. {fitnessClass.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="class-description">
                    {fitnessClass.description}
                  </p>

                  <div className="class-meta">
                    <span>
                      <Clock size={15} /> {fitnessClass.duration} min
                    </span>

                    <span>{fitnessClass.difficulty}</span>
                  </div>

                  <div className="class-trainer-label">
                    TRAINER <strong>{fitnessClass.trainer}</strong>
                  </div>

                  <Link
                    to={`/classes/${fitnessClass.id}`}
                    className="class-details-link"
                  >
                    View Details <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="classes-empty">
            <div className="empty-icon">
              <Search size={25} />
            </div>

            <h2>NO CLASSES FOUND.</h2>

            <p>
              We couldn't find any sessions matching your search.
              Try adjusting your search or filters.
            </p>

            <button className="button-primary" onClick={resetFilters}>
              Clear All Filters <X size={16} />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Classes;
