var fs = require('fs');
var gravatar = require('gravatar');
var _ = require('lodash')
var Mustache = require('mustache');

function render(resumeObject) {

	_.each(resumeObject.work, function(w) {
		w.startDateYear = w.startDate.substr(0,4);
		switch (w.startDate.substr(5,2)) {
			case '01':
				w.startDateMonth = "Jan";
				break;
			case '02':
				w.startDateMonth = "Feb";
				break;
			case '03':
				w.startDateMonth = "Mar";
				break;
			case '04':
				w.startDateMonth = "Apr";
				break;
			case '05':
				w.startDateMonth = "May";
				break;
			case '06':
				w.startDateMonth = "Jun";
				break;
			case '07':
				w.startDateMonth = "Jul";
				break;
			case '08':
				w.startDateMonth = "Aug";
				break;
			case '09':
				w.startDateMonth = "Sep";
				break;
			case '10': 
				w.startDateMonth = "Oct";
				break;
			case '11':
				w.startDateMonth = "Nov";
				break;
			case '12':
				w.startDateMonth = "Dec";
				break;
		}

		if(w.endDate) {
			w.endDateYear = w.endDate.substr(0,4);
			switch ((w.endDate || "").substr(5,2)) {
				case '01':
					w.startDateMonth = "Jan";
					break;
				case '02':
					w.startDateMonth = "Feb";
					break;
				case '03':
					w.startDateMonth = "Mar";
					break;
				case '04':
					w.startDateMonth = "Apr";
					break;
				case '05':
					w.startDateMonth = "May";
					break;
				case '06':
					w.startDateMonth = "Jun";
					break;
				case '07':
					w.startDateMonth = "Jul";
					break;
				case '08':
					w.startDateMonth = "Aug";
					break;
				case '09':
					w.startDateMonth = "Sep";
					break;
				case '10': 
					w.startDateMonth = "Oct";
					break;
				case '11':
					w.startDateMonth = "Nov";
					break;
				case '12':
					w.startDateMonth = "Dec";
					break;
			}
		} else { 
			w.endDateYear = 'Present'
		}
	});
	_.each(resumeObject.education, function(e) {
		if( !e.area || !e.studyType ){
			e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
		} else {
			e.educationDetail = e.area + ", "+ e.studyType;
		}
		e.startDateYear = e.startDate.substr(0,4);
		if (e.endDate) {
			e.endDateYear = e.endDate.substr(0,4);
		} else { 
			e.endDateYear = 'Present'
		}
	});
	if(resumeObject.basics && resumeObject.basics.email) {
		resumeObject.basics.gravatar = gravatar.url(resumeObject.basics.email, {
			s: '100',
			r: 'pg',
			d: 'mm'
		});
	}
	resumeObject.profiles = {};

	_.each(resumeObject.basics.profiles, function(profile){
		resumeObject.profiles[profile.network] = profile.username;
	});
	console.log(resumeObject.profiles);
	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	var resumeHTML = Mustache.render(theme, resumeObject);
	

	return resumeHTML;
};
module.exports = {
	render: render
}
