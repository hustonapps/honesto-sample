import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RatingBar.css';

const range = (start, end) => Array.from({ length: end - start + 1 }, (x, i) => i + start);

const RatingBar = ({ rating = 0, max = 9, onSelectRating }) => {
  const [ratingHoverValue, setRatingHoverValue] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    setSelectedRating(+rating);
    setRatingHoverValue(+rating);
  }, [rating]);

  const highlightRatings = (e) => {
    const { value = 0 } = e.currentTarget.dataset;
    setRatingHoverValue(+value);
  };

  const selectRating = e => {
    const { value = 0 } = e.currentTarget.dataset;
    setSelectedRating(+value);
    onSelectRating(e, +value);
  };

  const hideHighlights = () => {
    setRatingHoverValue(selectedRating);
  };

  const createRatingBlocks = () =>
    range(0, max).map((r, i) => {
      const isSelected = ratingHoverValue ? ratingHoverValue >= i + 1 : selectedRating >= i + 1;
      return (
        <div
          className={`rating${isSelected ? ' hovered' : ''}`}
          key={i}
          data-value={i + 1}
          onMouseOver={highlightRatings}
          onClick={selectRating}
        />
      )
    });

  return (
    <div className="RatingBar" onMouseLeave={hideHighlights}>
      {createRatingBlocks()}
    </div>
  );
}

RatingBar.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.number,
  onSelectRating: PropTypes.func.isRequired,
};

export default RatingBar;
