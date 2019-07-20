const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/react-recruitment-app';
mongoose.connect(DB);
mongoose.connection.on('connected', () => console.log('Mongodb connected'));

const models = {
	user: {
		phone: { type: String, required: true },
		password: { type: String, required: true },
		identity: { type: String, required: true },
		avatar: String,
		desc: String,
		job_title: String,
		company: String,
		salary: String
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
