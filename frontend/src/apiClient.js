const API_BASE_URL = 'http://localhost:3000';

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Something went wrong');
  }
  return response.json();
}

export async function fetchBars() {
  try {
    const response = await fetch(`${API_BASE_URL}/bars`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch bars:', error);
    throw error;
  }
}

export async function fetchBar(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/bars/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch bar with id ${id}:`, error);
    throw error;
  }
}

export async function addBar(bar) {
  try {
    const response = await fetch(`${API_BASE_URL}/bars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bar)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to add bar:', error);
    throw error;
  }
}

export async function updateBar(id, bar) {
  try {
    const response = await fetch(`${API_BASE_URL}/bars/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bar)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to update bar with id ${id}:`, error);
    throw error;
  }
}

export async function deleteBar(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/bars/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete bar');
    }
  } catch (error) {
    console.error(`Failed to delete bar with id ${id}:`, error);
    throw error;
  }
}

export async function fetchBieres() {
  try {
    const response = await fetch(`${API_BASE_URL}/bieres`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch bieres:', error);
    throw error;
  }
}

export async function fetchBiere(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/bieres/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch biere with id ${id}:`, error);
    throw error;
  }
}

export async function addBiere(biere) {
  try {
    const response = await fetch(`${API_BASE_URL}/bieres`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(biere)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to add biere:', error);
    throw error;
  }
}

export async function updateBiere(id, biere) {
  try {
    const response = await fetch(`${API_BASE_URL}/bieres/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(biere)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to update biere with id ${id}:`, error);
    throw error;
  }
}

export async function deleteBiere(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/bieres/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete biere');
    }
  } catch (error) {
    console.error(`Failed to delete biere with id ${id}:`, error);
    throw error;
  }
}

export async function fetchCommandes() {
  try {
    const response = await fetch(`${API_BASE_URL}/commandes`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch commandes:', error);
    throw error;
  }
}

export async function fetchCommande(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/commandes/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch commande with id ${id}:`, error);
    throw error;
  }
}

export async function addCommande(commande) {
  try {
    const response = await fetch(`${API_BASE_URL}/commandes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commande)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to add commande:', error);
    throw error;
  }
}

export async function updateCommande(id, commande) {
  try {
    const response = await fetch(`${API_BASE_URL}/commandes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commande)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to update commande with id ${id}:`, error);
    throw error;
  }
}

export async function deleteCommande(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/commandes/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete commande');
    }
  } catch (error) {
    console.error(`Failed to delete commande with id ${id}:`, error);
    throw error;
  }
}

export async function fetchBieresCommandes() {
  try {
    const response = await fetch(`${API_BASE_URL}/biere_commande`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch bieres commandes:', error);
    throw error;
  }
}

export async function fetchBiereCommande() {
  try {
    const response = await fetch(`${API_BASE_URL}/biere_commandes`); // Mise à jour de l'URL
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch bieres commandes:', error);
    throw error;
  }
}

// Correction de l'URL pour addBiereToCommande
export async function addBiereToCommande(commandeId, biereId) {
  try {
    const response = await fetch(`${API_BASE_URL}/biere_commandes/commandes/${commandeId}/bieres/${biereId}`, { // Mise à jour de l'URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commande_id: commandeId, biere_id: biereId })
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to add biere to commande:', error);
    throw error;
  }
}
export async function updateBiereCommande(id, biere_commandes) {
  try {
    const response = await fetch(`${API_BASE_URL}/biere_commandes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commande)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to update commande with id ${id}:`, error);
    throw error;
  }
}

// Correction de l'URL pour removeBiereFromCommande
export async function removeBiereFromCommande(biereCommandeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/biere_commandes/${biereCommandeId}`, { // Mise à jour de l'URL
      method: 'DELETE'
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to remove biere from commande');
    }
  } catch (error) {
    console.error(`Failed to remove biere from commande with id ${biereCommandeId}:`, error);
    throw error;
  }
}

// Correction de l'URL pour deleteBiereFromCommande
export async function deleteBiereFromCommande(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/biere_commandes/${id}`, { // Mise à jour de l'URL
      method: 'DELETE'
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete biere from commande');
    }
  } catch (error) {
    console.error(`Failed to delete biere from commande with id ${id}:`, error);
    throw error;
  }
}