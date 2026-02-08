// get route route for submitting new words
import pg from 'pg';
import axios from 'axios';
const { Pool } = pg;
import keys from '../config/keys.js';
import requireLogin from '../middlewares/requireLogin.js';
import requireCredits from '../middlewares/requireCredits.js';

import OpenAI from "openai";
import similarity from 'compute-cosine-similarity';

const pgPool = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

const opeanai = new OpenAI({
    apiKey: keys.openAPIKEY
});

async function getEmbeddings(inputted_word) {
const embedding =  await opeanai.embeddings.create({
    model: "text-embedding-3-small",
    input: inputted_word,
    encoding_format: "float"
});

return(embedding.data[0].embedding)
}

export default function wordRoutes(app) {

// user's actual book vocabulary
  app.get('/api/words', requireLogin, async (req, res) => {
    try {
      const words = await pgPool.query(
        'SELECT * FROM word WHERE user_id = $1',
        // 'SELECT * FROM word join definition_word ON word.id = definition_word.word_id WHERE user_id = $1',
        [req.user.id]
      );
      res.json(words.rows);
    } catch (error) {
      res.status(500).send({ success: false, error: error.message });
    }
  });


// RANDOM words based on easy difficulty
app.get('/api/ran', async (req, res) => {
  try {
    const difficulty = req.query.difficulty || "easy"
      const result = await pgPool.query(
      'SELECT * FROM ran_words WHERE difficulty_type = $1',
      // 'SELECT * FROM word join definition_word ON word.id = definition_word.word_id WHERE user_id = $1',
      [difficulty])
    res.json(result.rows);
    } catch (error) {
      res.status(500).send({ success: false, error: error.message });
    }
  });  


// async function getCurrentUserWords(googleId) {
//   const res = await pgPool.query(
//     'SELECT word.* FROM word JOIN user ON word.user_id = user.id WHERE user.google_id = $1',
//     [req.user.id]
//   );
//   console.log(res.rows);
// }



// post function
async function getSynonymsThesaurus(unknown_word) {
  try {
    const response = await axios.get(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${unknown_word}?key=${keys.api_key_thesauraus}`);
    const type_word = response.data[0].meta.fl
    console.log('heres the thesauraus', response)
    console.log('synonyms are here', response.data[0].meta.syns[0])
    console.log('short def is here',response.data[0].shortdef[0])
    console.log('def array', response.data[0].def[0].sseq[0][0][1].dt[0])
    const synonym_list = response.data[0].meta.syns[0]
    const updated_syonym_list = synonym_list.filter(syns => !syns.includes(" "))
    const short_def_string = response.data[0].shortdef[0]
    // embedding of the actual word
    const actual_word_embed = await getEmbeddings(unknown_word)
    // embedding of the DEFINITION of the actual word
    const embedded_def = await getEmbeddings(short_def_string)
    // console.log('this is the embedding of the DEFINITION', embedded_def)
    let synonym_embedding_array = {}
    const simScoreDef = []
    const simScoreWord = []
    let simScoreDictionaryWord = {}
    let simScoreDictionary = {}
    let average_score_dic = {}
    // inputted word with ALL CONTEXT
    const inputted_word_type =  response.data[0].meta.fl
    const inputted_word_definition = response.data[0].shortdef[0]
    const inputted_word_context = await getEmbeddings(`${unknown_word} with: definition ${inputted_word_definition}, type ${inputted_word_type} `)
    const def_word_embedding = await getEmbeddings(inputted_word_definition)
    
    // embeddings of the SYNONYMS
    let synonym_definition_dictionary = {}
    let cosine_synonym_def_dictionary = {}
    for (const syn of updated_syonym_list) {

        const embedded_syn =  await getEmbeddings(syn)
        synonym_embedding_array[syn] = embedded_syn
    
        // console.log('these are the embeddings of the SYNONYMS', embedded_syn)

        // cosine score bt synonyms and ACTUAL WORD
       const cosineSimilarityWord = similarity(actual_word_embed, embedded_syn)
       simScoreDictionaryWord[syn] = cosineSimilarityWord

        // cosine score bt DEFINITIONS of synonyms and ACTUAL WORD
        // const cosineSimilaritySynDef = similarity(def_word_embedding, embedded_def_syn)
        // cosine_synonym_def_dictionary[syn] = cosineSimilaritySynDef
        


        // simScoreWord.push(cosineSimilarityWord)
        // simScoreWord[syn] = cosineSimilarityWord
        // simScoreWord.push(cosineSimilarityWord)
     
        // cosine score bt synonyms and DEFINITION
        // const cosineSimilarityDef = similarity(embedded_def, embedded_syn)
        // console.log('cosine similarity', cosineSimilarityDef)
        // simScoreDictionary[syn] = cosineSimilarityDef
        // average of cosine scores
        // const average_score = embedded_def.map((v,i) => (v+embedded_syn[i])/2)
        // const average_score = (cosineSimilarityWord + cosineSimilarityDef)/2
        // average_score_dic[syn] = average_score
        };
    
    // const highest_average_score = Math.max(...Object.values(average_score_dic))
   
    // console.log(highest_average_score)
    

    
    // find value:
    function getKey(object, value){
        return Object.keys(object).find(key=>object[key] === value)
    } 

     // highest score of WORD
    const highest_score_word = Math.max(...Object.values(simScoreDictionaryWord))
    const key_word = getKey(simScoreDictionaryWord, highest_score_word)
    console.log('HIGHEST  SCORE for that word', highest_score_word, key_word)

  
    // const key = getKey(average_score_dic, highest_average_score)
    // console.log('syn w highest score is', key )
        
    
    // if (response.data.length > 0 && response.data[0].meta) {
    //   return response.data[0].meta.syns[0] ?? [];
    return(key_word)

  } catch (error) {
    console.error('Error fetching synonyms from thesaurus:', error);
    return [];
  }}





  app.post('/api/words', requireLogin, requireCredits, async (req, res) => {
    const { word, title} = req.body; 
    const today = new Date();

    try {
        // get synonyms of the word
      const syn_word = await getSynonymsThesaurus(req.body.word)
      console.log("this is the syn word", syn_word)
      console.log('FIRST syn word in array', syn_word[0])
      

    

     const updated_word = await pgPool.query(
        'INSERT INTO word (user_id, word, title, date_added, synonym) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [req.user.id, word, title, today.toDateString(), syn_word]
      );

    return res.status(201).send({
      newWord: updated_word.rows[0],
      user: updated_user.rows[0]
    }); // send back updated user with reduced credits in the header
    
    } catch (error) {
      res.status(422).send({ success: false, error: error.message }); // 422 means the data sent by the user is invalid
    }
  
   })
  
  // user's actual score
  app.get('/api/overallscore', requireLogin, async (req, res) => {
    try {
      const highest_score = await pgPool.query(
        'SELECT * FROM game_scores WHERE user_id = $1 ORDER BY score DESC, played_at DESC LIMIT 1',
        // 'SELECT * FROM word join definition_word ON word.id = definition_word.word_id WHERE user_id = $1',
        [req.user.id]
      );
      res.json(highest_score.rows);
    } catch (error) {
      res.status(500).send({ success: false, error: error.message });
    }
  });

  // insert new score
   app.post('/api/overallscore', requireLogin, requireCredits, async (req, res) => {
    const { difficulty, score} = req.body; 
    const today = new Date();

    try {


     const updated_score = await pgPool.query(
        'INSERT INTO game_scores (user_id, difficulty, score, played_at) VALUES ($1, $2, $3, $4) RETURNING *',
        [req.user.id, difficulty, score, today.toDateString()]
      );

      req.user.credits -= 1;

      const updated_user = await pgPool.query(
        'UPDATE users SET credits = $1 WHERE id = $2 RETURNING *',
        [req.user.credits, req.user.id]
      );
    return res.status(201).send({
      newScore: updated_score.rows[0],
      user: updated_user.rows[0]
    }); // send back updated user with reduced credits in the header
    
    } catch (error) {
      res.status(422).send({ success: false, error: error.message }); // 422 means the data sent by the user is invalid
    }
  
   })
  
  
  
  
  
  
  }


  



