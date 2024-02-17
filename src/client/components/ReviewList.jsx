function ReviewList({ reviews }) {
  return (
    <div className="review-list">
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index} className="review-item">
            <h4>{review.title}</h4>
            <p>Stars: {review.stars}</p>
            <p>{review.description}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
