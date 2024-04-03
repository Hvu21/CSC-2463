// Digital I/O Assignment One
// This code will blink 
// "HELLO" when button 1 is pressed 
// "BYE" when button 2 is pressed
// Adjustments to the timing or pattern can be made as needed.

int buttonPin1 = 2; // Button 1 connected to digital pin 2
int buttonPin2 = 4; // Button 2 connected to digital pin 4
int ledPin1 = 12;   // LED 1 connected to digital pin 12
int ledPin2 = 13;   // LED 2 connected to digital pin 13

int buttonState1 = 0; // variable for storing the button state 1
int buttonState2 = 0; // variable for storing the button state 2

void setup() {
  pinMode(ledPin1, OUTPUT); // sets the LED pin as an output
  pinMode(ledPin2, OUTPUT); // sets the LED pin as an output
  pinMode(buttonPin1, INPUT); // sets the button pin as an input
  pinMode(buttonPin2, INPUT); // sets the button pin as an input
}

void loop() {
  // Read the state of the buttons
  buttonState1 = digitalRead(buttonPin1);
  buttonState2 = digitalRead(buttonPin2);

  // If button 1 is pressed, blink "HELLO" in Morse code
  if (buttonState1 == HIGH) {
    blinkHELLO();
  }

  // If button 2 is pressed, blink "BYE" in Morse code
  if (buttonState2 == HIGH) {
    blinkBYE();
  }
}

// Function to blink LED a certain number of times
void blinkLED(int pin, int times) {
  for (int i = 0; i < times; i++) {
    digitalWrite(pin, HIGH); // turn the LED on
    delay(500);              // wait for 500ms
    digitalWrite(pin, LOW);  // turn the LED off
    delay(500);              // wait for 500ms
  }
}

// Function to blink "HELLO" in Morse code
void blinkHELLO() {
  // H
  blinkLED(ledPin1, 4);
  delay(500);
  blinkLED(ledPin1, 4);
  delay(1500);

  // E
  blinkLED(ledPin1, 1);
  delay(500);

  // L
  blinkLED(ledPin1, 4);
  delay(500);
  blinkLED(ledPin1, 4);
  delay(1500);

  // L
  blinkLED(ledPin1, 4);
  delay(500);
  blinkLED(ledPin1, 4);
  delay(1500);

  // O
  blinkLED(ledPin1, 3);
  delay(500);
  blinkLED(ledPin1, 3);
  delay(500);
  blinkLED(ledPin1, 3);
  delay(500);
}

// Function to blink "BYE" in Morse code
void blinkBYE() {
  // B
  blinkLED(ledPin2, 3);
  delay(500);
  blinkLED(ledPin2, 3);
  delay(500);
  blinkLED(ledPin2, 3);
  delay(1500);

  // Y
  blinkLED(ledPin2, 3);
  delay(500);
  blinkLED(ledPin2, 1);
  delay(500);
  blinkLED(ledPin2, 3);
  delay(500);
  blinkLED(ledPin2, 3);
  delay(1500);

  // E
  blinkLED(ledPin2, 1);
  delay(500);
}
