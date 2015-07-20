/*************************************************************************
 * Each array contains the entry question in index 0 and the exit question
 * in index 1. The question struct contains of the question, it's options
 * a-d, the type (default = single correct answers, multiple = multiple
 * correct answers), and the correct answers (when multiple, the correct
 * answers are comma separated).
 *************************************************************************/

var fossil_fuel = [];
fossil_fuel.push({ name: 'fossil_fuel_in',
					question: 'What are the processes that move carbon atoms into the fossil fuel pool?',  
					a: 'photosynthesis from organisms thousands of years ago, then heated and compressed',
					b: 'decomposition of garbage in landfills',
					c: 'photosynthesis from organisms hundreds of millions of years ago, then heated and compressed over hundreds of millions of years',
					d: 'combustion in human energy systems (like electricity generation and transportation)',
					correct: 'c'
				});
fossil_fuel.push({ name: 'fossil_fuel_out',
					question: 'What is the process that moves carbon atoms out of the fossil fuel pool?',  
					a: 'combustion in human energy systems',
					b: 'extraction from the ground',
					c: 'decomposition',
					d: 'consumption by herbivores',
					correct: 'a'
				});
				
				
var atmosphere = [];
atmosphere.push({ name: 'atmosphere_in',
					question: 'What are the processes that moves carbon atoms into the atmosphere pool?',  
					a: 'photosynthesis and combustion',
					b: 'cellular respiration and combustion',
					c: 'biosynthesis and cellular respiration',
					d: 'combustion and biosynthesis',
					correct: 'b'
				});
atmosphere.push({ name: 'atmosphere_out',
					question: 'What is the process that moves carbon atoms out of the atmosphere pool?',  
					a: 'consumption by herbivores',
					b: 'photosynthesis',
					c: 'cellular respiration',
					d: 'decomposition',
					correct: 'b'
				});				

var biomass = [];
biomass.push({ name: 'biomass_in',
					question: 'What is the process that moves carbon atoms into the biomass pool?',  
					a: 'cellular respiration',
					b: 'consumption by herbivores',
					c: 'photosynthesis',
					d: 'biosynthesis',
					correct: 'c'
				});
biomass.push({ name: 'biomass_out',
					question: 'What is the process that moves carbon atoms out of the biomass pool?',  
					a: 'cellular respiration and consumption by carnivores',
					b: 'consumption by carnivores and photosynthesis',
					c: 'death or defecation and cellular respiration',
					d: 'photosynthesis and death or defecation',
					correct: 'c'
				});

var soil = [];
soil.push({ name: 'soil_in',
					question: 'What are the processes that move carbon atoms into the soil pool?',  
					a: 'death or defecation',
					b: 'cellular respiration',
					c: 'photosynthesis',
					d: 'biosynthesis',
					correct: 'a'
				});
soil.push({ name: 'soil_out',
					question: 'What is the process that moves carbon atoms out of the soil pool?',  
					a: 'cellular respiration by decomposers',
					b: 'biosynthesis',
					c: 'death or defecation',
					d: 'photosynthesis',
					correct: 'a'
				});						