const API_BASE_URL = 'http://localhost:5000';

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Something went wrong');
  }
  return response.json();
}

export async function fetchMovies() {
  try {
    const response = await fetch(`${API_BASE_URL}/movies`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    throw error;
  }
}

export async function fetchMovie(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch movie with id ${id}:`, error);
    throw error;
  }
}

export async function addMovie(movie) {
  try {
    const response = await fetch(`${API_BASE_URL}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to add movie:', error);
    throw error;
  }
}

export async function updateMovie(id, movie) {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to update movie with id ${id}:`, error);
    throw error;
  }
}

export async function deleteMovie(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete movie');
    }
  } catch (error) {
    console.error(`Failed to delete movie with id ${id}:`, error);
    throw error;
  }
}

export async function fetchReviews() {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    throw error;
  }
}

export async function addReview(review) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to add review:', error);
    throw error;
  }
}

export async function updateReview(id, review) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to update review with id ${id}:`, error);
    throw error;
  }
}

export async function deleteReview(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete review');
    }
  } catch (error) {
    console.error(`Failed to delete review with id ${id}:`, error);
    throw error;
  }
}
