import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY, getInitData } from './_DATA';

export function fetchDeckList() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(getInitData)
}

export function getAllDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
      if(result !== null) {
        return JSON.parse(result) 
      } else {
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(getInitData));
        return getInitData;
      }
    });
  }
  

export function removeDeck(key) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        })
}

export function submitDeck({ deck, key}){
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [key]: deck,
    }))
  }

export function addCardToDeck(title, card) {
    return getAllDecks()
      .then((decks) => {
        decks[title].questions.push(card);
        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
      });
  }