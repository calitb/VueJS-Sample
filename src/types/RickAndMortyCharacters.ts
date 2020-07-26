/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RickAndMortyCharacters
// ====================================================

export interface RickAndMortyCharacters_characters_info {
  /**
   * Number of the next page (if it exists)
   */
  next: number | null;
}

export interface RickAndMortyCharacters_characters_results {
  /**
   * The id of the character.
   */
  id: string | null;
  /**
   * The name of the character.
   */
  name: string | null;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image: string | null;
}

export interface RickAndMortyCharacters_characters {
  info: RickAndMortyCharacters_characters_info | null;
  results: (RickAndMortyCharacters_characters_results | null)[] | null;
}

export interface RickAndMortyCharacters {
  /**
   * Get the list of all characters
   */
  characters: RickAndMortyCharacters_characters | null;
}

export interface RickAndMortyCharactersVariables {
  page?: number | null;
}
