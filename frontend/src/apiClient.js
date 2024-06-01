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
    const response = await fetch(`${API_BASE_URL}/bars/:id/bieres/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(biere)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to add bieres:', error);
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
    // Récupérer les détails de la bière associée à la commande
    const biereDetails = await fetchBiere(commande.biere_id);
    if (!biereDetails) throw new Error('Invalid beer ID');
    const bierePrice = biereDetails.price;

    // Mettre à jour le prix de la bière dans la commande
    commande.price = bierePrice;

    // Envoyer la commande au serveur
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
    // Récupérer les détails de la bière associée à la commande
    const biereDetails = await fetchBiere(commande.biere_id);
    const bierePrice = biereDetails.price;

    // Mettre à jour le prix de la bière dans la commande
    commande.price = bierePrice;

    // Envoyer la commande mise à jour au serveur
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

// Fonction pour récupérer la liste des bieresCommandes
export const fetchBieresCommandes = async () => {
  const response = await fetch('/biere_commande');
  if (!response.ok) {
      throw new Error('Failed to fetch bieresCommandes');
  }
  return await response.json();
};

// Fonction pour ajouter une bière à une commande
export const addBiereToCommande = async (commandeId, biereId) => {
  const response = await fetch(`/biere_commande/commandes/${commandeId}/bieres/${biereId}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
  });
  if (!response.ok) {
      throw new Error('Failed to add biere to commande');
  }
  return await response.json();
};

// Fonction pour supprimer une bière d'une commande
export const removeBiereFromCommande = async (id) => {
  const response = await fetch(`/biere_commande/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
  });
  if (!response.ok) {
      throw new Error('Failed to remove biere from commande');
  }
};
