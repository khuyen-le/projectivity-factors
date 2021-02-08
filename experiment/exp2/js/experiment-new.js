function make_slides(f) {
  var slides = {};

  slides.prolificID = slide ({
      name: "prolificID", 
      start: function() {
      },
      button: function () {
          exp.prolificID = document.getElementById("prolificID_box").value;
          console.log(prolificID); 
          exp.data_trials.push({
            "slide_number_in_experiment": exp.phase,
            "rt": 0,
            "response": exp.prolificID
        });
        exp.go();
      }
  });
    
  slides.bot = slide({
    name: "bot",
    start: function () {
      $('.err1').hide();
      $('.err2').hide();
      $('.disq').hide();
      exp.speaker = _.shuffle(["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"])[0];
      exp.listener = _.shuffle(["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Margaret"])[0];
      exp.lives = 0;
      var story = exp.speaker + ' says to ' + exp.listener + ': "It\'s a beautiful day, isn\'t it?"'
      var question = 'Who does ' + exp.speaker + ' talk to?';
      document.getElementById("s").innerHTML = story;
      document.getElementById("q").innerHTML = question;
    },
    button: function () {
      exp.text_input = document.getElementById("text_box").value;
      var lower = exp.listener.toLowerCase();
      var upper = exp.listener.toUpperCase();

      if ((exp.lives < 3) && ((exp.text_input == exp.listener) | (exp.text_input == lower) | (exp.text_input == upper))) {
        exp.data_trials.push({
          "slide_number_in_experiment": exp.phase,
          "utterance": "bot_check",
          "object": exp.listener,
          "rt": 0,
          "response": exp.text_input
        });
        exp.go();
      }
      else {
        exp.data_trials.push({
          "slide_number_in_experiment": exp.phase,
          "utterance": "bot_check",
          "object": exp.listener,
          "rt": 0,
          "response": exp.text_input
        });
        if (exp.lives == 0) {
          $('.err1').show();
        } if (exp.lives == 1) {
          $('.err1').hide();
          $('.err2').show();
        } if (exp.lives == 2) {
          $('.err2').hide();
          $('.disq').show();
          $('.button').hide();
        }
        exp.lives++;
      }
    }

  });

  slides.i0 = slide({
    name: "i0",
    start: function () {
      exp.startT = Date.now();
    }
  });

  slides.instructions = slide({
    name: "instructions",
    present: exp.instructions,
    start: function () {
        var a = 0;
        exp.keyCode = "";

          document.onkeydown = checkKey;
        function checkKey(e) {
            e = e || window.event;
            console.log("key pressed");
           if (e.keyCode == 32) {
              exp.go();
            }
          }
    }
  });

  /*
  slides.demo = slide({
    name: "demo",
    present: exp.stims_demo,
    start: function () {
      $(".err").hide();
    },
    present_handle: function (stim) {
      $('.bar').css('width', ((100 * (exp.phase) / exp.nQs) + "%"));
      this.stim = stim;
      this.stim.trial_start = Date.now();
      $(".err").hide();
      this.init_sliders();
      exp.sliderPost = null;
      console.log(this.stim);

      var utterance = "";

      var sentence = "<strong>" + this.stim.name + " asks:</strong> \"<i>" + this.stim.utterance + "</i>\"";
      $(".sentence").html(sentence);
      $(".utterance").html(utterance);
      var question = "";
      question = "Is " + this.stim.name + " certain that " + this.stim.question + "?";

      $(".question").html(question);
    },

    button: function () {
      console.log(exp.sliderPost);
      if (exp.sliderPost != null) {
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },
    init_sliders: function () {
      utils.make_slider("#single_slider", function (event, ui) {
        exp.sliderPost = ui.value;
      });
    },
    log_responses: function () {
      exp.data_trials.push({

        "slide_number_in_experiment": exp.phase,
        "Word": this.stim.trigger,
        "exp": this.stim.trigger_class,
        "content": this.stim.question,
        "speakerGender": this.stim.gender,
        "utterance": this.stim.utterance,
        "Word": this.stim.Word,
        //"subjectGender": this.stim.gender2,
        "speakerName": this.stim.name,
        //"subjectName": this.stim.name2,
        //"trigger_class": this.stim.trigger_class,   	  
        "response": exp.sliderPost,
        "rt": Date.now() - this.stim.trial_start
      });
    }
  });

  slides.ptrial = slide({
    name: "ptrial",
    present: exp.stims_ptrial,
    start: function () {
      $(".err").hide();
    },
    present_handle: function (stim) {
      $('.bar').css('width', ((100 * (exp.phase) / exp.nQs) + "%"));
      this.stim = stim;
      this.stim.trial_start = Date.now();
      $(".err").hide();
      this.init_sliders();
      exp.sliderPost = null;
      console.log(this.stim);

      var utterance = "";

      var sentence = "<strong>" + this.stim.name + " asks:</strong> \"<i>" + this.stim.utterance + "</i>\"";
      $(".sentence").html(sentence);
      $(".utterance").html(utterance);
      var question = "";
      question = "Is " + this.stim.name + " certain that " + this.stim.question + "?";

      $(".question").html(question);
    },

    button: function () {
      console.log(exp.sliderPost);
      if (exp.sliderPost != null) {
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },
    init_sliders: function () {
      utils.make_slider("#single_slider", function (event, ui) {
        exp.sliderPost = ui.value;
      });
    },
    log_responses: function () {
      exp.data_trials.push({

        "slide_number_in_experiment": exp.phase,
        "Word": this.stim.trigger,
        "exp": this.stim.trigger_class,
        "content": this.stim.question,
        "speakerGender": this.stim.gender,
        "utterance": this.stim.utterance,
        "Word": this.stim.Word,
        //"subjectGender": this.stim.gender2,
        "speakerName": this.stim.name,
        //"subjectName": this.stim.name2,
        //"trigger_class": this.stim.trigger_class,   	  
        "response": exp.sliderPost,
        "rt": Date.now() - this.stim.trial_start
      });
    }
  });
  */
  slides.practice1 = slide({
    name: "practice1",
    present: exp.practice1,
    start: function () {
      $(".err").hide();
    },

    present_handle: function (stim) {
      exp.trial_start = Date.now();
      $('.bar').css('width', ((100 * (exp.phase) / exp.nQs) + "%"));
      $(".transition").hide();
      this.stim = stim;

      $(".err").hide();
      //exp.sliderPost = null;
      console.log(this.stim);

      var utterance = "";

      var sentence = "<strong>" + this.stim.name + " asks:</strong> \"<i>" + this.stim.utterance + "</i>\"";
      $(".sentence1").html(sentence);
      $(".utterance1").html(utterance);
      var question = "";
      question = "Is " + this.stim.name + " certain that " + this.stim.question + "?";
      $(".question1").html(question);

      $(".sentence1").show();
      $(".utterence1").show();
      $(".question1").show();

      $('.yes_image').css('border', "");
      $('.no_image').css('border', "");
      $('.yes_image').show();
      $('.no_image').show();

      var a = 0;
      exp.keyCode = "";

      document.onkeydown = checkKey;
      function checkKey(e) {
        e = e || window.event;

        if (e.keyCode == 74) {
          exp.keyCode = "yes"
          e = 0;
        } if (e.keyCode == 70) {
          exp.keyCode = "no"
          e = 0;
        }

        if ((a == 0) && (exp.keyCode == "yes" || exp.keyCode == "no")) {
          e = 0;
          console.log("pressed a button: " + (Date.now()-exp.trial_start))
          exp.responseTime = Date.now() - exp.trial_start;
          if (exp.keyCode == "yes")
            $('.yes_image').css('border', 'solid 3px green'); // right answer is yes
          if (exp.keyCode == "no")
            $('.no_image').css('border', 'solid 3px green');

          setTimeout(function () {
            $(".sentence1").hide();
            $(".utterence1").hide();
            $(".question1").hide();
            $('.yes_image').hide();
            $('.no_image').hide();
            $('.instruction1').hide();
            $(".transition1").show();
              exp.go();
          }, 400)
          a = 1;
          
        }
      }
    },

    button: function () {
      this.log_responses();
      _stream.apply(this); //use exp.go() if and only if there is no "present" data.        
    },

    /**
    button: function () {
      console.log(exp.sliderPost);
      if (exp.sliderPost != null) {
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },
    */

    log_responses: function () {
      exp.data_trials.push({

        "slide_number_in_experiment": exp.phase,
        "Word": this.stim.trigger,
        "exp": this.stim.trigger_class,
        "content": this.stim.question,
        "speakerGender": this.stim.gender,
        "utterance": this.stim.utterance,
        "Word": this.stim.Word,
        "speakerName": this.stim.name,
        "response": exp.keyCode,
        "rt": exp.responseTime
      });
    }
  });
    
  slides.practice1_post = slide({
    name: "practice1_post",
    present: exp.practice1_post,
    start: function () {
        var a = 0;
        exp.keyCode = "";

          document.onkeydown = checkKey;
        function checkKey(e) {
            e = e || window.event;
            console.log("key pressed");
           if (e.keyCode == 32) {
               e = 0;
              exp.go();
            }
          }
    }
});
    
slides.practice2 = slide({
    name: "practice2",
    present: exp.practice2,
    start: function () {
      $(".err").hide();
},

    present_handle: function (stim) {
      exp.trial_start = Date.now();
      $('.bar').css('width', ((100 * (exp.phase) / exp.nQs) + "%"));
      $(".transition2").hide();
      this.stim = stim;

      $(".err").hide();
      //exp.sliderPost = null;
      console.log(this.stim);

      var utterance = "";

      var sentence = "<strong>" + this.stim.name + " asks:</strong> \"<i>" + this.stim.utterance + "</i>\"";
      $(".sentence2").html(sentence);
      $(".utterance2").html(utterance);
      var question = "";
      question = "Is " + this.stim.name + " certain that " + this.stim.question + "?";
      $(".question2").html(question);

      $(".sentence2").show();
      $(".utterence2").show();
      $(".question2").show();

      $('.yes_image').css('border', "");
      $('.no_image').css('border', "");
      $('.yes_image').show();
      $('.no_image').show();

      var a = 0;
      exp.keyCode = "";

      document.onkeydown = checkKey;
      function checkKey(e) {
        e = e || window.event;

        if (e.keyCode == 74) {
          exp.keyCode = "yes"
          e = 0;
        } if (e.keyCode == 70) {
          exp.keyCode = "no"
          e = 0;
        }

        if ((a == 0) && (exp.keyCode == "yes" || exp.keyCode == "no")) {
          e = 0;
          console.log("pressed a button: " + (Date.now()-exp.trial_start))
          exp.responseTime = Date.now() - exp.trial_start;
          if (exp.keyCode == "yes")
            $('.yes_image').css('border', 'solid 3px green'); // right answer is yes
          if (exp.keyCode == "no")
            $('.no_image').css('border', 'solid 3px green');

          setTimeout(function () {
            $(".sentence2").hide();
            $(".utterence2").hide();
            $(".question2").hide();
            $('.yes_image').hide();
            $('.no_image').hide();
            $('.instruction2').hide();
            $(".transition2").show();
              exp.go();
          }, 400)
          a = 1;
        }
      }
    },

    button: function () {
      this.log_responses();
      _stream.apply(this); //use exp.go() if and only if there is no "present" data.        
    },

    /**
    button: function () {
      console.log(exp.sliderPost);
      if (exp.sliderPost != null) {
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },
    */

    log_responses: function () {
      exp.data_trials.push({

        "slide_number_in_experiment": exp.phase,
        "Word": this.stim.trigger,
        "exp": this.stim.trigger_class,
        "content": this.stim.question,
        "speakerGender": this.stim.gender,
        "utterance": this.stim.utterance,
        "Word": this.stim.Word,
        "speakerName": this.stim.name,
        "response": exp.keyCode,
        "rt": exp.responseTime
      });
    }
  });
    
slides.practice2_post = slide({
    name: "practice2_post",
    present:exp.practice2_post,
    start: function () {
        var a = 0;
        exp.keyCode = "";

        document.onkeydown = checkKey;
        function checkKey(e) {
            console.log("key pressed");
            e = e || window.event;
            if (e.keyCode == 32) {
                e = 0;
              exp.go();
            }
          }
    }
  });
    
  slides.block1 = slide({
    name: "block1",
    present: exp.stims_block1,
    start: function () {
      $(".err").hide();
    },

    present_handle: function (stim) {
      exp.trial_start = Date.now();
      $('.bar').css('width', ((100 * (exp.phase) / exp.nQs) + "%"));
      $(".transition").hide();
      this.stim = stim;

      $(".err").hide();
      //exp.sliderPost = null;
      console.log(this.stim);

      var utterance = "";

      var sentence = "<strong>" + this.stim.name + " asks:</strong> \"<i>" + this.stim.utterance + "</i>\"";
      $(".sentence").html(sentence);
      $(".utterance").html(utterance);
      var question = "";
      question = "Is " + this.stim.name + " certain that " + this.stim.question + "?";
      $(".question").html(question);

      $(".sentence").show();
      $(".utterence").show();
      $(".question").show();

      $('.yes_image').css('border', "");
      $('.no_image').css('border', "");
      $('.yes_image').show();
      $('.no_image').show();

      var a = 0;
      exp.keyCode = "";

      setTimeout(function () {
        if (a == 0) {
          exp.responseTime = "Late";
          //console.log("Late: " + (Date.now()-exp.startTime))
          $(".sentence").hide();
          $(".utterence").hide();
          $(".question").hide();
          $('.yes_image').hide();
          $('.no_image').hide();
          $(".transition").show();
          document.getElementById("critical_stop").play();
          a = 1;
        }
      }, 10000)

      document.onkeydown = checkKey;
      function checkKey(e) {
        e = e || window.event;

        if (e.keyCode == 74) {
          exp.keyCode = "yes"
          e = 0;
        } if (e.keyCode == 70) {
          exp.keyCode = "no"
          e = 0;
        }

        if ((a == 0) && (exp.keyCode == "yes" || exp.keyCode == "no")) {
          e = 0;
          console.log("pressed a button: " + (Date.now()-exp.trial_start))
          exp.responseTime = Date.now() - exp.trial_start;
          if (exp.keyCode == "yes")
            $('.yes_image').css('border', 'solid 3px green'); // right answer is yes
          if (exp.keyCode == "no")
            $('.no_image').css('border', 'solid 3px green');

          setTimeout(function () {
            $(".sentence").hide();
            $(".utterence").hide();
            $(".question").hide();
            $('.yes_image').hide();
            $('.no_image').hide();
            $(".transition").show();
          }, 400)
          a = 1;
        }
        if (($('.transition').is(":visible")) && (e.keyCode == 32)) {
          console.log("enter transitionl...")
          e = 0;
          console.log("saving rt as: " + exp.responseTime)
          _s.button();
        }
      }
    },

    button: function () {
      this.log_responses();
      _stream.apply(this); //use exp.go() if and only if there is no "present" data.        
    },

    /**
    button: function () {
      console.log(exp.sliderPost);
      if (exp.sliderPost != null) {
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },
    */

    log_responses: function () {
      exp.data_trials.push({

        "slide_number_in_experiment": exp.phase,
        "Word": this.stim.trigger,
        "exp": this.stim.trigger_class,
        "content": this.stim.question,
        "speakerGender": this.stim.gender,
        "utterance": this.stim.utterance,
        "Word": this.stim.Word,
        "speakerName": this.stim.name,
        "response": exp.keyCode,
        "rt": exp.responseTime
      });
    }
  });


  slides.questionaire = slide({
    name: "questionaire",
    submit: function (e) {
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language: $("#language").val(),
        enjoyment: $("#enjoyment").val(),
        asses: $('input[name="assess"]:checked').val(),
        age: $("#age").val(),
        gender: $("#gender").val(),
        education: $("#education").val(),
        comments: $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.finished = slide({
    name: "finished",
    start: function () {
      exp.data = {
        "trials": exp.data_trials,
        "catch_trials": exp.catch_trials,
        "system": exp.system,
        "condition": exp.condition,
        "subject_information": exp.subj_data,
        "time_in_minutes": (Date.now() - exp.startT) / 60000
      };
      setTimeout(function () { turk.submit(exp.data); }, 1000);
    }
  });
  console.log(slides);

  return slides;
}

function init() {
  var valence_highpos_arousal_high = _.shuffle([
    {
      "trigger": "surprised",
      "Word": "surprise",
      "voice": "passive"
    },
    {
      "trigger": "thrilled",
      "Word": "thrill",
      "voice": "passive"
    },
    {
      "trigger": "excited",
      "Word": "excite",
      "voice": "passive"
    },
    {
      "trigger": "joke",
      "Word": "joke",
      "voice": "active"
    },
    {
      "trigger": "fascinated",
      "Word": "facinate",
      "voice": "passive"
    },
    {
      "trigger": "celebrate",
      "Word": "celebrate",
      "voice": "active"
    }
  ]);

  var valence_highpos_arousal_med = _.shuffle([
    {
      "trigger": "amused",
      "Word": "amuse",
      "voice": "passive"
    },
    {
      "trigger": "enjoy",
      "Word": "enjoy",
      "voice": "active"
    },
    {
      "trigger": "elaborate",
      "Word": "elaborate",
      "voice": "active"
    },
    {
      "trigger": "charmed",
      "Word": "charm",
      "voice": "passive"
    },
    {
      "trigger": "fantasize",
      "Word": "fantasize",
      "voice": "active"
    },
    {
      "trigger": "love",
      "Word": "love",
      "voice": "active"
    }
  ]);

  var valence_highpos_arousal_low = _.shuffle([
    {
      "trigger": "think",
      "Word": "think",
      "voice": "active"
    },
    {
      "trigger": "feel",
      "Word": "feel",
      "voice": "active"
    },
    {
      "trigger": "pray",
      "Word": "pray",
      "voice": "active"
    },
    {
      "trigger": "envision",
      "Word": "envision",
      "voice": "active"
    },
    {
      "trigger": "write",
      "Word": "write",
      "voice": "active"
    },
    {
      "trigger": "promise",
      "Word": "promise",
      "voice": "active"
    }
  ]);

  var valence_highneg_arousal_high = _.shuffle([
    {
      "trigger": "irritated",
      "Word": "irritate",
      "voice": "passive"
    },
    {
      "trigger": "cringe",
      "Word": "cringe",
      "voice": "active"
    },
    {
      "trigger": "scream",
      "Word": "scream",
      "voice": "active"
    },
    {
      "trigger": "aggravated",
      "Word": "aggravate",
      "voice": "passive"
    },
    {
      "trigger": "argue",
      "Word": "argue",
      "voice": "active"
    },
    {
      "trigger": "pained",
      "Word": "pain",
      "voice": "passive"
    }
  ]);

  var valence_highneg_arousal_med = _.shuffle([
    {
      "trigger": "embarrassed",
      "Word": "embarrass",
      "voice": "passive"
    },
    {
      "trigger": "offended",
      "Word": "offend",
      "voice": "passive"
    },
    {
      "trigger": "troubled",
      "Word": "trouble",
      "voice": "passive"
    },
    {
      "trigger": "tortured",
      "Word": "torture",
      "voice": "passive"
    },
    {
      "trigger": "insulted",
      "Word": "insult",
      "voice": "passive"
    },
    {
      "trigger": "disgusted",
      "Word": "disgust",
      "voice": "passive"
    }
  ]);

  var valence_highneg_arousal_low = _.shuffle([
    {
      "trigger": "weep",
      "Word": "weep",
      "voice": "active"
    },
    {
      "trigger": "distressed",
      "Word": "distress",
      "voice": "passive",
    },
    {
      "trigger": "resent",
      "Word": "resent",
      "voice": "active"
    },
    {
      "trigger": "ignore",
      "Word": "ignore",
      "voice": "active"
    },
    {
      "trigger": "gossip",
      "Word": "gossip",
      "voice": "active"
    },
    {
      "trigger": "whine",
      "Word": "whine",
      "voice": "active",
    }
  ]);

  var valence_low_arousal_high = _.shuffle([
    {
      "trigger": "shocked",
      "Word": "shock",
      "voice": "passive"
    },
    {
      "trigger": "anticipate",
      "Word": "anticipate",
      "voice": "active"
    },
    {
      "trigger": "alarmed",
      "Word": "alarm",
      "voice": "passive"
    },
    {
      "trigger": "expose",
      "Word": "expose",
      "voice": "active"
    },
    {
      "trigger": "shout",
      "Word": "shout",
      "voice": "active"
    },
    {
      "trigger": "testify",
      "Word": "testify",
      "voice": "active"
    }
  ]);

  var valence_low_arousal_med = _.shuffle([
    {
      "trigger": "verify",
      "Word": "verify",
      "voice": "active",
    },
    {
      "trigger": "simulate",
      "Word": "simulate",
      "voice": "active"
    },
    {
      "trigger": "squeal",
      "Word": "squeal",
      "voice": "active"
    },
    {
      "trigger": "express",
      "Word": "express",
      "voice": "active"
    },
    {
      "trigger": "require",
      "Word": "require",
      "voice": "active"
    },
    {
      "trigger": "bet",
      "Word": "bet",
      "voice": "active"
    }
  ]);

  var valence_low_arousal_low = _.shuffle([
    {
      "trigger": "murmur",
      "Word": "murmur",
      "voice": "active"
    },
    {
      "trigger": "suppose",
      "Word": "suppose",
      "voice": "active"
    },
    {
      "trigger": "retract",
      "Word": "retract",
      "voice": "active"
    },
    {
      "trigger": "dictate",
      "Word": "dictate",
      "voice": "active",
    },
    {
      "trigger": "compute",
      "Word": "compute",
      "voice": "active"
    },
    {
      "trigger": "tweet",
      "Word": "tweet",
      "voice": "active"
    }
  ]);

  var all_words = [valence_highneg_arousal_high,
    valence_highneg_arousal_med,
    valence_highneg_arousal_low,
    valence_highpos_arousal_high,
    valence_highpos_arousal_med,
    valence_highpos_arousal_low,
    valence_low_arousal_high,
    valence_low_arousal_med,
    valence_low_arousal_low]

  var female_sentences = _.shuffle([
    "Josie went on vacation to France",
    "Emma studied on Saturday morning",
    "Sophia got a tattoo",
    "Mia drank 2 cocktails last night",
    "Isabella ate a steak on Sunday",
    "Emily bought a car yesterday",
    "Grace visited her sister",
    "Zoe calculated the tip",
    "Audrey went to a party",
    "Emilia looked after the kids",
    "Hannah called her parents",
    "Natasha got a promotion",
    "Danielle painted her room",
    "Courtney woke up early yesterday",
    "Molly attended a conference last week",
    "Mary planted a tree",
    "Olivia left her job",
    "Valerie booked the venue"]);



  var male_sentences = _.shuffle(["Danny ate the last cupcake",
    "Frank got a cat",
    "Jackson ran 10 miles",
    "Jayden rented a car",
    "Tony had a drink last night",
    "Josh learned to ride a bike yesterday",
    "Owen shoveled snow last winter",
    "Connor fell from a tree",
    "Jason made a cake",
    "Allen went to the museum",
    "Cole celebrated his friend's birthday",
    "Fred missed the train",
    "Louis went swimming",
    "Julian cleaned his room",
    "Jon went out for dinner",
    "Charley spilled the wine",
    "Dylan argued with his parents",
    "Lucas bought new shoes"]);

  var sentences = _.shuffle(female_sentences.concat(male_sentences));
  var female_names = _.shuffle(["Amanda", "Melissa", "Laura", "Stephanie", "Rebecca", "Sharon", "Cynthia", "Kathleen", "Ruth", "Anna", "Kaitlin", "Regina", "Heather", "Shirley", "Amy", "Brenda", "Catherine", "Nicole"]);

  var male_names = _.shuffle(["Patrick", "Scott", "Justin", "Jerry", "Ben", "Ray", "Kevin", "Brian", "Andrew", "Tim", "Eli", "Noah", "Colby", "Bobby", "Alan", "Francisco", "Manuel", "Dennis"]);

  //var all_names = _.shuffle(female_names.concat(male_names));

  var n_items_per_bin = 3; // sample number of items per bin
  var n_items = 27; // 9 bins in total
  var items = [];
  for (var i = 0; i < all_words.length; i++) {
    var curr_list = all_words[i];
    curr_list = _.shuffle(curr_list);
    for (var j = 0; j < n_items_per_bin; j++) {
      items.push(curr_list[j]);
    }
  }

  items = _.shuffle(items);

  // each element has: base, curr_item, question, trigger
  var contents = [];

  for (var i = 0; i < items.length; i++) {
    var curr_content = {};
    var base = sentences[i];
    curr_content["content"] = base;
    var subject;
    if (female_sentences.includes(base)) {
      subject = male_names[0];
      male_names.splice(0, 1);
    } else {
      subject = female_names[0];
      female_names.splice(0, 1);
    }

    var curr_item = items[i];
    curr_content["item"] = curr_item;
    curr_content["trigger"] = curr_item["trigger"];
    curr_content["Word"] = curr_item["Word"];
    var utterance;
    if (curr_item["voice"] == "active") {
      utterance = "Did " + subject + " " + curr_item["trigger"] + " that " + base + "?";
    } else {
      utterance = "Is " + subject + " " + curr_item["trigger"] + " that " + base + "?";
    }
    curr_content["utterance"] = utterance;
    contents.push(curr_content);
  }

  // 13 male speakers, 19 female speakers?
  var speaker_names = _.shuffle([
    {
      "name": "Logan",
      "gender": "M"
    },
    {
      "name": "James",
      "gender": "M"
    },
    {
      "name": "Robert",
      "gender": "M"
    },
    {
      "name": "William",
      "gender": "M"
    },
    {
      "name": "David",
      "gender": "M"
    },
    {
      "name": "Richard",
      "gender": "M"
    },
    {
      "name": "Thomas",
      "gender": "M"
    },
    {
      "name": "Christopher",
      "gender": "M"
    },
    {
      "name": "Matthew",
      "gender": "M"
    },
    {
      "name": "Paul",
      "gender": "M"
    },
    {
      "name": "Mark",
      "gender": "M"
    },
    {
      "name": "George",
      "gender": "M"
    },
    {
      "name": "Steven",
      "gender": "M"
    },
    {
      "name": "Kenneth",
      "gender": "M"
    },
    {
      "name": "Jennifer",
      "gender": "F"
    },
    {
      "name": "Elizabeth",
      "gender": "F"
    },
    {
      "name": "Linda",
      "gender": "F"
    },
    {
      "name": "Susan",
      "gender": "F"
    },
    {
      "name": "Margaret",
      "gender": "F"
    },
    {
      "name": "Jessica",
      "gender": "F"
    },
    {
      "name": "Dorothy",
      "gender": "F"
    },
    {
      "name": "Sarah",
      "gender": "F"
    },
    {
      "name": "Karen",
      "gender": "F"
    },
    {
      "name": "Nancy",
      "gender": "F"
    },
    {
      "name": "Betty",
      "gender": "F"
    },
    {
      "name": "Lisa",
      "gender": "F"
    },
    {
      "name": "Sandra",
      "gender": "F"
    },
    {
      "name": "Helen",
      "gender": "F"
    },
    {
      "name": "Ashley",
      "gender": "F"
    },
    {
      "name": "Donna",
      "gender": "F"
    },
    {
      "name": "Kimberly",
      "gender": "F"
    },
    {
      "name": "Carol",
      "gender": "F"
    },
    {
      "name": "Michelle",
      "gender": "F"
    }]);

  function makeStim(i) {
    //get item
    var item = items[i];
    //get a name to be speaker
    var name_data = speaker_names[i];
    var name = name_data.name;
    var gender = name_data.gender;

    //var trigger_cont = trigger_contents[item.trigger];
    var trigger = item.trigger;
    //var short_trigger = trigger;

    var content = contents[i];
    var trigger = content["trigger"];
    var utterance = content["utterance"];
    var Word = content["Word"];
    var question = content["content"];

    return {
      "name": name,
      "gender": gender,
      "trigger": item.trigger,
      "Word": item.Word,
      "trigger_class": "stim",
      "utterance": utterance,
      "question": question
    }
  }

  var control_items = [
    {
      "item_id": "control1",
      "short_trigger": "control",
      "utterance": "Is Zack coming to the meeting tomorrow?",
      "content": "Zack is coming to the meeting tomorrow",
      "fact": "Zack is a member of the golf club"
    },
    {
      "item_id": "control2",
      "short_trigger": "control",
      "utterance": "Is Mary's aunt sick?",
      "content": "Mary's aunt is sick",
      "fact": "Mary visited her aunt on Sunday"
    },
    {
      "item_id": "control3",
      "short_trigger": "control",
      "utterance": "Did Todd play football in high school?",
      "content": "Todd played football in high school",
      "fact": "Todd goes to the gym 3 times a week"
    },
    {
      "item_id": "control4",
      "short_trigger": "control",
      "utterance": "Is Vanessa good at math?",
      "content": "Vanessa is good at math",
      "fact": "Vanessa won a prize at school"
    },
    {
      "item_id": "control5",
      "short_trigger": "control",
      "utterance": "Did Madison have a baby?",
      "content": "Madison had a baby",
      "fact": "Trish sent Madison a card"
    },
    {
      "item_id": "control6",
      "short_trigger": "control",
      "utterance": "Was Hendrick's car expensive?",
      "content": "Hendrick's car was expensive",
      "fact": "Hendrick just bought a car"
    }
  ];
    
  /*
    var demo_ptrial_items = [
      {
        "item_id": "demo1",
        "short_trigger": "control",
        "utterance": "Did Claire compose a song for her mom's birthday?",
        "content": "Zack is coming to the meeting tomorrow",
        "fact": "Zack is a member of the golf club"
      },
      {
        "item_id": "demo2",
        "short_trigger": "control",
        "utterance": "Is Mary's aunt sick?",
        "content": "Mary's aunt is sick",
        "fact": "Mary visited her aunt on Sunday"
      },
      {
        "item_id": "ptrial1",
        "short_trigger": "ptrial",
        "utterance": "Did Todd play football in high school?",
        "content": "Todd played football in high school",
        "fact": "Todd goes to the gym 3 times a week"
      },
      {
        "item_id": "ptrial2",
        "short_trigger": "ptrial",
        "utterance": "Is Vanessa good at math?",
        "content": "Vanessa is good at math",
        "fact": "Vanessa won a prize at school"
      },
      {
        "item_id": "ptrial3",
        "short_trigger": "ptrial",
        "utterance": "Did Madison have a baby?",
        "content": "Madison had a baby",
        "fact": "Trish sent Madison a card"
      },
      {
        "item_id": "ptrial4",
        "short_trigger": "ptrial",
        "utterance": "Was Hendrick's car expensive?",
        "content": "Hendrick's car was expensive",
        "fact": "Hendrick just bought a car"
      }
    ];
  
    */
  function makeControlStim(i) {
    //get item
    var item = control_items[i];
    //get a name to be speaker
    var name_data = speaker_names[i + items.length];
    var name = name_data.name;
    var gender = name_data.gender;

    return {
      "name": name,
      "gender": gender,
      "trigger": item.short_trigger,
      "trigger_class": "control",
      "utterance": item.utterance,
      "question": item.content
    }
  }
    
var practice_items = [
    {
      "item_id": "practice1",
      "short_trigger": "practice",
        "speaker": "Samuel",
        "gender": "M",
      "utterance": "Does Rose like chocolate?",
      "content": "Rose likes chocolate",
    },
    {
      "item_id": "practice2",
      "short_trigger": "practice",
        "speaker": "Britney",
        "gender": "F",
      "utterance": "Is Carlos at school?",
      "content": "Carlos is at school",
    }
  ];
    
  function makePracticeStim(i) {
    //get item
    var item = practice_items[i];
    //get a name to be speaker
    var name_data = practice_items[i];
    var name = name_data.speaker;
    var gender = name_data.gender;

    return {
      "name": name,
      "gender": gender,
      "trigger": item.short_trigger,
      "trigger_class": "practice",
      "utterance": item.utterance,
      "question": item.content
    }
  }
    

  exp.stims_block1 = [];
  for (var i = 0; i < items.length; i++) {
    var stim = makeStim(i);
    exp.stims_block1.push(jQuery.extend(true, {}, stim));
  }

  for (var j = 0; j < control_items.length; j++) {
    var stim = makeControlStim(j);
    //console.log(stim);
    //    exp.stims_block1.push(makeStim(i));
    exp.stims_block1.push(jQuery.extend(true, {}, stim));
    //	exp.stims_block2.push(jQuery.extend(true, {}, stim));	
  }
  exp.stims_block1 = _.shuffle(exp.stims_block1);

  console.log(exp.stims_block1);
    
    // only make 1 for now
    exp.practice1 = [];
    var stim1 = makePracticeStim(0);
    exp.practice1.push(jQuery.extend(true, {}, stim1));

    exp.practice2 = [];
    var stim2 = makePracticeStim(1);
    exp.practice2.push(jQuery.extend(true, {}, stim2));


  /// HERE'S THE PART I DON'T UNDERSTAND
  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
    Browser: BrowserDetect.browser,
    OS: BrowserDetect.OS,
    screenH: screen.height,
    screenUH: exp.height,
    screenW: screen.width,
    screenUW: exp.width
  };
  //blocks of the experiment:
      //exp.structure = ["bot", "i0", "practice1", "practice1_post", "practice2", "practice2_post", "block1", 'questionaire', 'finished'];
  exp.structure = ["prolificID", "bot", "i0", "instructions", "practice1", "practice1_post", "practice2", "practice2_post", "block1", 'questionaire', 'finished'];
  console.log(exp.structure);

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
  //relies on structure and slides being defined

  // exp.nQs = 2 + 20 + 1; 
  $(".nQs").html(exp.nQs);

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function () {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function () { $("#mustaccept").show(); });
      exp.go();
    }
  });

  exp.go(); //show first slide
}