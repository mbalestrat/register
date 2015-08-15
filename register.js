UserList = new Mongo.Collection("userList")

if (Meteor.isClient) {
  // counter starts at 0

 Template.login.events({
    'click #facebook-login': function(event) {
      var currentUserId = Meteor.userId();
      UserList.insert({
      createdBy: currentUserId
    }),
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        }

        );
    },
 
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    } 
  });

};

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
 
   }); 
}

Todos = new Mongo.Collection("todos")

if (Meteor.isClient){

  Template.body.helpers({
    todos: function(){

      return Todos.find({createdBy: Meteor.userId()});
    }
  });

  Template.body.events({
    "submit .create-todo": function(event){
      event.preventDefault();
      var currentUserId = Meteor.userId();
      var todo_item = event.target.text.value

      Todos.insert({
        text: todo_item, 
        date: new Date(),
        createdBy: currentUserId
      });

      event.target.text.value = "";
    }
  });

  Template.todo_item.helpers();

  Template.todo_item.events({
    "click .delete": function() {
      Todos.remove(this._id)
    }
  });

}