// Home Component
var Home = Vue.extend({
    template: '#home',
    props: ['movies']
});

// About Component
var About = Vue.extend({
    template: '#about'
});

// Project Modal Component
var ProjectModal = Vue.extend({
	template: '#project-modal',

	props: ['id'],

	data: function () {
	    return {
	    	projectInfo: [],
        projectCast: []
	    }
	  },

	ready: function () {
		var searchURL = "/php/modal.php?id=" + this.id;
		this.$http.get(searchURL, function(data) {
			this.$set('projectInfo', data);
		})

    var personSearchURL = "/php/getPerson.php?id=" + this.id;
    this.$http.get(personSearchURL, function(data) {
      this.$set('projectCast', data);
    })
	}
})

// Programs Component
var Programs = Vue.extend({
    template: '#programs'
});

// Tv/film Component
var TvFilm = Vue.extend({
    template: '#advanced-tv-film'
});

// Bachelor Film/TV Component
var BachFilmTv = Vue.extend({
    template: '#bachelor-film-tv'
});

// Journalism New Media Component
var JournalismNewMedia = Vue.extend({
	template: '#journalism-new-media'
})

// Journalism New Media Component
var MediaArts = Vue.extend({
	template: '#media-arts'
})

// Bachelor Arts Animation Component
var ArtsAnimation = Vue.extend({
	template: '#bachelor-arts-animation'
})

// Computer Animation Componenet
var ComputerAnimation = Vue.extend({
	template: "#computer-animation"
})

// Visual Effects Component
var VisualEffects = Vue.extend({
	template: "#visual-effects"
})

// Digital Character Component
var DigitalCharacter = Vue.extend({
	template: '#digital-character'
})

// Program Body Component
Vue.component('program-body', {
  	template: '#program-body',

  	props: ['program-title', 'program-description', 'program-id'],

  	data: function () {
	    return {
	    	projects: []
	    }
	},

	ready: function () {
		var searchURL = "/php/getProjectByProgram.php?id=" + this.programId;
		this.$http.get(searchURL, function(data) {
			this.$set('projects', data);
		})
	}
})

// Vue filter

Vue.filter('filterDate', function(uglyDate) {
	var newDate = uglyDate;
	if (typeof(newDate) === "string") {
		return newDate.substr(0,4);
	}
});

// Router Options
var router = new VueRouter({
	// hashbang: false,
	// history: true
});

var App = Vue.extend({
	el: '#app',

	ready: function(){
		this.fetchPosts();
	},

	methods: {
		fetchPosts: function(){
			this.$http.get('/php/api.php', function(posts) {
				this.$set('posts', posts);
			})
		}
	}
});

router.map({
	'/': {
		component: Home,
		subRoutes: {
			'/project/:id': {
				component: ProjectModal
			}
		}
	},
	'/about': {
		component: About
	},
	'/programs': {
		component: Programs,
	},
	'/programs/advanced-tv-film': {
		component: TvFilm,
		subRoutes: {
			'/:id': {
				component: ProjectModal
			}
		}
	},
	'/programs/bachelor-film-tv': {
		component: BachFilmTv,
		subRoutes: {
			'/:id': {
				component: ProjectModal
			}
		}
	},
	'/programs/journalism-new-media': {
		component: JournalismNewMedia,
		subRoutes: {
			'/:id': {
				component: ProjectModal
			}
		}
	},
	'/programs/media-arts': {
		component: MediaArts,
		subRoutes: {
			'/:id': {
				component: ProjectModal
			}
		}
	},
	'/programs/bachelor-arts-animation': {
		component: ArtsAnimation,
		subRoutes: {
			'/:id': {
				component: ProjectModal
			}
		}
	},
	'/programs/computer-animation': {
		component: ComputerAnimation,
		subRoutes: {
			'/:id': {
				component: ProjectModal
			}
		}
	},
	'/programs/visual-effects': {
		component: VisualEffects,
		subRoutes: {
			'/:id': {
				component: ProjectModal
			}
		}
	},
	'/programs/digital-character': {
		component: DigitalCharacter,
		subRoutes: {
			'/:id': {
				component: ProjectModal
			}
		}
	}
});

router.start(App, '#app')
