#if 1
#include "Arduino.h"

#include"GarageHardware.h"


//initilize const variables for where things are

const int togDoor = D6;
const int upSense = D1;
const int downSense = D2;
const int fault = D3;
const int closing = D4;
const int opening = D5;
const int light = D0;
/**
 * Setup the door hardware (all I/O should be configured here)
 *
 * This routine should be called only once from setup()
 */
void setupHardware() {
  // TODO
  pinMode(togDoor, INPUT_PULLDOWN);
  pinMode(upSense, INPUT_PULLDOWN);
  pinMode(downSense, INPUT_PULLDOWN);
  pinMode(fault, INPUT_PULLDOWN);
  pinMode(closing, OUTPUT);
  pinMode(opening, OUTPUT);
  pinMode(light, OUTPUT);
}

/**
 * Return true if the door open/close button is pressed
 *
 * Note: this is directly based on hardware.  No debouncing or
 *       other processing is performed.
 *
 * return  true if buttons is currently pressed, false otherwise
 */
boolean isButtonPressed() {

  if(digitalRead(togDoor)){
    return true;
  }
  else{
    return false;
  }
}

/**
 * Return true if the door is fully closed
 *
 * Note: This is directly based on hardware.  No debouncing or
 *       other processing is performed.
 *
 * return  true if the door is completely closed, false otherwise
 */
boolean isDoorFullyClosed() {

  if(digitalRead(downSense)){
    return true;
  }
  else{
    return false;
  }

}

/**
 * Return true if the door has experienced a fault
 *
 * Note: This is directly based on hardware.  No debouncing or
 *       other processing is performed.
 *
 * return  true if the door is has experienced a fault
 */
boolean isFaultActive() {
  if(digitalRead(fault)){
    return true;
  }
  else{
    return false;
  }
}

/**
 * Return true if the door is fully open
 *
 * Note: This is directly based on hardware.  No debouncing or
 *       other processing is performed.
 *
 * return  true if the door is completely open, false otherwise
 */
boolean isDoorFullyOpen() {
  if(digitalRead(upSense)){
    return true;
  }
  else{
    return false;
  }

}

/**
 * This function will start the motor moving in a direction that opens the door.
 *
 * Note: This is a non-blocking function.  It will return immediately
 *       and the motor will continue to opperate until stopped or reversed.
 *
 * return void
 */
void startMotorOpening() {
  digitalWrite(opening, HIGH);
}

/**
 * This function will start the motor moving in a direction closes the door.
 *
 * Note: This is a non-blocking function.  It will return immediately
 *       and the motor will continue to opperate until stopped or reversed.
 *
 * return void
 */
void startMotorClosing() {
  digitalWrite(closing, HIGH);
}

/**
 * This function will stop all motor movement.
 *
 * Note: This is a non-blocking function.  It will return immediately.
 *
 * return void
 */
void stopMotor() {
  digitalWrite(closing, LOW);
  digitalWrite(opening, LOW);
}

/**
 * This function will control the state of the light on the opener.
 *
 * Parameter: on: true indicates the light should enter the "on" state;
 *                false indicates the light should enter the "off" state
 *
 * Note: This is a non-blocking function.  It will return immediately.
 *
 * return void
 */
void setLight(boolean on) {
  digitalWrite(light, on);
}

/**
 * This function will control the state of the light on the opener.
 *
 * Parameter: cycle (0-100).  0 indicates completely Off, 100 indicates completely on.
 *            intermediate values are the duty cycle (as a percent)
 *
 * Note: This is a non-blocking function.  It will return immediately.
 *
 * return void
 */
void setLightPWM(int cyclePct) {
  // TODO
  analogWrite(light, cyclePct);
}

/**
 * This function will send a debugging message.
 *
 * Parameter: message. The message (no more tha 200 bytes)

 * Note: This is a non-blocking function.  It will return immediately.
 *
 * return void
 */
void sendDebug(String message) {
  // TODO
  Serial.print(message);
}

#endif
