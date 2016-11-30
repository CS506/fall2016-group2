##Requirements Format
* Feature
  * Task
    * User Story

##Project Requirements

* Application runs on Amazon Webservice Servers. __High Priority__

* Views
  * There is a front page that all users can see. This page has buckets and posts that the user likes to view. __Testable__ __Complete__
  * There is a sign up page for users to create an account. __Testable__ __Complete__
  * There is a login page for users to be able to login. __Testable__ __Complete__
  * There is a pop up for a user to create a new posts. __Testable__ __Complete__
  * There is a profile page for each user. __Testable__ __Low Priority__
  * The user profile page shows their username and an email. __Testable__ __Low Priority__
  * The user profile page shows a single link to facebook profile if their facebook is connected and a single link to google+ profile if their google account is connected. __Testable__ __Low Priority__

* Validation
  * The user should be able to logout after they login. __Testable__ __Complete__
  * If the user is not logged in then no one can use the application. __Testable__ __Complete__

* Post Creation
  * A post cannot be more than 160 characters. __Testable__ __Complete__
    * As the Message Reader, I hate reading alot of text because it is boring.
  * I can put images in posts. Image size cannot be bigger than 1024x512. __Testable__ __Medium Priority__
    * As the Message Creator, I would like use images in message because they have more information and I want to express my creative side.
    * As the Message Reader, I would like to see images in messages because text only posts are boring.
  * Posts can have hashtags in them. Atleast 0 hashtags. __Testable__ __Complete__
    * As the Message Creator, I want posts to have hashtags so my messages can be easily found.
    * As thed Message Reader, I want to search for messages by hashtags to help me find messages that I like.

* Post Sharing
  * Posts can have an optional start time for displaying posts. __Testable__ __Complete__
    * As the Message Creator, I want to choose a time for posts to appear because sometimes I think of stuff to say for certain moments in the day.
  * If my post contains an optional start time, it becomes viewable once the start time has elapsed. Otherwise it becomes viewable immediately. __Testable__ __Medium Priority__
  * I can assign an optional stop time for displaying my posts. __Testable__ __Complete__
    * As the Message Creator, I do not want everything I say to linked to me because sometimes I may say things that create trouble.
  * Posts with a stop time should become hidden once the stop time has passed. Otherwise the post is shown forever. __Testable__ __Medium Priority__
  * Posts can be shared anonymously. __High Priority__
    * As the Message Creator, I want to make anonymous messages because sometimes I don't want words linked to me.
    * As the Message Reader, I want anonymous posts because sometimes I don't want to know who wrote those words.

* Buckets
  * Organize posts in collections of related material called buckets. __Complete__ 
  * The front page has atleast 1 bucket that all users can see. This is the "Lastest Posts" bucket. __Testable__ __Complete__
  * I can specify which buckets I prefer to see on my front page. __Low Priority__
  * The most recent post is displayed first in a bucket. __Testable__ __Complete__
    * As the Message Reader, I want the most recent messages first in a bucket because sometimes the current messages are the only fun ones.
  * There is a button on each bucket to refreshes the bucket with new posts. __Testable__ __Low Priority__
  * When a bucket is clicked, a single pop up appears that shows recent posts in the bucket. __Testable__ __Medium Priority__
  * When mouse hovers over a bucket, the bucket is scaled up in size. __Complete__

* Log in and account creation
  * I would like to use my facebook account to login. __Testable__ __Complete__
    * As the User, I would like to use my facebook or google account to login because I won't need to remember any more passwords.
    * As the system, I would like users to login with another service because it sucks to manage user accounts.
    * As the coder, I would like users to login with another service because this way I do not need to think about account validation and security.
  * I would like to use my facebook account to signup. __Testable__ __Complete__
    * As the User, I would like to use my facebook or google account to signup because filling out forms is annoying.
    * As The system, I would like users to sign up with another service because organizing account information takes alot of storage and processing time.
    * As the code, I would like users to signup with another service because this way I do not need to think about account creation, recovery, and possibly account deletion.