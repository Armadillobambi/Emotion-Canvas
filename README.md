# Emotion *Canvas*

### Description

**Emotion *Canvas*** is an interactive environment where a program creates an artwork using the color of the emotions that it analyses from your input. The work is an example of how AI and humans can work together in creating meaningful art.

### Features

The program's frontend is created using the P5 library in Javascript. It uses the Web Speech API to record and store user input and a perlussian noise generator to generate the visuals on the screen. 
It sends this input to a server file made in Python, which uses a RoBERTa model to perform sentiment analysis and assign it a color and appropriate music. 
This is then relayed back to the script file that changes the color of the noise into the emotion it receives.

### Setup instructions

In order to run the program, the server.py file should first be run. After that's up, open the home.html using a live server, after which you can use the program as intended. 
**Important to note:** You should open the live server in Google Chrome, otherwise the Web Speech API will block the program from running appropriately.

### Example


### Contact

Pjotrjacobstraathof@gmail.com
