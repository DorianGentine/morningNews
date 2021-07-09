const mongoose = require('mongoose')

const options = {
 connectTimeoutMS: 5000,
 useNewUrlParser: true,
 useUnifiedTopology : true
}
mongoose.connect('mongodb+srv://doriangtn:cegej9AbEXJh6h4@lacapsule.u7hei.mongodb.net/morningnews?retryWrites=true&w=majority',
   options,        
   function(err) {
			err ? console.log(err) : console.log('Connection réussie !');
   }
);