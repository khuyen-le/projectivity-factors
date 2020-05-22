function make_slides(f) {
  var   slides = {};

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
   	  "verb": this.stim.trigger,
   	  "contentNr": this.stim.content,
   	  "content": this.stim.question,
   	  "speakerGender": this.stim.gender,
   	  "utterance": this.stim.utterance,
      "question": this.stim.content,
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
//        enjoyment : $("#enjoyment").val(),
        assess : $('input[name="assess"]:checked').val(),
		american : $('input[name="american"]:checked').val(),
		gender : $('input[name="gender"]:checked').val(),
		//american : $("#american").val(),
        //american : $('input[name="american"]:checked').val(),
        age : $("#age").val(),
        //gender : $("#gender").val(),
//        education : $("#education").val(),
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

  return slides;
}

function init() {
var valence_highpos_arousal_high = _.shuffle([
    {
     "trigger":"surprised",
     "voice": "passive"
   },
   {
     "trigger":"thrilled",
     "voice": "passive"
   },
   {
     "trigger":"excited",
     "voice": "passive"
   },
   {
     "trigger":"joke",
     "voice": "active"
   },
   {
     "trigger":"fascinated",
     "voice": "passive"
   },
   {
     "trigger":"celebrate",
     "voice": "active"
   }
]);

var valence_highpos_arousal_med = _.shuffle([
    {
     "trigger":"amused",
     "voice": "passive"
   }, 
   {
     "trigger":"enjoy",
     "voice": "active"
   },
   {
     "trigger":"elaborate",
     "voice": "active"
   }, 
   {
     "trigger":"charmed",
     "voice": "passive"
   },
   {
     "trigger":"fantasize",
     "voice": "active"
   },
   {
     "trigger":"love",
     "voice": "active"
   }
]);

var valence_highpos_arousal_low = _.shuffle([
    {
     "trigger":"think",
     "voice": "active"
   },
   {
     "trigger":"feel",
     "voice": "active"
   },
   {
     "trigger":"pray",
     "voice": "active"
   },
   {
     "trigger":"envision",
     "voice": "active"
   }, 
   {
     "trigger":"write",
     "voice": "active"
   }, 
   {
     "trigger":"promised",
     "voice": "passive"
   }
]);

var valence_highneg_arousal_high = _.shuffle([
    {
     "trigger":"irritated",
     "voice": "passive"
   },
   {
     "trigger":"cringe",
     "voice": "active"
   },
   {
     "trigger":"scream",
     "voice": "active"
   }, 
   {
     "trigger":"aggravated",
     "voice": "passive"
   }, 
   {
     "trigger":"argue",
     "voice": "active"
   }, 
   {
     "trigger":"pained",
     "voice": "passive"
   }
]);

var valence_highneg_arousal_med = _.shuffle([
    {
     "trigger":"embarrassed",
     "voice": "passive"
   },
   {
     "trigger":"offended",
     "voice": "passive"
   },
   {
     "trigger":"troubled",
     "voice": "passive"
   }, 
   {
     "trigger":"tortured",
     "voice": "passive"
   }, 
   {
     "trigger":"insulted",
     "voice": "passive"
   }, 
   {
     "trigger":"disgusted",
     "voice": "passive"
   }
]);

var valence_highneg_arousal_low = _.shuffle([
    {
     "trigger":"weep",
     "voice": "active"
   },
   {
     "trigger":"distressed",
     "voice": "passive",
   },
   {
     "trigger":"resent",
     "voice": "active"
   }, 
   {
     "trigger":"ignore",
     "voice": "active"
   },
   {
     "trigger":"gossip",
     "voice": "active"
   },
   {
     "trigger":"whine",
     "voice": "active",
   }
]);

var valence_low_arousal_high = _.shuffle([
    {
     "trigger":"shocked",
     "voice": "passive"
   },
   {
     "trigger":"anticipate",
     "voice": "active"
   },
   {
     "trigger":"alarmed",
     "voice": "passive"
   },
   {
     "trigger":"expose",
     "voice": "active"
   },
   {
     "trigger":"shout",
     "voice": "active"
   },
   {
     "trigger":"testify",
     "voice": "active"
   }
]);

var valence_low_arousal_med = _.shuffle([
   {
     "trigger":"verify",
     "voice": "active",
   },
   {
     "trigger":"simulate",
     "voice": "active"
   },
   {
     "trigger":"squeal",
     "voice": "active"
   },
   {
     "trigger":"express",
     "voice": "active"
   },
   {
     "trigger":"require",
     "voice": "active"
   },
   {
     "trigger":"bet",
     "voice": "active"
   }
]);

var valence_low_arousal_low = _.shuffle([
   {
     "trigger":"murmur",
     "voice": "active"
   },
   {
     "trigger":"suppose",
     "voice": "active"
   },
   {
     "trigger":"retract",
     "voice": "active"
   },
       {
     "trigger":"dictate",
     "voice": "active",
   },
   {
     "trigger":"compute",
     "voice": "active"
   },
   {
     "trigger":"tweet",
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

var sentences = _.shuffle(["Mary is pregnant", 
                 "Josie went on vacation to France", 
                 "Emma studied on Saturday morning",
                 "Olivia sleeps until noon", 
                 "Sophia got a tattoo", 
                 "Mia drank 2 cocktails last night", 
                 "Isabella ate a steak on Sunday",
                 "Emily bought a car yesterday", 
                 "Grace visited her sister", 
                 "Zoe calculated the tip",
                           "Audrey went to a party",
                           "Emilia looked after the kids",
                           "Hannah called her parents",
                           "Valerie sings in the shower", 
                           "Natasha got a promotion", 
                           "Danielle painted her room", 
                           "Courtney woke up early yesterday", 
                           "Molly attended a conference last week",
                           
                           
                 "Danny ate the last cupcake",
                 "Frank got a cat", 
                 "Jackson ran 10 miles", 
                 "Jayden rented a car", 
                 "Tony had a drink last night",
                 "Josh learned to ride a bike yesterday", 
                 "Owen shoveled snow last winter", 
                 "Julian dances salsa",
                 "Jon walks to work", 
                 "Charley speaks Spanish", 
                          "Connor fell from a tree", 
                          "Jason made a cake", 
                          "Allen went to the museum", 
                          "Cole celebrated his friend's birthday", 
                          "Dylan goes to college", 
                          "Fred missed the train", 
                          "Louis went swimming",
                          "Lucas plays the guitar"]);

var female_names = _.shuffle(["Amanda", "Melissa", "Laura", "Stephanie", "Rebecca", "Sharon", "Cynthia", "Kathleen", "Ruth", "Anna", "Kaitlin", "Regina", "Heather", "Shirley", "Amy", "Brenda", "Catherine", "Nicole"]);
    
var male_names = _.shuffle(["Patrick", "Scott", "Justin", "Jerry", "Ben", "Ray", "Kevin", "Brian", "Andrew", "Tim", "Eli", "Noah", "Colby", "Bobby", "Alan", "Francisco", "Manuel", "Dennis"]);
    
var all_names = _.shuffle(female_names.concat(male_names));

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
  var subject = all_names[i];
    
    var curr_item = items[i];
    curr_content["item"] = curr_item;
    curr_content["trigger"] = curr_item["trigger"];
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
    
    var question = content["content"]; 

    return {
	  "name": name,
	  "gender": gender,	 
	  "trigger": item.trigger,
      "utterance": utterance,
      "question": question
    }
  }
exp.stims_block1 = [];
for (var i=0; i<items.length; i++) {
      var stim = makeStim(i);
    exp.stims_block1.push(jQuery.extend(true, {}, stim));
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
  exp.structure=["i0", "block1", 'questionaire', 'finished'];
  
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