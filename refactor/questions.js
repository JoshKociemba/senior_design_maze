/*************************************************************************
 * Each array contains the entry question in index 0 and the exit question
 * in index 1. The question struct contains of the question, it's options
 * a-d, the type (default = single correct answers, multiple = multiple
 * correct answers), and the correct answers (when multiple, the correct
 * answers are comma separated).
 *************************************************************************/

var fossil_fuel = [];
fossil_fuel.push({ question: 'What are the processes that move carbon atoms into the fossil fuel pool?',  
					a: 'photosynthesis from organisms thousands of years ago, then heated and compressed',
					b: 'decomposition of garbage in landfills',
					c: 'photosynthesis from organisms hundreds of millions of years ago, then heated and compressed over hundreds of millions of years',
					d: 'combustion in human energy systems (like electricity generation and transportation)',
					type: 'default',
					correct: 'c'
				});
fossil_fuel.push({ question: 'What is the process that moves carbon atoms out of the fossil fuel pool?',  
					a: 'combustion in human energy systems',
					b: 'extraction from the ground',
					c: 'decomposition',
					d: 'consumption by herbivores',
					type: 'default',
					correct: 'a'
				});
				
				
var atmosphere = [];
atmosphere.push({ question: 'What are the processes that moves carbon atoms into the atmosphere pool?',  
					a: 'photosynthesis',
					b: 'cellular respiration',
					c: 'biosynthesis',
					d: 'combustion',
					type: 'multiple',
					correct: 'b,d'
				});
atmosphere.push({ question: 'What is the process that moves carbon atoms out of the atmosphere pool?',  
					a: 'consumption by herbivores',
					b: 'photosynthesis',
					c: 'cellular respiration',
					d: 'decomposition',
					type: 'default',
					correct: 'b'
				});				

var biomass = [];
biomass.push({ question: 'What is the process that moves carbon atoms into the biomass pool?',  
					a: 'cellular respiration',
					b: 'consumption by herbivores',
					c: 'photosynthesis',
					d: 'biosynthesis',
					type: 'default',
					correct: 'c'
				});
biomass.push({ question: 'What is the process that moves carbon atoms out of the biomass pool?',  
					a: 'cellular respiration',
					b: 'consumption by carnivores',
					c: 'death or defecation',
					d: 'photosynthesis',
					type: 'multiple',
					correct: 'a,c'
				});

var soil = [];
soil.push({ question: 'What are the processes that move carbon atoms into the soil pool?',  
					a: 'death or defecation',
					b: 'cellular respiration',
					c: 'photosynthesis',
					d: 'biosynthesis',
					type: 'default',
					correct: 'a'
				});
soil.push({ question: 'What is the process that moves carbon atoms out of the biomass pool?',  
					a: 'cellular respiration by decomposers',
					b: 'biosynthesis',
					c: 'death or defecation',
					d: 'photosynthesis',
					type: 'multiple',
					correct: 'a'
				});						