##Requirements Format
* Feature
  * Task
    * User Story

##Project Reqirements New
* Web pages and basic validation
  * There should be a front page that all users can see. __Testable__ __High Priority__
  * There should be a sign up page for users to create an account. __Testable__ __High Priority__
  * There should be a login page for users to be able to login. __Testable__ __High Priority__
  * No one can use the system if they are not logged in. __Testable__ __High Priority__

* Post Creation
  * My posts can't be more than 160 characters. __Testable__ __Low Priority__
    * As the Message Reader, I hate reading alot of text because it is boring.
  * I can attach images no greater than 1024x512 to my posts. __Testable__ __Medium Priority__
    * As the Message Creator, I would like use images in message because they have more information and I want to express my creative side.
    * As the Message Reader, I would like to see images in messages because text only posts are boring.
  * Posts can have hashtags in them. Atleast 0 hashtags. __Testable__ __High Priority__
    * As the Message Creator, I want posts to have hashtags so my messages can be easily found.
    * As the Message Reader, I want to search for messages by hashtags to help me find messages that I like.

* Post Sharing
  * Posts can have an optional start time for displaying posts. __Testable__ __Medium Priority__
    * As the Message Creator, I want to choose a time for posts to be seen because sometimes I think of stuff to say for certain events and times of the day.
  * If my post contains an optional start time, it becomes viewable once the start time has elapsed. Otherwise it becomes viewable immediately. __Testable__ __Medium Priority__
  * I can assign an optional stop time for displaying my posts. __Testable__ __Medium Priority__
    * As the Message Creator, I do not want everything I say to be connected back to me because sometimes I may say things that create trouble.
  * Posts with a stop time should become hidden once the stop time has elapsed. Otherwise it can be seen forever. __Testable__ __Medium Priority__
  * Posts can be shared anonymously. __Low Priority__
    * As the Message Creator, I want to make anonymous messages because sometimes I don't want words to be connected back to me.
    * As the Message Reader, I want anonymous posts because sometimes I don't want to know who wrote those words.

* Buckets
  * Organize posts in collections of related material called buckets. __High Priority__
  * The front page has atleast 1 bucket that all users can see. This is the "Lastest Posts" bucket. __Testable__ __Low Priority__
  * I can specify which buckets I prefer to see on my front page. __Low Priority__
  * The most recent post is displayed first in a bucket. __Testable__ __Low Priority__
    * As the Message Reader, I want the most recent messages first in a bucket because sometimes the current messages are the only fun ones.
  * Buckets re-populate with posts every 5 seconds and a water drop animation happens at the same time. __Testable__ __Low Priority__

* Log in and account creation
  * I would like to use my facebook or google account to login. __Testable__ __Low Priority__
    * As the User, I would like to use my facebook or google account to login because I won't need to remember any more passwords.
    * As the system, I would like users to login with another service because managing user accounts is painful.
    * As the coder, I would like users to login with another service because this way I do not have to worry about account creation, validation, security, account recovery, and possibly account deletion.