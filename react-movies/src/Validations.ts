import * as Yup from "yup";

// Custom validation method for checking if the first letter is uppercase
function configureValidations(){
    Yup.addMethod(Yup.string, "firstLetterUppercase", function (errorMessage) {
        return this.test("first-letter-uppercase", errorMessage, function (value) {
          if (value) {
            const firstLetter = value[0];
            return firstLetter === firstLetter.toUpperCase();
          }
          return true; // Skip validation if the value is empty
        });
      });
      

}

export default configureValidations;
