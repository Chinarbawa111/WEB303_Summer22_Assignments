// your code goes here
$(function() {
    var character = [{
            name: "Iron Man",
            description: "Iron Man is a superhero appearing in American comic books published by Marvel Comics",
            age: 48,
            dob: "1970-03-29"
        },
        {
            name: "Hulk",
            description: "Hulk has dissociative identity disorder (DID), is primarily represented by the alter Hulk, a green-skinned, hulking and muscular humanoid possessing a limitless degree of physical strength",
            age: 36,
            dob: "1986-06-25"
        },
        {
            name: "Thor",
            description: "Thor is a prominent god in Germanic paganism. In Norse mythology, he is a hammer-wielding god associated with lightning, thunder, storms, sacred groves and trees, strength, the protection of mankind, hallowing, and fertility",
            age: 38,
            dob: "1983-09-11"
        }, {
            name: "Thanos",
            description: "Thanos stands head and shoulders above the average human or humanoid, with powerful muscles, a broad face, and a purple-hued skintone.",
            age: 54,
            dob: "1968-02-1968"
        }, {
            name: "Spider-Man",
            description: "Spider-Man is conscientious photographer Peter Parker's alter ego, a web-slinging, crime-fighting protector of justice.",
            age: 38,
            dob: "1984-09-20"
        }
    ]
    var $tbody = $('#tbody');
    var cache = [];
    var $search = $('#search')
    $.each(character, function(key, val) {

        var $row = $('<tr></tr>'); // Create their row
        // populate data
        $row.append($('<td></td>').text(val.name));
        $row.append($('<td></td>').text(val.description));
        $row.append($('<td></td>').text(val.age));
        $row.append($('<td></td>').text(val.dob));
        $tbody.append($row); // Add row to the tbody

        cache.push({ // Create the cache that contains several values
            element: $row, // Reference to the row element
            // The text we're searching against (which in this case is first name)
            name: val.name.trim().toLowerCase(),

        });

        function filter() {
            var query = this.value.trim().toLowerCase(); // Get query
            if (query) { // If there’s a query
                cache.forEach(function(name) { // Each cache entry
                    var index = 0; // Set index to 0
                    index = name.name.indexOf(query); // Is text in there?
                    // Show / hide
                    if (index != -1) {
                        name.element.addClass('active')
                    } else {
                        name.element.removeClass('active')
                    }
                });
            }
        }
        // If browser supports input event 
        if ('oninput' in $search[0]) {
            // Use input event to call filter()
            $search.on('input', filter);
        } else { // Otherwise
            // Use keyup event to call filter() 
            $search.on('keyup', filter);
        }
    });
});