Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
	Template.body.helpers({
		tasks: function () {
			return Tasks.find({}, {sort: {createdAt: -1}});
		}
	});

	Template.body.events({
		"submit .new-task": function (event) {
			var name = event.target.name.value;
			var text = event.target.text.value;

		if (name == "" || text == "" ){
			alert('Заповніть коректно поля вводу!');
				return false;
		}else{
			Tasks.insert({
				name: name,
				text: text,
				createdAt: new Date()
			});

			event.target.name.value = "";
			event.target.text.value = "";
				return false;
			}
		}
	});

	Template.task.events({
		"click .delete": function () {
			Tasks.remove(this._id);
		}
	});
}