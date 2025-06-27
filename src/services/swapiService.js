import axios from "axios";

const API_URL = "https://swapi.py4e.com/api";
export const getCharacters = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/people/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching characters", error);
    throw error;
  }
};
export const getCharacter = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/people/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching character", error);
    throw error;
  }
};
export const getPlanets = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/planets/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching planets:", error);
    throw error;
  }
};
export const getPlanet = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/planets/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching planet with ID ${id}:`, error);
    throw error;
  }
};
export const getStarships = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/starships/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching starships:", error);
    throw error;
  }
};
export const getStarship = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/starships/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching starship with ID ${id}:`, error);
    throw error;
  }
};