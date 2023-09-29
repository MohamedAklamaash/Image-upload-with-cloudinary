const mongoose = require("mongoose");

const MongoConnect = async()=>{
    mongoose
      .connect(
        `mongodb+srv://aklamaash:6G3tF07Kchz81xfj@nodepractice.jwzvy6c.mongodb.net/NodePractice?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log("Mongoose Connected");
      })
      .catch(() => {
        console.log("Error in connecting to mongo!");
      });
}

module.exports = MongoConnect;