module.exports = [
  {
    postText: "This is a post to #test the functionality#of this #1 system.",
    startTime: Date.now(),
    stopTime: (Date.now() + 100000),
    anonymous: false
  },
  {
    postText: "Another example of a #wonderful #post.",
    startTime: Date.now(),
    stopTime: (Date.now() + 100000),
    anonymous: false
  },
  {
    postText: "This #wonderful post will add a #second wonderful tag.",
    startTime: Date.now(),
    stopTime: (Date.now() - 100000),
    anonymous: false
  },
  {
    postText: "But this #post will #check for #additional posts.",
    startTime: Date.now(),
    stopTime: (Date.now() + 100000),
    anonymous: false
  },
  {
    postText: "But we can #throw other #examples in.",
    startTime: Date.now(),
    stopTime: (Date.now() + 100000),
    anonymous: false
  },
  {
    postText: "Another example of a #wonderful #post.",
    startTime: (Date.now() + 100000),
    stopTime: (Date.now() + 200000),
    anonymous: false
  }
];
