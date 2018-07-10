import { counter } from '../reducers';
import chai from 'chai';

let expect = chai.expect;

describe('todos reducer', () => {
  it('should return the initial state', () => {
    // expect({a: 1}).to.deep.equal({a: 1});

    expect(counter(undefined, {})).to.deep.equal(
      {
        counter: 0,
        currentPlayerId: 1,
        players: [
          {
            id: 1,
            dead: false,
            holdingCards: [],
            playedCards: []
          },
          {
            id: 2,
            dead: false,
            holdingCards: [],
            playedCards: []
          },
          {
            id: 3,
            dead: false,
            holdingCards: [],
            playedCards: []
          },
          {
            id: 4,
            dead: false,
            holdingCards: [],
            playedCards: []
          }
        ],
        availableCards: {
          'Guard': 5,
          'Priest': 2,
          'Baron': 2,
          'Handmaid': 2,
          'Prince': 2,
          'King': 1,
          'Countess': 1,
          'Princess': 1,
        },
        gameEnds: {
          winner: null
        }
      }
    );
  })
});



// import reducer from '../../reducers/todos';
// import * as types from '../../constants/ActionTypes';
// describe('todos reducer', () => {
//   it('should return the initial state', () => {
//     expect(reducer(undefined, {})).toEqual([
//       {
//         text: 'Use Redux',
//         completed: false,
//         id: 0
//       }
//     ])
//   })
// ​
//   it('should handle ADD_TODO', () => {
//     expect(
//       reducer([], {
//         type: types.ADD_TODO,
//         text: 'Run the tests'
//       })
//     ).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 0
//       }
//     ])
// ​
//     expect(
//       reducer(
//         [
//           {
//             text: 'Use Redux',
//             completed: false,
//             id: 0
//           }
//         ],
//         {
//           type: types.ADD_TODO,
//           text: 'Run the tests'
//         }
//       )
//     ).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 1
//       },
//       {
//         text: 'Use Redux',
//         completed: false,
//         id: 0
//       }
//     ])
//   })
// })