# Checkers project by Alex Moiseenko

Checkers is played by two people, on opposite sides of a playing board, alternating moves. One player has dark pieces, and the other has light pieces. Pieces move diagonally and pieces of the opponent are captured by jumping over them.

The piece can have 2 states:
* Men. Men move forward diagonally to an adjacent unoccupied square.
* Kings. If a player's piece moves into the kings row on the opposing player's side of the board, that piece is to be "crowned", becoming a "king" and gaining the ability to move backwards as well as forwards and to choose on which free square on this diagonal to stop.

The rules of checkers are:
1. A simple piece can move forward, only one square diagonally.
2. The King can move diagonally to any free square, backward or forward.
3. Captured pieces must be removed after the completion of the move.
4. If the next square to an adjacent enemy’s piece is empty, then the capture is allowed. To capture it, you have to jump over it and remove it from the game.
5. If after capturing an enemy’s piece you still have an allowed a jumps move then you must continue the jump sequence (jump is mandatory).
6. The jump with a simple piece is done both forward and backward.
7. The king jump diagonally, both forward and backward.
8. When a simple piece reaches the final line of the enemy’s side, it become king and will be crowned.
9. In a multi-jump move, the opponent’s piece can be captured only once.
10. With more than one capture options, the player is free to choose which one to take.

## How to start the project

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
