function make_slides(f) {
  var slides = {};

    slides.bot = slide({
    name : "bot",
    start: function() {
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
    button : function() {
      exp.text_input = document.getElementById("text_box").value;
      var lower = exp.listener.toLowerCase();
      var upper = exp.listener.toUpperCase();

      if ((exp.lives < 3) && ((exp.text_input == exp.listener)|(exp.text_input == lower) | (exp.text_input== upper))){
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "utterance": "bot_check",
          "object": exp.listener,
          "rt" : 0,
          "response" : exp.text_input
        });
        exp.go();
      }
      else {
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "utterance": "bot_check",
          "object": exp.listener,
          "rt" : 0,
          "response" : exp.text_input
        });
        if (exp.lives == 0){
          $('.err1').show();
        }if (exp.lives == 1){
          $('.err1').hide();
          $('.err2').show();
        }if (exp.lives == 2){
          $('.err2').hide();
          $('.disq').show();
          $('.button').hide();
        }
        exp.lives++;
      } 
    }
        
  });
    
  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
  
  slides.instructions1 = slide({
    name : "instructions1",
    start : function() {
    $('.bar').css('width', ( (100*(exp.phase)/exp.nQs) + "%"));    	
    	var inst1 = "";
//    	console.log(block_order);
    	if (exp.stims_block1[0].block == "ai") {
    		inst1 = inst1 + "First you'll answer questions about what the people at the party are asking about."
    	} else {
    		inst1 = inst1 + "First you'll answer questions about what the people at the party are certain about."    		
    		}
    	$("#inst1").html(inst1);
    },
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  }); 
     

  slides.block1 = slide({
    name : "block1",
    present : exp.stims_block1,
    start : function() {
      $(".err").hide();
    },
    present_handle : function(stim) {
    $('.bar').css('width', ( (100*(exp.phase)/exp.nQs) + "%"));    	    	    
      this.stim = stim;
    	this.stim.trial_start = Date.now();      
        $(".err").hide();    	
	  this.init_sliders();
      exp.sliderPost = null;	 
      console.log(this.stim);    
     //  if (this.stim.trigger_class == "control") {
//       	var utterance = "<strong>"+this.stim.fact+"."+this.stim.name + ":</strong> \"<i>"+this.stim.utterance+"</i>\"";
//       } else {
//       	var utterance = "<strong>"+this.stim.name+":</strong> \"<i>"+this.stim.fact+". "+ this.stim.utterance+"</i>\"";
//       }
      var utterance = "";

      var sentence = "<strong>"+this.stim.name+" asks:</strong> \"<i>"+ this.stim.utterance+"</i>\"";
	  $(".sentence").html(sentence);
	  $(".utterance").html(utterance);
	  var question = "";
	  question = "Is "+this.stim.name+" certain that "+this.stim.question+"?";

	  $(".question").html(question);	  
    },

    button : function() {
    	console.log(exp.sliderPost);
      if (exp.sliderPost != null) {
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },
    init_sliders : function() {
      utils.make_slider("#single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },
    log_responses : function() {
      exp.data_trials.push({
     
   	  "slide_number_in_experiment" : exp.phase,
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
      "response" : exp.sliderPost,
      "rt" : Date.now() - this.stim.trial_start
      });
    }
  }); 
  
 
  slides.questionaire =  slide({
    name : "questionaire",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.finished = slide({
    name : "finished",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });
    console.log(slides);

  return slides;
}

function init() {
var valence_highpos_arousal_high = _.shuffle([
    {
     "trigger":"surprised",
        "Word":"surprise",
     "voice": "passive"
   },
   {
     "trigger":"thrilled",
       "Word":"thrill",
     "voice": "passive"
   },
   {
     "trigger":"excited",
       "Word":"excite",
     "voice": "passive"
   },
   {
     "trigger":"joke",
       "Word":"joke",
     "voice": "active"
   },
   {
     "trigger":"fascinated",
       "Word":"facinate",
     "voice": "passive"
   },
   {
     "trigger":"celebrate",
       "Word":"celebrate",
     "voice": "active"
   }
]);

var valence_highpos_arousal_med = _.shuffle([
    {
     "trigger":"amused",
        "Word":"amuse",
     "voice": "passive"
   }, 
   {
     "trigger":"enjoy",
       "Word":"enjoy",
     "voice": "active"
   },
   {
     "trigger":"elaborate",
       "Word":"elaborate",
     "voice": "active"
   }, 
   {
     "trigger":"charmed",
       "Word":"charm",
     "voice": "passive"
   },
   {
     "trigger":"fantasize",
       "Word":"fantasize",
     "voice": "active"
   },
   {
     "trigger":"love",
       "Word":"love",
     "voice": "active"
   }
]);

var valence_highpos_arousal_low = _.shuffle([
    {
     "trigger":"think",
        "Word":"think",
     "voice": "active"
   },
   {
     "trigger":"feel",
       "Word":"feel",
     "voice": "active"
   },
   {
     "trigger":"pray",
       "Word":"pray",
     "voice": "active"
   },
   {
     "trigger":"envision",
       "Word":"envision",
     "voice": "active"
   }, 
   {
     "trigger":"write",
       "Word":"write",
     "voice": "active"
   }, 
   {
     "trigger":"promised",
       "Word":"promise",
     "voice": "passive"
   }
]);

var valence_highneg_arousal_high = _.shuffle([
    {
     "trigger":"irritated",
        "Word":"irritate",
     "voice": "passive"
   },
   {
     "trigger":"cringe",
       "Word":"cringe",
     "voice": "active"
   },
   {
     "trigger":"scream",
       "Word":"scream",
     "voice": "active"
   }, 
   {
     "trigger":"aggravated",
       "Word":"aggravate",
     "voice": "passive"
   }, 
   {
     "trigger":"argue",
       "Word":"argue",
     "voice": "active"
   }, 
   {
     "trigger":"pained",
       "Word":"pain",
     "voice": "passive"
   }
]);

var valence_highneg_arousal_med = _.shuffle([
    {
     "trigger":"embarrassed",
        "Word":"embarrass",
     "voice": "passive"
   },
   {
     "trigger":"offended",
       "Word":"offend",
     "voice": "passive"
   },
   {
     "trigger":"troubled",
       "Word":"trouble",
     "voice": "passive"
   }, 
   {
     "trigger":"tortured",
       "Word":"torture",
     "voice": "passive"
   }, 
   {
     "trigger":"insulted",
       "Word":"insult",
     "voice": "passive"
   }, 
   {
     "trigger":"disgusted",
       "Word":"disgust",
     "voice": "passive"
   }
]);

var valence_highneg_arousal_low = _.shuffle([
    {
     "trigger":"weep",
        "Word":"weep",
     "voice": "active"
   },
   {
     "trigger":"distressed",
       "Word":"distress",
     "voice": "passive",
   },
   {
     "trigger":"resent",
       "Word":"resent",
     "voice": "active"
   }, 
   {
     "trigger":"ignore",
       "Word":"ignore",
     "voice": "active"
   },
   {
     "trigger":"gossip",
       "Word":"gossip",
     "voice": "active"
   },
   {
     "trigger":"whine",
       "Word":"whine",
     "voice": "active",
   }
]);

var valence_low_arousal_high = _.shuffle([
    {
     "trigger":"shocked",
        "Word":"shock",
     "voice": "passive"
   },
   {
     "trigger":"anticipate",
       "Word":"anticipate",
     "voice": "active"
   },
   {
     "trigger":"alarmed",
       "Word":"alarm",
     "voice": "passive"
   },
   {
     "trigger":"expose",
       "Word":"expose",
     "voice": "active"
   },
   {
     "trigger":"shout",
       "Word":"shout",
     "voice": "active"
   },
   {
     "trigger":"testify",
       "Word":"testify",
     "voice": "active"
   }
]);

var valence_low_arousal_med = _.shuffle([
   {
     "trigger":"verify",
       "Word":"verify",
     "voice": "active",
   },
   {
     "trigger":"simulate",
       "Word":"simulate",
     "voice": "active"
   },
   {
     "trigger":"squeal",
       "Word":"squeal",
     "voice": "active"
   },
   {
     "trigger":"express",
       "Word":"express",
     "voice": "active"
   },
   {
     "trigger":"require",
       "Word":"require",
     "voice": "active"
   },
   {
     "trigger":"bet",
       "Word":"bet",
     "voice": "active"
   }
]);

var valence_low_arousal_low = _.shuffle([
   {
     "trigger":"murmur",
       "Word":"murmur",
     "voice": "active"
   },
   {
     "trigger":"suppose",
       "Word":"suppose",
     "voice": "active"
   },
   {
     "trigger":"retract",
       "Word":"retract",
     "voice": "active"
   },
       {
     "trigger":"dictate",
           "Word":"dictate",
     "voice": "active",
   },
   {
     "trigger":"compute",
       "Word":"compute",
     "voice": "active"
   },
   {
     "trigger":"tweet",
       "Word":"tweet",
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

var n_items_per_bin = 3; // number of items per bin
var n_items = 27;
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
      "name":"Logan",
      "gender":"M"
    },
    {
      "name":"James",
      "gender":"M"
    },
    {
      "name":"Robert",
      "gender":"M"
    },
    {
      "name":"William",
      "gender":"M"
    },
    {
      "name":"David",
      "gender":"M"
    },
   {
     "name":"Richard",
     "gender":"M"
   },
    {
      "name":"Thomas",
      "gender":"M"
    },
    {
      "name":"Christopher",
      "gender":"M"
    },
    {
      "name":"Matthew",
      "gender":"M"
    },
    {
      "name":"Paul",
      "gender":"M"
    },
   {
     "name":"Mark",
     "gender":"M"
   },
    {
      "name":"George",
      "gender":"M"
    },
    {
      "name":"Steven",
      "gender":"M"
    },
    {
      "name":"Kenneth",
      "gender":"M"
    },
    {
      "name":"Jennifer",
      "gender":"F"
    },
    {
      "name":"Elizabeth",
      "gender":"F"
    },
    {
      "name":"Linda",
      "gender":"F"
    },
   {
     "name":"Susan",
     "gender":"F"
   },
    {
      "name":"Margaret",
      "gender":"F"
    },
    {
      "name":"Jessica",
      "gender":"F"
    },
    {
      "name":"Dorothy",
      "gender":"F"
    },
    {
      "name":"Sarah",
      "gender":"F"
    },
    {
      "name":"Karen",
      "gender":"F"
    },
    {
      "name":"Nancy",
      "gender":"F"
    },
    {
      "name":"Betty",
      "gender":"F"
    },
    {
      "name":"Lisa",
      "gender":"F"
    },
    {
      "name":"Sandra",
      "gender":"F"
    },
    {
      "name":"Helen",
      "gender":"F"
    },
    {
      "name":"Ashley",
      "gender":"F"
    },
    {
      "name":"Donna",
      "gender":"F"
    },
    {
      "name":"Kimberly",
      "gender":"F"
    },
    {
      "name":"Carol",
      "gender":"F"
    },
    {
      "name":"Michelle",
      "gender":"F"
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
		"item_id" : "control1",
		"short_trigger" : "control",
		"utterance" : "Is Zack coming to the meeting tomorrow?",
		"content" : "Zack is coming to the meeting tomorrow",
		"fact" : "Zack is a member of the golf club"
	},
	{
		"item_id" : "control2",
		"short_trigger" : "control",
		"utterance" : "Is Mary's aunt sick?",
		"content" : "Mary's aunt is sick",
		"fact" : "Mary visited her aunt on Sunday"
	},
	{
		"item_id" : "control3",
		"short_trigger" : "control",
		"utterance" : "Did Todd play football in high school?",
		"content" : "Todd played football in high school",
		"fact" : "Todd goes to the gym 3 times a week"
	},
	{
		"item_id" : "control4",
		"short_trigger" : "control",
		"utterance" : "Is Vanessa good at math?",
		"content" : "Vanessa is good at math",
		"fact" : "Vanessa won a prize at school"
	},
	{
		"item_id" : "control5",
		"short_trigger" : "control",
		"utterance" : "Did Madison have a baby?",
		"content" : "Madison had a baby",
		"fact" : "Trish sent Madison a card"
	},
	{
		"item_id" : "control6",
		"short_trigger" : "control",
		"utterance" : "Was Hendrick's car expensive?",
		"content" : "Hendrick's car was expensive",
		"fact" : "Hendrick just bought a car"
	}
];
    
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
    
exp.stims_block1 = [];
for (var i=0; i<items.length; i++) {
      var stim = makeStim(i);
    exp.stims_block1.push(jQuery.extend(true, {}, stim));
  }
    
for (var j=0; j<control_items.length; j++) {
  	var stim = makeControlStim(j);
    //console.log(stim);
//    exp.stims_block1.push(makeStim(i));
	exp.stims_block1.push(jQuery.extend(true, {}, stim));
//	exp.stims_block2.push(jQuery.extend(true, {}, stim));	
} 
    exp.stims_block1 = _.shuffle(exp.stims_block1); 
    
    console.log(exp.stims_block1);
    
    /// HERE'S THE PART I DON'T UNDERSTAND
      exp.trials = [];
  exp.catch_trials = [];
  exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["bot", "i0", "block1", 'questionaire', 'finished'];
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
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}