// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  // Function to handle user submitted burger.
  $(".burger-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#burger").val().trim(),
      devoured: 0
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("Created new burger!");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Function to update status of devoured burger.
  $(".devour").on("click", function(event) {
    var id = $(this).data("id");
    var newDevoured = $(this).data("newdevoured");

    var newDevouredState = {
      devoured: 1
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        console.log("Changed devoured to", newDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

});
