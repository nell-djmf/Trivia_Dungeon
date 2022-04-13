# **Trivia Dungeon**

## **Premise**
You find yourself at the bottom of a dark dungeon, populated by rabid beasts (who happen to be trivia fans). Proceed through the dungeon, answering questions to make it out alive!



![A dark and mysterious dungeon...](https://i.imgur.com/rm0HaZQ.jpg)

***

## **Gameplay**
The game lasts a total of 10 rounds, with each round including a question phase, and a trap phase if you answer incorrectly.

***
### **Trap Room**
Traps are the penalty phase for a wrong answer. You will be presented with a series of items, most with a penalty, and one safe item that will bring you back to the answer phase.


### **Item List:**
- **[Just a rock]** Safe item
- **[Tonic of Forgetfulness]** Remove a random answer choice for 3 rounds. This may include the correct answer.
- **[Energy Dampening Cloak]** Forfeit your powers for 3 rounds
- **[Poison-coated Goblet]** Deal 5 damage per round for 3 rounds

***

### **HP**
Players start with 100 HP. For an incorrect answer, the encounter will inflict 10 damage. Reaching 0 will kill the player, ending the game. 
![Keep your HP above 0!](https://i.stack.imgur.com/vBDSE.png)

***

### **Powers**
Powers may be used at the start of a phase. Number of uses vary per player class.

***

![class selection](https://i.imgur.com/r4aT9zF.png)

## **Classes**
Classes are grouped into two categories: Light and Dark.
- Light-attuned classes have powers that affect the question phase or the player directly
- Dark-attuned classes have powers that influence the trap phase

Choose your toolkit carefully! Your powers may be the difference between life and death.

| Class Name | Type | Uses | Power |
| -------------- | -------------- | -------------- | -------------- |
| **🛡️ Paladin** | Light | 3 | **[Divine Blessing]** Pray to the gods for guidance and omit 2 wrong answers |
| **🏹 Archer** | Light | 2 | **[Lightning Reflexes]** Evade a monster to skip a question entirely |
| **🗡️ Rogue** | Dark | 3 | **[Trap Sense]** Use your uncanny intuition to narrow down item choices to 1 safe item, 1 cursed |
| **🪄  Wizard** | Dark | 2 | **[Chronomancer]** Alter time to skip 1 trap phase, with no item penalty |


***

### **Ideas for Features to be Added**

**[Trello Board](https://trello.com/b/3VNz8LRb/trivia-dungeon)**

- [ ] More traps!
- [ ] Trap room element randomizer
- [ ] Game Progression converted to game board
- [ ] Dice rolls for moves along game board
- [ ] Trap spaces, Power-up spaces
- [ ] Passive bonuses for classes
- [ ] Trap and question phase power for all classes
- [ ] Multiplayer

***
### **Known Bugs:**

- *If questions aren't being fetched, it means I need to get a new link from the API. I believe they expire after a certain amount of time*

- *Rarely, the Tonic of Forgetfulness will not remove random answers. I have not been able to replicate this reliably.*

- *Answering incorrectly still triggers a new question (not visible because of trap room). Removing the new question function call from `phaseCheck()` breaks the game*

- *If you give an incorrect answer that kills you, the traps still show before starting a new game*


***

## **Credits:**

Class & Trap Icons (Game): [openmoji](https://openmoji.org/library/)

Class Icons (Readme): [github](https://github.com/ikatyang/emoji-cheat-sheet)

Background Images: [imgur album](https://imgur.com/a/ppH2Y) from the game [Darkest Dungeon](https://www.darkestdungeon.com/)

Image Hosting: [svgur](https://svgur.com/) [imgur](https://imgur.com/)

Trivia Questions: [Open Trivia Database](https://opentdb.com/)

Tools for Colors: [HEX codes](https://htmlcolorcodes.com/) [HEX to RGBA](https://rgbacolorpicker.com/hex-to-rgba)

HTML Element Shuffle (used in game.js, line 96): [StackOverflow](https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order)


