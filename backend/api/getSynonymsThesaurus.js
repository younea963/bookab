// generate most appropriate synonyms for a given word
import axios from 'axios';
import keys from '../config/keys.js';

const api_key_thesauraus = keys.apiKeyThesauraus
export async function getSynonymsThesaurus(unknown_word) {
  try {
    const response = await axios.get(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${unknown_word}?key=${api_key_thesauraus}`);
    if (response.data.length > 0 && response.data[0].meta) {
      return response.data[0].meta.syns.flat();
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching synonyms from thesaurus:', error);
    return [];
  }
}   


// export async function getSynonyms(word) {
//   try {
//     const response = await axios.get(`https://api.datamuse.com/words?rel_syn=${word}`);
//     return response.data.map(entry => entry.word);
//   } catch (error) {
//     console.error('Error fetching synonyms:', error);
//     return [];
//   }
// }   