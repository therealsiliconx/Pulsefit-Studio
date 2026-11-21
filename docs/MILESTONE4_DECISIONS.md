
# PulseFit Studio — Milestone 4 Frontend Decisions

## 1. Search Implementation

Search was implemented using React useState to store the user's search query.

The search checks class names, categories, trainer names, and descriptions. This allows customers to locate sessions using different keywords rather than requiring exact class names.

## 2. Filtering

Category and difficulty filters were implemented using React state.

The available categories and difficulty levels are generated from the class data instead of being hardcoded. This makes the filters easier to maintain when new classes are added.

## 3. Sorting

Sorting is implemented using JavaScript's sort method on a copied array of filtered classes.

The application supports:
- Default order
- Alphabetical order
- Price ascending
- Price descending
- Duration ascending
- Duration descending

The original class data is not directly sorted or modified.

## 4. Empty State

An empty state is displayed when search and filters produce zero results.

The empty state provides feedback and a reset button so the user can quickly return to the complete class list.

## 5. Availability Display

Each class card displays its stored available spots.

Classes with zero available spots display a FULL status. Other classes show how many spots remain.

## 6. Responsive Layout

CSS media queries adjust the filter controls and class cards for smaller screens.

The layout changes from multiple columns to a single column on mobile, while the filter controls remain accessible.

## 7. State Management

Local React state is used because search, filtering, and sorting only affect the Classes page.

A global state solution was not required for this milestone. Shared booking state will be considered when the booking functionality is implemented.

## 8. Testing

The following functionality was manually tested:
- Searching by class name
- Searching by trainer
- Searching by category
- Filtering by category
- Filtering by difficulty
- Sorting by price
- Sorting by duration
- Sorting alphabetically
- Combining multiple filters
- Empty results and reset
- Availability labels
- Mobile layout
