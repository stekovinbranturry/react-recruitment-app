const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/react-recruitment-app';
mongoose.connect(DB, { useFindAndModify: false, useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('Mongodb connected'));

const models = {
	user: {
		phone: { type: String, required: true },
		password: { type: String, required: true },
		identity: { type: String, required: true },
		avatar: String,
		name: String,
		age: Number,
		education: String,
		skills: String,
		workExperience: String,
		projectExperience: String,
		position: String,
		jobsHunting: Array
	}
};

for (const m in models) {
	if (models.hasOwnProperty(m)) {
		const el = models[m];
		mongoose.model(m, new mongoose.Schema(el));
	}
}

module.exports = {
	getModel: name => mongoose.model(name)
};
